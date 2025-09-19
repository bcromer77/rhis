import json, glob

merged = []

# Loop through all JSON files in the data folders
for file in glob.glob("data/**/**/*.json", recursive=True):
    with open(file) as f:
        data = json.load(f)

        # --- Task 1: YouTube transcripts ---
        if "transcripts" in file:
            # handle Argentina/Colombia/Canada naming differences
            task_keys = [
                "task1_youtube_transcripts",
                "task1_youtube_transcripts_argentina",
                "task1_youtube_transcripts_colombia",
                "task1_youtube_transcripts_canada"
            ]
            for key in task_keys:
                if key in data:
                    for t in data[key]:
                        merged.append({
                            "type": "transcript",
                            "country": t["metadata"]["jurisdiction"],
                            "content": " ".join([c["text"] for c in t["transcript_chunks"]]),
                            "metadata": {
                                "date": t.get("date", ""),
                                "topic": t["metadata"].get("topic", ""),
                                "stakeholders": t["metadata"].get("stakeholders_mentioned", [])
                            }
                        })

        # --- Task 2: PDFs ---
        if "pdfs" in file:
            task_keys = [
                "task2_government_pdfs",
                "task2_government_pdfs_argentina",
                "task2_government_pdfs_colombia",
                "task2_government_pdfs_canada"
            ]
            for key in task_keys:
                if key in data:
                    for p in data[key]:
                        merged.append({
                            "type": "pdf",
                            "country": p.get("jurisdiction", "unknown"),
                            "content": " ".join([c["text"] for c in p.get("chunks", [])]),
                            "metadata": {
                                "date": p.get("date", ""),
                                "topic": p.get("title", "")
                            }
                        })

        # --- Task 3: Entities ---
        if "entities" in file:
            entities = data.get("entities", [])
            for e in entities:
                merged.append({
                    "type": "entity",
                    "country": e.get("region", "unknown"),
                    "content": e.get("name", ""),
                    "metadata": {
                        "role": e.get("role", "N/A"),
                        "influence_score": e.get("influence_score", 0),
                        "stance": e.get("stance", "unknown")
                    }
                })

        # --- Task 4: Comparison ---
        if "comparison" in file:
            # The comparison is usually a dict with law/ICSID information
            if isinstance(data, dict) and len(data) > 0:
                comparison = list(data.values())[0]
                if isinstance(comparison, dict):
                    merged.append({
                        "type": "comparison",
                        "country": comparison.get("law_indigenous_consultation", {}).get("title", "unknown"),
                        "content": comparison.get("focus_analysis", ""),
                        "metadata": comparison.get("law_indigenous_consultation", {})
                    })

# Write out combined JSON
with open("merged_data.json", "w") as out:
    json.dump(merged, out, indent=2)

print(f"Merged {len(merged)} objects into merged_data.json")
