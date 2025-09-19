import yaml, sys

try:
    with open("config/accounts.yaml") as f:
        yaml.safe_load(f)
    print("✅ accounts.yaml is valid")
except Exception as e:
    print("❌ YAML error:", e)
    sys.exit(1)

