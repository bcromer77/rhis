import os
from pymongo import MongoClient
from openai import OpenAI
from dotenv import load_dotenv

# Load env
load_dotenv(dotenv_path=".env")

# MongoDB
client = MongoClient(os.getenv("MONGO_URI"))
db = client["rhis_prism"]
collection = db["regulatory_objects"]

# OpenAI
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_embedding(text: str):
    return openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    ).data[0].embedding

# 👇 Example query
query_text = "indigenous consultation in Jujuy lithium mining"
query_vector = get_embedding(query_text)

pipeline = [
    {
        "$vectorSearch": {
            "queryVector": query_vector,
            "path": "embedding",
            "numCandidates": 100,
            "limit": 5,
            "index": "rhis_prism"  # matches your index name in Atlas
        }
    },
    {
        "$project": {
            "country": 1,
            "content": 1,
            "score": {"$meta": "vectorSearchScore"}
        }
    }
]

results = list(collection.aggregate(pipeline))
print(f"\n🔎 Results for: {query_text}\n")
for r in results:
    print(f"[{r.get('country','?')}] {r['content'][:120]}... (score={r['score']:.4f})")
