// app/api/headline-search/route.ts
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
      return NextResponse.json(
        { ok: false, error: "Headline required" },
        { status: 400 }
      );
    }

    const client = await getClient();
    const db = client.db(DB_NAME);
    const signals = db.collection(COLLECTION);

    // --- Simple full-text search for demo ---
    const docs = await signals
      .find({ $text: { $search: headline } })
      .project({ score: { $meta: "textScore" } })
      .sort({ score: { $meta: "textScore" } })
      .limit(8) // keep it light for demo
      .toArray();

    // Map to clean "Crisis Card" format
    const cards = docs.map((d: any) => ({
      id: d._id.toString(),
      company: d.company ?? "Unknown",
      signal: d.signal ?? d.title ?? headline,
      why_traders_care: d.why_traders_care ?? "No context available",
      commodity: d.commodity ?? [],
      tickers: d.tickers ?? [],
      country: d.country ?? "Global",
      severity: d.severity ?? "info", // demo-friendly fallback
      sentiment: d.sentiment ?? 0,
      source: d.source ?? "Unknown",
      date: d.date ?? new Date().toISOString(),
    }));

    return NextResponse.json({
      ok: true,
      headline,
      total: cards.length,
      docs: cards,
      storyboard: {
        tldr:
          cards.length > 0
            ? `Found ${cards.length} signals for '${headline}'`
            : `No signals yet for '${headline}'`,
      },
    });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}

