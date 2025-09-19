import os, requests
from dotenv import load_dotenv

# Load keys from .env
load_dotenv()
api_key = os.getenv("XAI_API_KEY")

# Call Grok API
resp = requests.post(
    "https://api.x.ai/v1/chat/completions",
    headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
    json={
        "model": "grok-2-latest",
        "messages": [
            {"role": "user", "content": "Summarize the US housing market in one sentence."}
        ]
    },
    timeout=30
)

print(resp.json()["choices"][0]["message"]["content"])

