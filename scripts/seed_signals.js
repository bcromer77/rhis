import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";
import OpenAI from "openai";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const OPENAI_KEY = process.env.OPENAI_KEY;
if (!MONGO_URI) throw new Error("MONGO_URI not set in .env.local");
if (!OPENAI_KEY) throw new Error("OPENAI_KEY not set in .env.local");

const client = new MongoClient(MONGO_URI);
const openai = new OpenAI({ apiKey: OPENAI_KEY });

const seedDocs = [
  {
    signal: "Mexico halts new lithium concessions",
    why_traders_care:
      "Foreign miners excluded, North American supply chains tighten",
    commodity: ["lithium"],
    country: "Mexico",
  },
  {
    signal: "FDA places clinical hold on Sarepta gene therapy trial",
    why_traders_care:
      "Regulatory pause could delay revenue and impact biotech sentiment",
    commodity: ["biotech"],
    country: "USA",
  },
  {
    signal: "Nexstar Media gains approval for political ad expansion",
    why_traders_care:
      "Election cycle spending is a tailwind for broadcasters",
    commodity: ["media"],
    country: "USA",
  },
  {
    signal: "MP Materials expands rare earth processing facility",
    why_traders_care:
      "Boosts US independence from Chinese supply chains in rare earth minerals",
    commodity: ["rare earths"],
    country: "USA",
  },
];

async function main() {
  await client.connect();
  const db = client.db("prism_db");
  const coll = db.collection("signals");

  for (const doc of seedDocs) {
    const text = `${doc.signal} ${doc.why_traders_care}`;
    const emb = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: text,
    });

    await coll.insertOne({
      ...doc,
      created_at: new Date(),
      embedding: emb.data[0].embedding,
    });

    console.log(`✅ Inserted: ${doc.signal}`);
  }

  await client.close();
  console.log("🎉 All seed docs inserted with embeddings");
}

main().catch((err) => {
  console.error("❌ Error inserting docs:", err);
  process.exit(1);
});

