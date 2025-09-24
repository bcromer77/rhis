import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import OpenAI from "openai";

const MONGO_URI = process.env.MONGO_URI!;
const DB_NAME = "prism_db";
const COLLECTION = "signals";
const OPENAI_KEY = process.env.OPENAI_API_KEY;

let cachedClient: MongoClient | null = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  cachedClient = new MongoClient(MONGO_URI);
  await cachedClient.connect();
  return cachedClient;
}

async function embedQuery(query: string) {
  const openai = new OpenAI({ apiKey: OPENAI_KEY });
  const resp = await openai.embeddings.create({
    input: query,
    model: "text-embedding-3-small", // or same model you seeded with
  });
  return resp.data[0].embedding;
}

async function summarizeSignals(headline: string, docs: any[]) {
  if (!OPENAI_KEY) return null;
  const openai = new OpenAI({ apiKey: OPENAI_KEY });

  // Collapse content for LLM
  const context = docs
    .map(
      (d) =>
        `• ${d.company || "Unknown Company"} — ${d.signal || d.title} (${d.severity}): ${d.why_traders_care || d.description}`
    )
    .join("\n");

  const prompt = `You are a financial ESG risk analyst. Summarize these signals into 2-3 crisp sentences for an executive, highlighting risks, opportunities, and implications:\n\nQuery: ${headline}\nSignals:\n${context}\n\nSummary:`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini", // fast + cheap, perfect for TLDR
    messages: [{ role: "user", content: prompt }],
    max_tokens: 120,
    temperature: 0.6,
  });

  return resp.choices[0].message?.content?.trim() || null;
}

export async function POST(req: NextRequest) {
  try {
    const { headline, k = 10 } = await req.json();
    if (!headline) {
      return NextResponse.json(
        { ok: false, error: "Headline required" },
        { status: 400 }
      );
    }

    const client = await getClient();
    const db = client.db(DB_NAME);
    const signals = db.collection(COLLECTION);

    // embed query
    const queryEmbedding = await embedQuery(headline);

    // vector search pipeline
    const pipeline: any[] = [
      {
        $vectorSearch: {
          queryVector: queryEmbedding,
          path: "embedding",
          numCandidates: 50,
          limit: k,
          index: "default",
        },
      },
      { $limit: k },
    ];

    const docs = await signals.aggregate(pipeline).toArray();

    const cards = docs.map((d: any) => ({
      _id: d._id,
      company: d.company,
      signal: d.signal || d.title,
      why_traders_care: d.why_traders_care,
      commodity: d.commodity,
      tickers: d.tickers,
      country: d.country,
      sentiment: d.sentiment,
      _mlBucket: d._mlBucket,
      _mlWind: d._mlWind,
      severity: d.severity,
      description: d.description,
      source: d.source,
      tags: d.tags,
      date: d.date || new Date().toISOString(),
    }));

    // 🎯 Generate TLDR summary
    const tldr = docs.length > 0 ? await summarizeSignals(headline, docs) : null;

    return NextResponse.json({
      ok: true,
      headline,
      total: cards.length,
      docs: cards,
      storyboard: { tldr: tldr || `Found ${cards.length} relevant signals.` },
    });
  } catch (err: any) {
    console.error("❌ API error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
