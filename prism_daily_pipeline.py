import os
import json
from datetime import datetime
from youtube_transcript_api import YouTubeTranscriptApi
from pymongo import MongoClient
import openai
import spacy
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

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
    """Extract country from video title"""
    country_map = {
        'mexico': 'Mexico', 'california': 'USA', 'texas': 'USA', 'new york': 'USA',
        'us senate': 'USA', 'us house': 'USA', 'canada': 'Canada', 
        'ontario': 'Canada', 'british columbia': 'Canada'
    }
    title_lower = title.lower()
    for key, country in country_map.items():
        if key in title_lower:
            return country
    return 'Unknown'

def extract_topic(title):
    """Extract topic from video title"""
    if any(word in title.lower() for word in ['energy', 'grid', 'carbon']):
        return 'energy_policy'
    elif any(word in title.lower() for word in ['agriculture', 'water']):
        return 'agriculture_policy'
    elif any(word in title.lower() for word in ['budget', 'finance']):
        return 'fiscal_policy'
    return 'regulatory_policy'

# --- Transcript Fetch (Your existing function, adapted) ---
def fetch_transcript(video_id: str, languages=["en", "es"]) -> str:
    try:
        ytt_api = YouTubeTranscriptApi()
        fetched_transcript = ytt_api.fetch(video_id, languages=languages)
        transcript_data = fetched_transcript.to_raw_data()
        return " ".join([entry["text"] for entry in transcript_data if entry["text"].strip()])
    except Exception as e:
        print(f"No transcript for {video_id}: {e}")
        return ""

# --- Process & Embed (PRISM Style) ---
def process_and_embed(video_data):
    """Process video data and insert into vectors collection"""
    video_id, title, transcript = video_data['id'], video_data['title'], video_data['transcript']
    
    if not transcript:
        return None
        
    # Extract entities
    doc = nlp(transcript[:5000])  # Limit for spaCy processing
    entities = [{'name': ent.text, 'type': ent.label_} 
                for ent in doc.ents if ent.label_ in ['PERSON', 'ORG', 'GPE']]
    unique_entities = list({e['name']: e for e in entities}.values())[:10]  # Top 10
    
    # Generate embedding
    try:
        response = openai.Embedding.create(
            input=transcript[:2000], 
            model='text-embedding-ada-002'
        )
        vector = response['data'][0]['embedding']
    except Exception as e:
        print(f"Embedding failed for {video_id}: {e}")
        return None
    
    # Calculate urgency
    sentiment = sentiment_analyzer.polarity_scores(transcript)['compound']
    urgency_keywords = ['crisis', 'emergency', 'urgent', 'critical', 'dispute', 'protest']
    urgency = abs(sentiment) * (2 if any(k in transcript.lower() for k in urgency_keywords) else 1)
    
    # Create document for vectors collection
    doc = {
        '_id': video_id,
        'type': 'youtube',
        'country': detect_country(title),
        'topic': extract_topic(title),
        'content': transcript,
        'metadata': {
            'url': f"https://youtube.com/watch?v={video_id}",
            'title': title,
            'date': datetime.now().isoformat(),
            'transcript_chunks': [{'timestamp': '0.0', 'text': transcript[:500]}]  # Simplified
        },
        'entities': unique_entities,
        'vector': vector,
        'urgency': urgency,
        'timestamp': datetime.now().isoformat()
    }
    
    # Upsert to vectors collection
    vector_coll.update_one({'_id': video_id}, {'$set': doc}, upsert=True)
    print(f"✅ Inserted {title} into vectors")
    return doc

# --- Crisis Card Generator ---
def generate_crisis_card(doc):
    """Generate crisis card from processed document"""
    prompt = f"""From YouTube legislative hearing on {doc['topic']} in {doc['country']}:
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

# --- Main Pipeline (Adapted from your existing) ---
def run_pipeline():
    print("🚀 Running PRISM Daily Pipeline...")
    
    # Your existing video list
    videos = [
        {"title": "Mexico Senate – Debate on Energy Reform", "id": "G6C2sSYV9fU"},
        {"title": "Mexico Chamber of Deputies – Plenary Session", "id": "vx7gDJfaivg"},
        {"title": "California Senate – Water & Agriculture Hearing", "id": "4U1A7K91W0U"},
        {"title": "Texas House – Energy Grid & Market Stability", "id": "6M2OQm6jv1o"},
        {"title": "New York State Assembly – Budget Hearing", "id": "NGaSOfFjtxI"},
        {"title": "US Senate – Federal Reserve Oversight Hearing", "id": "E7yQxtYk95M"},
        {"title": "US House – Agriculture Committee Hearing", "id": "OYe9zFVX1Bg"},
        {"title": "Parliament of Canada – Carbon Pricing Debate", "id": "ST0ShXxq8sk"},
        {"title": "Ontario Legislative Assembly – Energy & Finance Committee", "id": "U8X1u6p_0tI"},
        {"title": "British Columbia Legislature – Climate Change Debate", "id": "vlU6yRrG9iw"},
    ]
    
    processed_docs = []
    generated_cards = []
    
    for video in videos:
        vid, title = video["id"], video["title"]
        print(f"🎥 Processing {title} ({vid})")
        
        # Fetch transcript
        transcript = fetch_transcript(vid, languages=["en", "es"])
        if not transcript:
            continue
            
        # Process and embed
        video_data = {'id': vid, 'title': title, 'transcript': transcript}
        doc = process_and_embed(video_data)
        if doc:
            processed_docs.append(doc)
            
            # Generate crisis card
            card = generate_crisis_card(doc)
            if card:
                generated_cards.append(card)
    
    print(f"✅ Pipeline complete: {len(processed_docs)} docs processed, {len(generated_cards)} cards generated")
    
    # Summary stats
    if generated_cards:
        avg_urgency = sum(c['urgency'] for c in generated_cards) / len(generated_cards)
        top_card = max(generated_cards, key=lambda x: x['urgency'])
        print(f"📊 Average urgency: {avg_urgency:.1f}")
        print(f"🚨 Top urgent signal: {top_card['signal'][:60]}...")

if __name__ == "__main__":
    run_pipeline()
