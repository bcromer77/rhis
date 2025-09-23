import requests
import json
from datetime import datetime

def get_gov_video_ids(query, num_results=5):
    # Use web_search tool or API to get recent IDs (simulate with hardcode for now; integrate tool)
    # Example from search: IDs for Sept 2025 Senate sessions
    ids = ['clUjPPwXeXs', '5atPa-VB5PM', 'R8Zm3nEvzrk']  # From Senate plenary Sept 16, 2025
    return ids

def fetch_gov_transcripts(video_ids, token, country, topic):
    """
    Fetch transcripts for government videos using youtube-transcript.io API.
    """
    url = "https://www.youtube-transcript.io/api/transcripts"
    headers = {
        "Authorization": f"Basic {token}",
        "Content-Type": "application/json"
    }
    data = {"ids": video_ids[:50]}
    try:
        response = requests.post(url, headers=headers, data=json.dumps(data))
        response.raise_for_status()
        results = response.json()
        transcripts = []
        for result in results.get('results', []):
            video_id = result.get('id')
            transcript_chunks = result.get('transcript', [])
            chunks = [{'timestamp': f"{chunk.get('start', 0):.2f}", 'text': chunk.get('text', ''), 'speaker': 'Unknown'} for chunk in transcript_chunks]
            transcripts.append({
                '_id': video_id,
                'type': 'youtube_gov',
                'country': country,
                'topic': topic,
                'content': ' '.join(c['text'] for c in chunks),
                'metadata': {
                    'url': f"https://youtube.com/watch?v={video_id}",
                    'title': result.get('title', 'Gov Hearing'),
                    'date': datetime.now().isoformat(),
                    'transcript_chunks': chunks
                },
                'timestamp': datetime.now().isoformat()
            })
        return transcripts
    except requests.exceptions.RequestException as e:
        print(f"API error: {e}")
        return []

# Example call
video_ids = get_gov_video_ids("Philippines Senate plenary September 2025 YouTube")
data = fetch_gov_transcripts(video_ids, os.getenv('YOUTUBE_TRANSCRIPT_TOKEN'), 'Philippines', 'senate_hearing')
