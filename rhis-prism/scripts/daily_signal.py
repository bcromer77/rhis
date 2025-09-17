import os
import requests
import json
import re
import yaml
from dotenv import load_dotenv
import weaviate

# Import our transcript + analysis helpers
from scripts.transcribe_and_analyze import fetch_transcript, analyze_with_grok

# Load environment variables
load_dotenv()

XAI_KEY = os.getenv("XAI_API_KEY")
YT_KEY = os.getenv("YOUTUBE_TRANSCRIPT_API_KEY")
YOUTUBE_DATA_API_KEY = os.getenv("YOUTUBE_DATA_API_KEY")

if not XAI_KEY or not YT_KEY or not YOUTUBE_DATA_API_KEY:
    print("❌ Missing API keys in .env (XAI_API_KEY, YOUTUBE_TRANSCRIPT_API_KEY, YOUTUBE_DATA_API_KEY)")
    exit(1)

# Initialize Weaviate client (v3 syntax)
client = weaviate.Client("http://localhost:8080")

# Ensure schema exists
try:
    client.schema.get("RegulatorySignal")
    print("ℹ️ Schema class 'RegulatorySignal' already exists")
except:
    print("⚠️ Creating missing schema class 'RegulatorySignal'")
    client.schema.create_class({
        "class": "RegulatorySignal",
        "properties": [
            {"name": "key_issues", "dataType": ["string"]},
            {"name": "market_sector_impact", "dataType": ["string"]},
            {"name": "who_bleeds", "dataType": ["string[]"]},
            {"name": "who_benefits", "dataType": ["string[]"]},
            {"name": "legal_compliance_implications", "dataType": ["string"]}
        ]
    })

# --- Utility functions ---

def extract_video_id(text: str) -> str:
    """Extract YouTube video ID from a text string (URLs)."""
    match = re.search(r"youtube\.com/watch\?v=([\w-]+)", text)
    return match.group(1) if match else None

def safe_insert(obj: dict, source: str):
    """Insert object into Weaviate with debug logging."""
    try:
        print(f"📝 Preparing object from {source}: {json.dumps(obj, indent=2)}")
        client.data_object.create(obj, class_name="RegulatorySignal")
        print("✅ Inserted into Weaviate")
    except Exception as e:
        print(f"❌ Insert error for {source}: {e}")

# --- Scanners ---

def scan_semantic_alerts():
    """Example: semantic search on X/Twitter (stub endpoint)."""
    query = "rare earth minerals policy change China 2025"
    headers = {"Authorization": f"Bearer {XAI_KEY}"}
    url = "https://api.x.ai/v1/semantic-search"  # placeholder

    try:
        resp = requests.post(url, headers=headers, json={"query": query, "limit": 5}, timeout=30)
        if resp.status_code != 200:
            print(f"❌ Semantic Search Failed: {resp.status_code} {resp.text}")
            return

        results = resp.json().get("results", [])
        for post in results:
            video_id = extract_video_id(post.get("text", ""))
            if video_id:
                print(f"🎯 Found video ID: {video_id}")
                try:
                    transcript = fetch_transcript(video_id)
                    analysis = analyze_with_grok(transcript)
                    safe_insert(json.loads(analysis), f"semantic:{video_id}")
                except Exception as e:
                    print(f"❌ Analysis Error for {video_id}: {e}")

    except Exception as e:
        print(f"❌ Semantic Search Error: {e}")

def scan_youtube_from_yaml():
    """Scan YouTube channels defined in config/sources.yaml."""
    try:
        with open("config/sources.yaml", "r") as f:
            sources = yaml.safe_load(f)

        for source in sources:
            if source.get("type") == "youtube" and source.get("url"):
                channel_id = source["url"].split("/")[-1]
                yt_data_url = (
                    f"https://www.googleapis.com/youtube/v3/search?"
                    f"channelId={channel_id}&key={YOUTUBE_DATA_API_KEY}&order=date&maxResults=1&type=video"
                )
                resp = requests.get(yt_data_url)
                if resp.status_code == 200:
                    video_id = resp.json().get("items", [{}])[0].get("id", {}).get("videoId")
                    if video_id:
                        print(f"🎥 Fetching transcript from {source['label']} → {video_id}")
                        try:
                            transcript = fetch_transcript(video_id)
                            analysis = analyze_with_grok(transcript)
                            safe_insert(json.loads(analysis), f"youtube:{video_id}")
                        except Exception as e:
                            print(f"❌ Analysis Error for {video_id}: {e}")
                else:
                    print(f"❌ YouTube API Error for {source['label']}: {resp.status_code} {resp.text}")

    except Exception as e:
        print(f"❌ YouTube Scan Error: {e}")

# --- Entrypoint ---

if __name__ == "__main__":
    print("🚀 Starting RhisSignals Daily Pipeline...")
    try:
        scan_semantic_alerts()
        scan_youtube_from_yaml()
    finally:
        print("🛑 Finished run (no .close() needed for v3 client)")
    print("✅ Pipeline completed. Check logs for alerts.")

