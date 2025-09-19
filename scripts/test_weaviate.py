import weaviate

# Connect to local Weaviate (v3 syntax)
client = weaviate.Client("http://localhost:8080")

try:
    print("✅ Connected to Weaviate")

    # Check if class exists and remove it
    existing_classes = [cls['class'] for cls in client.schema.get()['classes']]
    if "RegulatorySignal" in existing_classes:
        client.schema.delete_class("RegulatorySignal")
        print("🗑️ Old class removed")

    # Create a new class (v3 syntax)
    class_obj = {
        "class": "RegulatorySignal",
        "description": "A class to store regulatory signals",
        "properties": [
            {
                "name": "key_issues",
                "dataType": ["text"],
                "description": "Key regulatory issues"
            },
            {
                "name": "market_sector_impact", 
                "dataType": ["text"],
                "description": "Impact on market sectors"
            },
            {
                "name": "who_bleeds",
                "dataType": ["text[]"],
                "description": "Who gets negatively affected"
            },
            {
                "name": "who_benefits",
                "dataType": ["text[]"], 
                "description": "Who benefits from the regulation"
            },
            {
                "name": "legal_compliance_implications",
                "dataType": ["text"],
                "description": "Legal compliance implications"
            }
        ]
    }
    
    client.schema.create_class(class_obj)
    print("✅ Class 'RegulatorySignal' created")

    # Insert sample data (v3 syntax)
    sample_data = {
        "key_issues": "Mexico Senate debates rare earth tariffs",
        "market_sector_impact": "Mining and electronics supply chains may face higher costs",
        "who_bleeds": ["Chinese exporters", "US tech companies"],
        "who_benefits": ["Mexican mining firms", "Local refineries"],
        "legal_compliance_implications": "Possible WTO dispute over tariff violations",
    }
    
    client.data_object.create(sample_data, "RegulatorySignal")
    print("✅ Inserted sample object")
    
    # Query the class (v3 syntax)
    results = client.query.get("RegulatorySignal", [
        "key_issues", 
        "market_sector_impact", 
        "who_bleeds", 
        "who_benefits", 
        "legal_compliance_implications"
    ]).with_limit(1).do()
    
    print("\n📊 Query Results:")
    if results['data']['Get']['RegulatorySignal']:
        for obj in results['data']['Get']['RegulatorySignal']:
            print(obj)
    else:
        print("No objects found")
            
except Exception as e:
    print(f"❌ Error: {e}")
     
finally:
    client.close()  # Always close the client to avoid ResourceWarnings
    print("🛑 Weaviate connection closed")
