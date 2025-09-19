import weaviate
from youtube_transcript_api import YouTubeTranscriptApi

# --- Connect to Weaviate ---
client = weaviate.Client("http://localhost:8080")

# --- Schema setup ---
def ensure_schema():
    class_name = "RegulatorySignal"
    if class_name not in client.schema.get()["classes"]:
        client.schema.create_class({
            "class": class_name,
            "properties": [
                {"name": "title", "dataType": ["text"]},
                {"name": "video_id", "dataType": ["text"]},
                {"name": "key_issues", "dataType": ["text"]},
                {"name": "market_sector_impact", "dataType": ["text"]},
                {"name": "who_bleeds", "dataType": ["text[]"]},
                {"name": "who_benefits", "dataType": ["text[]"]},
                {"name": "legal_compliance_implications", "dataType": ["text"]},
            ]
        })
        print(f"✅ Created schema class {class_name}")
    else:
        print(f"ℹ️ Schema class '{class_name}' already exists")

# --- Transcript fetch (UPDATED FOR v1.2.2) ---
def fetch_transcript(video_id: str, languages=["en", "es"]) -> str:
    try:
        # Create YouTubeTranscriptApi instance
        ytt_api = YouTubeTranscriptApi()
        
        # Use the new fetch method instead of get_transcript
        fetched_transcript = ytt_api.fetch(video_id, languages=languages)
        
        # Convert to raw data (list of dictionaries)
        transcript_data = fetched_transcript.to_raw_data()
        
        # Extract text from each entry and join
        return " ".join([entry["text"] for entry in transcript_data if entry["text"].strip()])
        
    except Exception as e:
        return f"No transcript available: {e}"

# --- Insert into Weaviate ---
def insert_signal(title, video_id, transcript):
    client.data_object.create(
        {
            "title": title,
            "video_id": video_id,
            "key_issues": transcript if transcript else "No transcript available",
            "market_sector_impact": "Unknown",
            "who_bleeds": [],
            "who_benefits": [],
            "legal_compliance_implications": "Unknown"
        },
        "RegulatorySignal"
    )
    print(f"✅ Inserted object for {title}")

# --- Main pipeline ---
def run_pipeline():
    print("🚀 Running RhisSignals Daily Pipeline (no YouTube API)...")
    ensure_schema()

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

    for video in videos:
        vid, title = video["id"], video["title"]
        print(f"🎥 Processing {title} ({vid})")
        transcript = fetch_transcript(vid, languages=["en", "es"])
        insert_signal(title, vid, transcript)

    print("✅ Finished run")

if __name__ == "__main__":
    run_pipeline()
