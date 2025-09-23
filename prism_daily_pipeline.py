import os, json, logging
from datetime import datetime, timezone
from dotenv import load_dotenv
from pymongo import MongoClient, ASCENDING
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import spacy
from tenacity import retry, stop_after_attempt, wait_exponential
from openai import OpenAI

# --- Setup ---
load_dotenv(".env.local")

OPENAI_KEY = os.getenv("OPENAI_KEY")
MONGO_URI = os.getenv("MONGO_URI")

client = OpenAI(api_key=OPENAI_KEY)
mongo = MongoClient(MONGO_URI)
db = mongo["rhis_prism"]
signals = db["signals"]
cards = db["crisis_cards"]

nlp = spacy.load("en_core_web_sm")
sentiment = SentimentIntensityAnalyzer()

logging.basicConfig(level=logging.INFO, format="%(asctime)s | %(levelname)s | %(message)s")
utc_now = lambda: datetime.now(timezone.utc).isoformat()

# --- Retry wrappers ---
@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=2, max=15))
def embed(text: str):
    resp = client.embeddings.create(model="text-embedding-3-small", input=text[:8000])
    return resp.data[0].embedding

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=2, max=15))
def llm_card(doc):
    content = doc["content"][:1500]
    msg = [
        {"role": "system", "content": "You are a market analyst. Output valid JSON only."},
        {"role": "user", "content": f"""
From {doc['type']} in {doc['country']} on {doc['topic']}:
Content: {content}

Generate:
{{
  "_id": "card_{doc['_id']}",
  "signal": "Summary (<=50 words)",
  "why_traders_care": "Market/ESG impact (<=60 words)",
  "platform_pitch": "RhisSignals hook (<=25 words)",
  "country": "{doc['country']}",
  "tags": ["topic", "entities"],
  "urgency": {doc['urgency']},
  "refs": ["{doc['_id']}"],
  "timestamp": "{doc['timestamp']}",
  "tweet_draft": "Short, tweetable version"
}}"""}
    ]
    resp = client.chat.completions.create(model="gpt-4o-mini", messages=msg, temperature=0.2)
    txt = resp.choices[0].message.content
    start, end = txt.find("{"), txt.rfind("}")
    return json.loads(txt[start:end+1])

# --- Processing ---
def process_doc(raw):
    text = raw.get("content") or ""
    if not text:
        return None
    # Entities
    ents = [{"name": ent.text, "type": ent.label_} for ent in nlp(text[:4000]).ents if ent.label_ in ["PERSON","ORG","GPE"]]
    ents = list({e["name"]: e for e in ents}.values())
    # Embedding + urgency
    vector = embed(text)
    s = sentiment.polarity_scores(text)["compound"]
    urgency = abs(s) * (2 if any(k in text.lower() for k in ["protest","dispute","revocation","crisis"]) else 1)
    doc = {
        "_id": raw["_id"],
        "type": raw["type"],
        "country": raw.get("country","Unknown"),
        "topic": raw.get("topic","regulatory"),
        "content": text,
        "metadata": raw.get("metadata",{}),
        "entities": ents,
        "embedding": vector,
        "urgency": urgency,
        "timestamp": utc_now()
    }
    signals.update_one({"_id": doc["_id"]}, {"$set": doc}, upsert=True)
    return doc

def generate_card(doc):
    try:
        card = llm_card(doc)
        card["tags"] = list({doc["topic"], *[e["name"] for e in doc.get("entities",[]) if e["type"]=="ORG"][:3]})
        cards.update_one({"_id": card["_id"]}, {"$set": card}, upsert=True)
        return card
    except Exception as e:
        logging.error(f"Card gen failed for {doc['_id']}: {e}")
        return None

# --- Main ---
def run_pipeline():
    from fetchers.youtube_fetcher import fetch_youtube_videos
    from fetchers.x_fetcher import fetch_x_posts
    from fetchers.pdf_fetcher import fetch_gov_pdfs

    raw_docs = []
    raw_docs += fetch_youtube_videos()
    raw_docs += fetch_x_posts()
    raw_docs += fetch_gov_pdfs()

    logging.info(f"Fetched {len(raw_docs)} docs")

    processed, generated = [], []
    for raw in raw_docs:
        doc = process_doc(raw)
        if doc:
            processed.append(doc)
            card = generate_card(doc)
            if card:
                generated.append(card)

    logging.info(f"Pipeline finished: {len(processed)} signals, {len(generated)} cards")
    return {"signals": len(processed), "cards": len(generated)}

if __name__ == "__main__":
    run_pipeline()
🛠 MongoDB AI Search Setup
After this reboot, you’ll need to define a Vector Search index in Atlas:

Go to Atlas → Collections → rhis_prism → signals → Indexes → Create Index → Vector Search.

Configure:

Path: embedding

Type: vector

Dimensions: 1536 (for text-embedding-3-small)

Metric: cosine

This unlocks queries like:

python
Copy code
db.signals.aggregate([
  {
    "$vectorSearch": {
      "queryVector": <your_embedding>,
      "path": "embedding",
      "numCandidates": 200,
      "limit": 10
    }
  }
])
