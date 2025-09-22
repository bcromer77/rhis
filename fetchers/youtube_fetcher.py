from youtube_transcript_api import YouTubeTranscriptApi

def fetch_youtube_videos(video_ids=None):
    """
    Fetch transcripts for a list of YouTube video IDs.
    Returns a list of docs in the format PRISM expects.
    """
    if video_ids is None:
        # Default example placeholder IDs (replace with real ones relevant to your project)
        video_ids = [
            "dQw4w9WgXcQ",   # Example
            "3JZ_D3ELwOQ"    # Example
        ]

    docs = []
    for vid in video_ids:
        try:
            transcript = YouTubeTranscriptApi.get_transcript(
                vid, languages=['en']
            )
            text = " ".join([entry['text'] for entry in transcript])

            docs.append({
                "id": f"yt_{vid}",
                "title": f"YouTube Video {vid}",
                "transcript": text,
                "type": "youtube",
                "url": f"https://www.youtube.com/watch?v={vid}"
            })
            print(f"✅ Transcript fetched for video {vid}")
        except Exception as e:
            print(f"⚠️ Failed to fetch transcript for {vid}: {e}")
    return docs


# Test block: runs only if you call this file directly
if __name__ == "__main__":
    test_ids = ["dQw4w9WgXcQ"]  # Replace with a real video ID if needed
    docs = fetch_youtube_videos(test_ids)
    if docs:
        print("Fields:", docs[0].keys())
        print("Sample transcript:", docs[0]['transcript'][:200])
    else:
        print("⚠️ No transcripts fetched")
