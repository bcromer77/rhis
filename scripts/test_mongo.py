import os
from pymongo import MongoClient
from dotenv import load_dotenv
from openai import OpenAI

# explicitly point to .env
load_dotenv(dotenv_path=".env")

print("OPENAI_API_KEY starts with:", os.getenv("OPENAI_API_KEY")[:15])

try:
    client = MongoClient(os.getenv("MONGO_URI"))
    print("✅ Mongo connected. Databases:", client.list_database_names())
except Exception as e:
    print("❌ Mongo connection failed:", e)
