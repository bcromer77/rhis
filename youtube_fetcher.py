from youtube_transcript_api import YouTubeTranscriptApi

def fetch_youtube_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
        text = " ".join([entry['text'] for entry in transcript])
        return {
            "id": f"yt_{video_id}",
            "title": f"YouTube Video {video_id}",
            "transcript": text,
            "type": "youtube"
        }
    except Exception as e:
        print(f"⚠️ Failed to fetch transcript for {video_id}: {e}")
        return None
