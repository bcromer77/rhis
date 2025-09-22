import os
import json
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from pymongo import MongoClient
import openai
import spacy
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Import your fetchers
from fetchers.youtube_fetcher import fetch_youtube_videos
from fetchers.x_fetcher import fetch_x_posts
from fetchers.pdf_fetcher import fetch_gov_pdfs

# --- Environment Setup ---
openai.api_key = os.getenv('OPENAI_KEY')
client = MongoClient(os.getenv('MONGO_URI'))
db = client['prism_db']
vector_coll = db['vectors']
crisis_cards_coll = db['crisis_cards']

# Load NLP tools
nlp = spacy.load('en_core_web_sm')
sentiment_analyzer = SentimentIntensityAnalyzer()

# --- Helper Functions ---
def detect_country(title):
    """Extract country from title/content"""
    country_map = {
        'mexico': 'Mexico', 'california': 'USA', 'texas': 'USA', 'new york': 'USA',
        'us senate': 'USA', 'us house': 'USA', 'canada': 'Canada', 
        'ontario': 'Canada', 'british columbia': 'Canada', 'dof': 'Mexico',
        'diputados': 'Mexico', 'senado': 'Mexico', 'federal register': 'USA',
        'congress': 'USA', 'hansard': 'Canada', 'gazette': 'Canada'
    }
    title_lower = title.lower()
    for key, country in country_map.items():
        if key in title_lower:
            return country
    return 'Unknown'

def extract_topic(title):
    """Extract topic from title/content"""
    title_lower = title.lower()
    if any(word in title_lower for word in ['energy', 'grid', 'carbon', 'climate']):
        return 'energy_policy'
    elif any(word in title_lower for word in ['agriculture', 'water', 'farming']):
        return 'agriculture_policy'
    elif any(word in title_lower for word in ['budget', 'finance', 'fiscal', 'tax']):
        return 'fiscal_policy'
    elif any(word in title_lower for word in ['mining', 'lithium', 'copper', 'mineral']):
        return 'mining_policy'
    return 'regulatory_policy'

# --- Process & Embed (Universal for all document types) ---
def process_and_embed(data):
    """Process any document (YouTube, X, PDF) and insert into vectors collection"""
    
    doc_id = data['id']
    title = data.get('title', 'Untitled')
    content = data.get('transcript') or data.get('content', '')
    doc_type = data.get('type', 'generic')
    
    if not content:
        print(f"⚠️ No content for {doc_id}")
        return None
        
    # Extract entities
    doc = nlp(content[:5000])  # Limit for spaCy processing
    entities = [{'name': ent.text, 'type': ent.label_} 
                for ent in doc.ents if ent.label_ in ['PERSON', 'ORG', 'GPE']]
    unique_entities = list({e['name']: e for e in entities}.values())[:10]  # Top 10
    
    # Generate embedding
    try:
        response = openai.Embedding.create(
            input=content[:2000], 
            model='text-embedding-ada-002'
        )
        vector = response['data'][0]['embedding']
    except Exception as e:
        print(f"Embedding failed for {doc_id}: {e}")
        return None
    
    # Calculate urgency
    sentiment = sentiment_analyzer.polarity_scores(content)['compound']
    urgency_keywords = ['crisis', 'emergency', 'urgent', 'critical', 'dispute', 'protest', 
                       'reform', 'regulation', 'policy change', 'investigation']
    urgency = abs(sentiment) * (2 if any(k in content.lower() for k in urgency_keywords) else 1)
    
    # Create document for vectors collection
    document = {
        '_id': doc_id,
        'type': doc_type,
        'country': detect_country(title),
        'topic': extract_topic(title),
        'content': content,
        'metadata': {
            'url': data.get('url', f"https://source.com/{doc_id}"),
            'title': title,
            'date': datetime.now().isoformat(),
            'transcript_chunks': [{'timestamp': '0.0', 'text': content[:500]}]
        },
        'entities': unique_entities,
        'vector': vector,
        'urgency': urgency,
        'timestamp': datetime.now().isoformat()
    }
    
    # Upsert to vectors collection
    vector_coll.update_one({'_id': doc_id}, {'$set': document}, upsert=True)
    print(f"✅ Processed {title} ({doc_type}) into vectors")
    return document

