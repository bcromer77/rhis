import os
import tweepy

def fetch_x_posts():
    """Fetch recent X (Twitter) posts for keywords"""
    bearer_token = os.getenv("X_BEARER_TOKEN")
    if not bearer_token:
        print("⚠️ Missing X_BEARER_TOKEN in environment")
        return []

    client = tweepy.Client(bearer_token=bearer_token)
    query = "Mexico OR Canada OR Energy OR Mining lang:en -is:retweet"
    try:
        tweets = client.search_recent_tweets(query=query, max_results=10)
        docs = []
        for t in tweets.data:
            docs.append({
                "id": f"x_{t.id}",
                "title": "X post",
                "transcript": t.text,
                "type": "x"
            })
        return docs
    except Exception as e:
        print(f"X fetch failed: {e}")
        return []
