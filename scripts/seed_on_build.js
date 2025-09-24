// scripts/seed_on_build.js
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import OpenAI from "openai";

dotenv.config({ path: ".env" });

const MONGO_URI = process.env.MONGO_URI;
const OPENAI_KEY = process.env.OPENAI_KEY;

if (!MONGO_URI) throw new Error("❌ MONGO_URI not set");
if (!OPENAI_KEY) throw new Error("❌ OPENAI_KEY not set");

const openai = new OpenAI({ apiKey: OPENAI_KEY });

async function embed(text) {
  const emb = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });
  return emb.data[0].embedding;
}

async function run() {
  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db("prism_db");
  const coll = db.collection("signals");

  const seeds = [
    {
      signal: "Mexico halts new lithium concessions",
      why_traders_care: "Blocks foreign firms, raises supply risk.",
      platform_pitch: "Lithium policy shock = mining equities volatility.",
      country: "Mexico",
      commodity: ["lithium"],
    },
    {
      signal: "FDA places clinical hold on Sarepta gene therapy trial",
      why_traders_care: "Pauses a key Duchenne therapy, big biotech risk.",
      platform_pitch: "Biotech fortunes swing on one FDA sentence.",
      country: "USA",
      commodity: ["biotech"],
    },
    {
      signal: "Nexstar Media gains approval for political ad expansion",
      why_traders_care: "Boosts revenues into US election cycle.",
      platform_pitch: "Regulatory approvals unlock media upside.",
      country: "USA",
      commodity: ["media"],
    },
    {
      signal: "MP Materials expands rare earth processing facility",
      why_traders_care: "Supports US reshoring strategy vs. China.",
      platform_pitch: "Critical minerals = geopolitical alpha.",
      country: "USA",
      commodity: ["rare earths"],
    },
  ];

  for (const seed of seeds) {
    const embedding = await embed(seed.signal);
    await coll.updateOne(
      { signal: seed.signal },
      { $set: { ...seed, created_at: new Date(), embedding } },
      { upsert: true }
    );
    console.log(`✅ Seeded: ${seed.signal}`);
  }

  await client.close();
  console.log("🎉 Done seeding demo signals");
}

run().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});

