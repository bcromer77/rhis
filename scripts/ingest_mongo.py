import os
import json
from pymongo import MongoClient
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")

# MongoDB Atlas connection
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["rhis_prism"]
collection = db["regulatory_objects"]

# OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_embedding(text: str):
    return openai_client.embeddings.create(
        model="text-embedding-3-small",  # cost-effective + good quality
        input=text
    ).data[0].embedding

# Reset collection (only while testing)
collection.drop()

# Load merged dataset
with open("merged_data.json") as f:
    data = json.load(f)

docs = []
for obj in data:
    text_blob = f"{obj.get('type','')} {obj.get('country','')} {obj.get('content','')} {obj.get('metadata','')}"
    emb = get_embedding(text_blob)
    doc = obj.copy()
    doc["embedding"] = emb
    docs.append(doc)

collection.insert_many(docs)
print(f"✅ Inserted {len(docs)} docs into MongoDB Atlas with embeddings")
