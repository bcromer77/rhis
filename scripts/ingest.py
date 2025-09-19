import weaviate
import json
import os

# Connect to local Weaviate (v4 syntax with skip_init_checks)
client = weaviate.connect_to_local(skip_init_checks=True)

try:
    # Delete existing collection if it exists
    if client.collections.exists("RegulatoryObject"):
        client.collections.delete("RegulatoryObject")
    
    # Create collection with schema
    collection = client.collections.create(
        name="RegulatoryObject",
        description="Merged regulatory intel across multiple countries",
        vectorizer_config=weaviate.classes.config.Configure.Vectorizer.text2vec_openai(),
        properties=[
            weaviate.classes.config.Property(name="type", data_type=weaviate.classes.config.DataType.TEXT),
            weaviate.classes.config.Property(name="country", data_type=weaviate.classes.config.DataType.TEXT),
            weaviate.classes.config.Property(name="content", data_type=weaviate.classes.config.DataType.TEXT),
            weaviate.classes.config.Property(name="metadata", data_type=weaviate.classes.config.DataType.TEXT)
        ]
    )
    
    # Load your merged data
    with open("merged_data.json") as f:
        data = json.load(f)
    
    # Batch insert
    with collection.batch.dynamic() as batch:
        for obj in data:
            batch.add_object(
                properties=obj
            )
    
    print(f"Ingested {len(data)} objects into Weaviate ✅")

finally:
    client.close()
