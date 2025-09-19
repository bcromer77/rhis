import yaml

with open("config/accounts.yaml") as f:
    accounts = yaml.safe_load(f)["accounts"]

print(len(accounts), "accounts loaded")

# Show all categories
categories = sorted(set(acc.get("category") for acc in accounts if "category" in acc))
print("Categories:", categories)

# Example: all water accounts
water_accounts = [acc["handle"] for acc in accounts if acc.get("category") == "water"]
print("Water accounts:", water_accounts)

# Example: all MENA region feeds
mena_accounts = [acc["handle"] for acc in accounts if acc.get("region") == "MENA"]
print("MENA accounts:", mena_accounts)

