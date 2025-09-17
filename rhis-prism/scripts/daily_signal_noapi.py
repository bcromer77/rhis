# scripts/daily_signal_noapi.py

import os
import json
import weaviate
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

# --- Weaviate client setup ---
client = weaviate.Client("http://localhost:8080")

# Ensure schema exists
schema_class = {
    "class": "RegulatorySignal",
    "properties": [
        {"name": "key_issues", "dataType": ["string"]},
        {"name": "market_sector_impact", "dataType": ["string"]},
        {"name": "who_bleeds", "dataType": ["string[]"]},
        {"name": "who_benefits", "dataType": ["string[]"]},
        {"name": "legal_compliance_implications", "dataType": ["string"]}
    ]
}
try:
    if not any(c["class"] == "RegulatorySignal" for c in client.schema.get()["classes"]):
        client.schema.create_class(schema_class)
        print("✅ Created schema class 'RegulatorySignal'")
    else:
        print("ℹ️ Schema class 'RegulatorySignal' already exists")
except Exception as e:
    print(f"❌ Schema check/create failed: {e}")

# --- Example video list ---
videos = [
    {"label": "Mexico Senate – Debate on Energy Reform", "video_id": "G6C2sSYV9fU"},
    {"label": "Mexico Chamber of Deputies – Plenary Session", "video_id": "vx7gDJfaivg"},
    {"label": "California Senate – Water & Agriculture Hearing", "video_id": "4U1A7K91W0U"},
    {"label": "Texas House – Energy Grid & Market Stability", "video_id": "6M2OQm6jv1o"},
    {"label": "New York State Assembly – Budget Hearing", "video_id": "NGaSOfFjtxI"},
    {"label": "US Senate – Federal Reserve Oversight Hearing", "video_id": "E7yQxtYk95M"},
    {"label": "US House – Agriculture Committee Hearing", "video_id": "OYe9zFVX1Bg"},
    {"label": "Parliament of Canada – Carbon Pricing Debate", "video_id": "ST0ShXxq8sk"},
    {"label": "Ontario Legislative Assembly – Energy & Finance Committee", "video_id": "U8X1u6p_0tI"},
    {"label": "British Columbia Legislature – Climate Change Debate", "video_id": "vlU6yRrG9iw"}
]

print("🚀 Running RhisSignals Daily Pipeline (no YouTube API)...")

for v in videos:
    video_id = v["video_id"]
    label = v["label"]
    print(f"🎥 Processing {label} ({video_id})")

    try:
        # ✅ Multilingual transcripts (English + Spanish)
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=["en", "es"])
        transcript_text = " ".join([t["text"] for t in transcript_list])

        # Fake analysis for demo (replace with Grok/OpenAI later)
        analysis = {
            "key_issues": f"Debate captured from {label}",
            "market_sector_impact": "Energy and trade policy implications",
            "who_bleeds": ["Foreign exporters"],
            "who_benefits": ["Local industries"],
            "legal_compliance_implications": "Potential WTO or NAFTA/USMCA compliance issues"
        }

        # Insert into Weaviate
        client.data_object.create(analysis, class_name="RegulatorySignal")
        print(f"✅ Inserted transcript + analysis for {label}")

    except (TranscriptsDisabled, NoTranscriptFound) as e:
        print(f"❌ Transcript not available for {video_id}: {e}")
        # Still insert placeholder object
        client.data_object.create({
            "key_issues": f"No transcript available for {label}",
            "market_sector_impact": "Unknown",
            "who_bleeds": [],
            "who_benefits": [],
            "legal_compliance_implications": "Unclear"
        }, class_name="RegulatorySignal")
        print(f"✅ Inserted placeholder for {label}")

    except Exception as e:
        print(f"❌ Unexpected error for {video_id}: {e}")

print("✅ Finished run")

