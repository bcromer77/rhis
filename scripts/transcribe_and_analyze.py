# scripts/transcribe_and_analyze.py
import os
import sys
import requests
from dotenv import load_dotenv

# --- Load environment variables ---
load_dotenv()

XAI_KEY = os.getenv("XAI_API_KEY")
YT_KEY = os.getenv("YOUTUBE_TRANSCRIPT_API_KEY")

if not XAI_KEY or not YT_KEY:
    print("❌ Missing API keys in .env (XAI_API_KEY or YOUTUBE_TRANSCRIPT_API_KEY)")
    sys.exit(1)

# --- Fetch transcript from youtube-transcript.io ---
def fetch_transcript(video_id: str) -> str:
    print(f"\n🎥 Fetching transcript for video: {video_id}")
    url = "https://www.youtube-transcript.io/api/v1/transcripts"
    headers = {
        "Authorization": f"Basic {YT_KEY}",
        "Content-Type": "application/json",
    }
    resp = requests.post(url, headers=headers, json={"ids": [video_id]}, timeout=60)

    if resp.status_code != 200:
        raise Exception(f"Transcript fetch failed: {resp.status_code} {resp.text}")

    data = resp.json()
    print("DEBUG: Raw API Response Structure:", str(data)[:400])

    # Prefer "segments" if available
    if isinstance(data, list) and "segments" in data[0]:
        transcript = " ".join([seg["text"] for seg in data[0]["segments"]])
        print(f"✅ Transcript length: {len(transcript)} chars")
        return transcript

    # Otherwise, fallback to description
    if isinstance(data, list):
        desc = (
            data[0]
            .get("microformat", {})
            .get("playerMicroformatRenderer", {})
            .get("description", {})
            .get("simpleText", "")
        )
        if desc:
            print(f"✅ Fallback to description: {len(desc)} chars")
            return desc

    raise Exception("Transcript JSON missing both 'segments' and 'description'")

# --- Analyze transcript with Grok ---
def analyze_with_grok(text: str) -> dict:
    print("\n🤖 Sending transcript to Grok...")
    headers = {"Authorization": f"Bearer {XAI_KEY}", "Content-Type": "application/json"}
    prompt = f"""
    Analyze this legislative transcript and summarize:
    - Key issues
    - Market/sector impact
    - Who bleeds? Who benefits?
    - Legal/compliance implications
    Transcript (first 1000 chars): {text[:1000]}
    Return JSON with keys:
    key_issues, market_sector_impact, who_bleeds, who_benefits, legal_compliance_implications
    """

    resp = requests.post(
        "https://api.x.ai/v1/chat/completions",
        headers=headers,
        json={
            "model": "grok-3",  # ✅ upgraded from grok-beta
            "messages": [{"role": "user", "content": prompt}],
        },
        timeout=60,
    )

    print("DEBUG: XAI Key Prefix:", XAI_KEY[:10] + "...")
    print("DEBUG: Grok Response Status:", resp.status_code)

    if resp.status_code != 200:
        raise Exception(f"Grok API failed: {resp.status_code} {resp.text}")

    try:
        content = resp.json()["choices"][0]["message"]["content"]
        analysis = requests.utils.json.loads(content)
        return analysis
    except Exception as e:
        raise Exception(f"Failed to parse Grok response: {e}\nRaw: {resp.text}")

# --- CLI entrypoint ---
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scripts/transcribe_and_analyze.py <YouTubeVideoID>")
        sys.exit(1)

    video_id = sys.argv[1]
    try:
        transcript = fetch_transcript(video_id)
        analysis = analyze_with_grok(transcript)
        print("\n📊 Analysis Result (JSON-ready):")
        print(analysis)
    except Exception as e:
        print(f"❌ Error: {e}")

