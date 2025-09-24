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

    // Enhanced text search with scoring
    const docs = await signals
      .find(
        { $text: { $search: headline } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(12)
      .toArray();

    // Map into Crisis Card shape with enhanced structure
    const cards = docs.map((d: any) => ({
      _id: d._id,
      company: d.company || "Unknown Company",
      signal: d.signal || d.title || "Signal detected",
      description: d.description || d.why_traders_care || "No description available",
      why_traders_care: d.why_traders_care || "Market impact analysis pending",
      commodity: Array.isArray(d.commodity) ? d.commodity : (d.commodity ? [d.commodity] : []),
      tickers: Array.isArray(d.tickers) ? d.tickers : (d.tickers ? [d.tickers] : []),
      country: d.country || "Global",
      sentiment: typeof d.sentiment === 'number' ? d.sentiment : 0,
      severity: d.severity || (d.sentiment && d.sentiment < -0.3 ? "CRITICAL" : 
                              d.sentiment && d.sentiment < 0.3 ? "WARNING" : "OPPORTUNITY"),
      source: d.source || "Internal Analysis",
      date: d.date || d.created_at || new Date().toISOString(),
      tags: Array.isArray(d.tags) ? d.tags : [],
      // 🚨 Crisis Card specific fields
      who_loses: d.who_loses || d.losers || "Analysis pending",
      who_wins: d.who_wins || d.winners || "Analysis pending",
      _score: d.score || 0,
      _mlBucket: d._mlBucket || (d.sentiment && d.sentiment < 0 ? "risks" : "opportunities"),
    }));

    // Calculate overall sentiment
    const overallSentiment = cards.length > 0 
      ? cards.reduce((sum, card) => sum + (card.sentiment || 0), 0) / cards.length 
      : 0;

    return NextResponse.json({
      ok: true,
      headline,
      total: cards.length,
      docs: cards,
      sentiment: overallSentiment,
      storyboard: {
        tldr: cards.length > 0
          ? `Found ${cards.length} signals for '${headline}'. Overall sentiment: ${overallSentiment > 0.3 ? 'Positive' : overallSentiment < -0.3 ? 'Negative' : 'Mixed'}`
          : `No direct signals found for '${headline}'. Try broader terms like 'FDA', 'lithium', or company tickers.`,
        sentiment_label: overallSentiment > 0.3 ? 'Bullish' : overallSentiment < -0.3 ? 'Bearish' : 'Neutral'
      },
    });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return NextResponse.json({ 
      ok: false, 
      error: err.message,
      docs: [], // Fallback to empty array
      total: 0
    }, { status: 500 });
  }
}

// Also support GET requests for testing
export async function GET(req: NextRequest) {
  const headline = req.nextUrl.searchParams.get("headline") || "";
  if (!headline) {
    return NextResponse.json({ ok: false, error: "Headline parameter required" }, { status: 400 });
  }
  
  // Reuse POST logic
  return POST(new NextRequest(req.url, {
    method: 'POST',
    body: JSON.stringify({ headline }),
    headers: { 'Content-Type': 'application/json' }
  }));
}