# --- Crisis Card Generator ---
def generate_crisis_card(doc):
    """Generate crisis card from processed document"""
    prompt = f"""From {doc['type']} source on {doc['topic']} in {doc['country']}:
Title: {doc['metadata']['title']}
Content: {doc['content'][:1500]}

Generate JSON:
{{
"_id": "card_{doc['_id']}",
"signal": "Key regulatory shift or policy change (50 words)",
"why_traders_care": "Market/sector impact for traders (50 words)", 
"platform_pitch": "Engaging social media hook (30 words)",
"country": "{doc['country']}",
"tags": ["Relevant tags"],
"urgency": {doc['urgency']},
"refs": ["{doc['_id']}"],
"timestamp": "{doc['timestamp']}"
}}

Focus on actionable insights for traders, ESG desks, and policy watchers."""

    try:
        response = openai.ChatCompletion.create(
            model='gpt-4o-mini',
            messages=[
                {'role': 'system', 'content': 'Extract policy signals for financial markets'},
                {'role': 'user', 'content': prompt}
            ]
        )
        card_json = json.loads(response.choices[0].message.content)
        
        # Boost urgency for high-impact terms
        if any(k in card_json['signal'].lower() for k in ['reform', 'regulation', 'policy change']):
            card_json['urgency'] = card_json['urgency'] * 1.5
            
        # Insert to crisis_cards collection
        crisis_cards_coll.update_one(
            {'_id': card_json['_id']}, 
            {'$set': card_json}, 
            upsert=True
        )
        print(f"✅ Generated crisis card: {card_json['signal'][:50]}...")
        return card_json
        
    except Exception as e:
        print(f"Card generation failed for {doc['_id']}: {e}")
        return None

# --- Main Pipeline (Multi-Source) ---
def run_pipeline():
    print("🚀 Running PRISM Daily Pipeline...")
    
    processed_docs = []
    generated_cards = []
    
    # --- YOUTUBE FETCHER ---
    print("🎥 Fetching YouTube transcripts...")
    try:
        yt_docs = fetch_youtube_videos()
        print(f"Found {len(yt_docs)} YouTube videos")
        
        for data in yt_docs:
            print(f"🎥 Processing: {data['title']}")
            doc = process_and_embed(data)
            if doc:
                processed_docs.append(doc)
                card = generate_crisis_card(doc)
                if card:
                    generated_cards.append(card)
    except Exception as e:
        print(f"❌ YouTube fetcher failed: {e}")
    
    # --- X (TWITTER) FETCHER ---
    print("🐦 Fetching X posts...")
    try:
        x_docs = fetch_x_posts()
        print(f"Found {len(x_docs)} X posts")
        
        for data in x_docs:
            print(f"🐦 Processing: {data['title']}")
            doc = process_and_embed(data)
            if doc:
                processed_docs.append(doc)
                card = generate_crisis_card(doc)
                if card:
                    generated_cards.append(card)
    except Exception as e:
        print(f"❌ X fetcher failed: {e}")
    
    # --- PDF FETCHER ---
    print("📄 Fetching government PDFs...")
    try:
        pdf_docs = fetch_gov_pdfs(api_key=os.getenv('CONGRESS_API_KEY', 'DEMO_KEY'))
        print(f"Found {len(pdf_docs)} PDF documents")
        
        for data in pdf_docs:
            print(f"📄 Processing: {data['title']}")
            doc = process_and_embed(data)
            if doc:
                processed_docs.append(doc)
                card = generate_crisis_card(doc)
                if card:
                    generated_cards.append(card)
    except Exception as e:
        print(f"❌ PDF fetcher failed: {e}")
    
    print(f"✅ Pipeline complete: {len(processed_docs)} docs processed, {len(generated_cards)} cards generated")
    
    # Summary stats
    if generated_cards:
        avg_urgency = sum(c['urgency'] for c in generated_cards) / len(generated_cards)
        top_card = max(generated_cards, key=lambda x: x['urgency'])
        print(f"📊 Average urgency: {avg_urgency:.1f}")
        print(f"🚨 Top urgent signal: {top_card['signal'][:60]}...")
        
        # Print breakdown by source
        sources = {}
        for card in generated_cards:
            source_type = card['refs'][0].split('_')[0] if '_' in card['refs'][0] else 'unknown'
            sources[source_type] = sources.get(source_type, 0) + 1
        print(f"📈 Cards by source: {sources}")
    
    return {"processed": len(processed_docs), "cards": len(generated_cards)}

if __name__ == "__main__":
    result = run_pipeline()
    print(f"🎉 PRISM pipeline finished: {result}")
