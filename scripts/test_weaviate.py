
from weaviate import WeaviateClient
from weaviate.connect import ConnectionParams

# Connect to local Weaviate running on 8080 + gRPC on 50051
client = WeaviateClient(
    connection_params=ConnectionParams.from_url(
        "http://localhost:8080",  # REST
        50051                     # gRPC
    )
)

print("✅ Connected to Weaviate")

# Define schema for RegulatorySignal
schema = {
    "class": "RegulatorySignal",
    "properties": [
        {"name": "key_issues", "dataType": ["text"]},
        {"name": "market_sector_impact", "dataType": ["text"]},
        {"name": "who_bleeds", "dataType": ["text[]"]},
        {"name": "who_benefits", "dataType": ["text[]"]},
        {"name": "legal_compliance_implications", "dataType": ["text"]}
    ]
}

# Delete if exists (clean test run)
try:
    client.collections.delete("RegulatorySignal")
    print("🗑️ Old collection removed")
except Exception:
    pass

# Create collection
client.collections.create(schema)
print("✅ Collection 'RegulatorySignal' created")

# Insert a sample object
obj = {
    "key_issues": "Mexico Senate debates rare earth tariffs",
    "market_sector_impact": "Mining and electronics supply chains may face higher costs",
    "who_bleeds": ["Chinese exporters", "US tech companies"],
    "who_benefits": ["Mexican mining firms", "Local refineries"],
    "legal_compliance_implications": "Possible WTO dispute over tariff violations"
}

client.collections.get("RegulatorySignal").data.insert(obj)
print("✅ Inserted sample object")

# Query it back
results = client.collections.get("RegulatorySignal").query.fetch_objects(limit=3)

print("\n📊 Query Results:")
for r in results.objects:
    print(r.properties)

