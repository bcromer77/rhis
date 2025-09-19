import os
import json
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled
from pytube import Channel
from datetime import date
from uuid import uuid4

OUTPUT_DIR = "data/transcripts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_channel_video_ids(channel_url: str, limit: int = 10):
    """Fetch video IDs from a YouTube channel."""
    c = Channel(channel_url)
    return [video.video_id for video in c.videos[:limit]]

def save_transcript(video_id: str, jurisdiction: str, body: str):
    """Fetch and save transcript as JSON."""
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['es','en','hi','fr'])
        out = {
            "id": str(uuid4()),
            "video_id": video_id,
            "jurisdiction": jurisdiction,
            "body": body,
            "transcript": transcript,
            "ingest_date": date.today().isoformat(),
            "audit_log": [{"timestamp": date.today().isoformat(), "action": "transcribed"}]
        }
        filename = f"{OUTPUT_DIR}/{jurisdiction}_{video_id}.json"
        with open(filename, "w") as f:
            json.dump(out, f, indent=2)
        print(f"✅ Transcript saved: {filename}")
    except TranscriptsDisabled:
        print(f"⚠️ Transcript disabled for {video_id}")
    except Exception as e:
        print(f"⚠️ Error for {video_id}: {e}")

if __name__ == "__main__":
    SOURCES = [
        {"url": "https://www.youtube.com/@senadomexico", "jurisdiction": "Mexico", "body": "Senado"},
        {"url": "https://www.youtube.com/@rajyasabhatv", "jurisdiction": "India", "body": "Rajya Sabha"},
        {"url": "https://www.youtube.com/@parlcanada", "jurisdiction": "Canada", "body": "Federal Parliament"},
        {"url": "https://www.youtube.com/@californiastateassembly", "jurisdiction": "US-CA", "body": "California Assembly"},
        {"url": "https://www.youtube.com/@nycouncil", "jurisdiction": "US-NY", "body": "NYC Council"}
    ]

    for source in SOURCES:
        video_ids = get_channel_video_ids(source["url"], limit=5)  # grab 5 most recent
        for vid in video_ids:
            save_transcript(vid, source["jurisdiction"], source["body"])

