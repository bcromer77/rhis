import requests
import yaml
import os
from dotenv import load_dotenv

load_dotenv()
YT_KEY = os.getenv("YOUTUBE_DATA_API_KEY")

def find_channel(label):
    query = label + " site:youtube.com"
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&q={query}&type=channel&key={YT_KEY}&maxResults=1"
    r = requests.get(url)
    if r.status_code != 200:
        return None
    items = r.json().get("items", [])
    if not items:
        return None
    return f"https://www.youtube.com/channel/{items[0]['snippet']['channelId']}"

with open("config/sources.yaml") as f:
    sources = yaml.safe_load(f)

for s in sources:
    if s.get("url") in (None, "none", ""):
        channel = find_channel(s["label"])
        if channel:
            print(f"✅ Found channel for {s['label']}: {channel}")
            s["url"] = channel
        else:
            print(f"❌ No channel found for {s['label']}")

with open("config/sources.yaml", "w") as f:
    yaml.dump(sources, f, allow_unicode=True)

