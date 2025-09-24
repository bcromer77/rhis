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

    // Create text index if it doesn't exist
    try {
      await signals.createIndex({ 
        signal: "text", 
        title: "text", 
        why_traders_care: "text",
        company: "text"
      });
    } catch (error) {
      // Index might already exist, continue
    }

    // ✅ Fixed MongoDB query - proper .project() usage
    const docs = await signals
      .find({ $text: { $search: headline } })
      .project({ 
        company: 1,
        signal: 1,
        title: 1,
        why_traders_care: 1,
        commodity: 1,
        tickers: 1,
        country: 1,
        sentiment: 1,
        severity: 1,
        source: 1,
        date: 1,
        tags: 1,
        who_loses: 1,
        who_wins: 1,
        _mlBucket: 1,
        score: { $meta: "textScore" }
      })
      .sort({ score: { $meta: "textScore" } })
      .limit(12)
      .toArray();

    const cards = docs.map((d: any) => ({
      _id: d._id,
      company: d.company || "Unknown Company",
      signal: d.signal || d.title || "No signal available",
      why_traders_care: d.why_traders_care || "Impact assessment pending",
      commodity: d.commodity || "General",
      tickers: d.tickers || [],
      country: d.country || "Global",
      sentiment: d.sentiment || "Neutral",
      severity: d.severity || (d._mlBucket === "risks" ? "CRITICAL" : "OPPORTUNITY"),
      source: d.source || "PRISM Intelligence",
      date: d.date || new Date().toISOString(),
      tags: d.tags || [],
      who_loses: d.who_loses || "Assessment pending",
      who_wins: d.who_wins || "Assessment pending",
      _score: d.score || 0,
    }));

    return NextResponse.json({
      ok: true,
      headline,
      total: cards.length,
      docs: cards,
      storyboard: {
        tldr:
          cards.length > 0
            ? `Found ${cards.length} relevant signals for '${headline}' with market intelligence insights`
            : `No direct signals found for '${headline}'. Try broader search terms or check back later for updates.`,
      },
    });

  } catch (err: any) {
    console.error("❌ Headline Search API Error:", err);
    return NextResponse.json(
      { 
        ok: false, 
        error: "Failed to search headlines",
        details: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
      }, 
      { status: 500 }
    );
  }
}

// Optional: Add GET method for testing
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const headline = searchParams.get('headline');
  
  if (!headline) {
    return NextResponse.json(
      { ok: false, error: "Headline query parameter required" },
      { status: 400 }
    );
  }

  // Convert GET to POST format internally
  const mockRequest = {
    json: async () => ({ headline })
  } as NextRequest;

  return POST(mockRequest);
}
