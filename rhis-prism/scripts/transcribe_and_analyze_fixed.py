import os
import requests
import sys
import json
from dotenv import load_dotenv

load_dotenv()

XAI_KEY = os.getenv("XAI_API_KEY")
YT_KEY = os.getenv("YOUTUBE_TRANSCRIPT_API_KEY")

if not XAI_KEY or not YT_KEY:
    print("❌ Missing API keys in .env (XAI_API_KEY or YOUTUBE_TRANSCRIPT_API_KEY)")
    sys.exit(1)


def fetch_transcript(video_id: str) -> str:
    """Pull transcript text from youtube-transcript.io"""
    url = "https://www.youtube-transcript.io/api/transcripts"
    headers = {
        "Authorization": f"Basic {YT_KEY}",
        "Content-Type": "application/json"
    }
    resp = requests.post(url, headers=headers, json={"ids": [video_id]}, timeout=60)

    if resp.status_code != 200:
        raise Exception(f"Transcript fetch failed: {resp.status_code} {resp.text}")

    data = resp.json()
    print(f"DEBUG: Raw API Response Structure: {json.dumps(data, indent=2)[:500]}...")  # Audit: Log for compliance

    if not data or not isinstance(data, list) or not data[0]:
        raise Exception("Transcript response empty or invalid video ID")

    video = data[0]

    # Prefer transcript segments if available and non-empty
    if "segments" in video and video["segments"] and isinstance(video["segments"], list):
        transcript_text = " ".join([seg.get("text", "") for seg in video["segments"] if seg.get("text")])
        if transcript_text.strip():
            print(f"✅ Transcript fetched: {len(transcript_text)} chars from segments")
            return transcript_text

    # Fallback to video description via microformat if available
    if "microformat" in video:
        micro = video["microformat"].get("playerMicroformatRenderer", {})
        desc = micro.get("description", {})
        if isinstance(desc, dict) and "simpleText" in desc:
            desc_text = desc["simpleText"]
            if desc_text.strip():
                print(f"✅ Fallback to description: {len(desc_text)} chars")
                return desc_text
        elif isinstance(desc, str) and desc.strip():
            print(f"✅ Fallback to description: {len(desc)} chars")
            return desc

    raise Exception(f"No transcript segments or description available for video {video_id}. Try YouTube Data API or Whisper for audio.")


def analyze_with_grok(text: str) -> str:
    prompt = f"""
    Analyze this legislative transcript and summarize in structured format:
    - Key issue(s) discussed
    - Market/sector impact
    - Who bleeds? Who benefits?
    - Legal/compliance implications
    Transcript (first 1000 chars shown): {text[:1000]}
    Output as JSON for easy parsing. End with disclaimer: "Informational only—not legal advice."
    """
    resp = requests.post(
        "https://api.x.ai/v1/chat/completions",
        headers={"Authorization": f"Bearer {XAI_KEY}", "Content-Type": "application/json"},
        json={
            "model": "grok-beta",  # Fixed: Use stable model (grok-beta for Grok-2; change to grok-4 for SuperGrok)
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.3  # Low for factual output
        },
        timeout=60
    )
    
    print(f"DEBUG: Grok Response Status: {resp.status_code}")  # Audit log
    if resp.status_code != 200:
        raise Exception(f"Grok API failed: {resp.status_code} {resp.text}")
    
    try:
        response_json = resp.json()
        print(f"DEBUG: Grok Response Keys: {list(response_json.keys())}")  # Check for 'choices'
        
        if "choices" not in response_json:
            raise Exception(f"No 'choices' in response: {json.dumps(response_json, indent=2)}")  # Full error details
        
        return response_json["choices"][0]["message"]["content"]
    except (KeyError, IndexError, ValueError) as e:
        raise Exception(f"JSON parse error in Grok response: {e}. Full response: {json.dumps(response_json if 'response_json' in locals() else resp.text, indent=2)}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/transcribe_and_analyze.py <YouTubeVideoID>")
        sys.exit(1)

    video_id = sys.argv[1]
    print(f"\n🎥 Fetching transcript for video: {video_id}")
    try:
        transcript = fetch_transcript(video_id)
    except Exception as e:
        print(f"❌ Fetch Error: {e}")
        sys.exit(1)

    print("\n🤖 Sending transcript to Grok...")
    try:
        analysis = analyze_with_grok(transcript)
    except Exception as e:
        print(f"❌ Analysis Error: {e}")
        sys.exit(1)

    print("\n📊 Analysis Result:\n")
    print(analysis)


if __name__ == "__main__":
    main()
