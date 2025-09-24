import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const MONGO_URI = process.env.MONGO_URI!;
const DB_NAME = "prism_db";
const COLLECTION = "signals";

let cachedClient: MongoClient | null = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(MONGO_URI);
  await cachedClient.connect();
  return cachedClient;
}

export async function POST(req: NextRequest) {
  try {
    const { headline } = await req.json();
    if (!headline) {
      return NextResponse.json({ ok: false, error: "Headline required" }, { status: 400 });
    }

    const client = await getClient();
    const db = client.db(DB_NAME);
    const signals = db.collection(COLLECTION);

    // ✅ Safe query for demo — no type conflicts
    const docs = await signals
      .find({ $text: { $search: headline } })
      .project({ score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(12)
      .toArray();

    // Crisis Card friendly shape
    const cards = docs.map((d: any) => ({
      _id: d._id,
      company: d.company,
      signal: d.signal || d.title,
      why_traders_care: d.why_traders_care,
      severity: d.severity,
      description: d.description,
      source: d.source,
      date: d.date || new Date().toISOString(),
    }));

    return NextResponse.json({
      ok: true,
      headline,
      total: cards.length,
      docs: cards,
      storyboard: { tldr: `Found ${cards.length} signals for '${headline}'` },
    });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

