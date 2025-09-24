// app/api/headline-search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, Db } from "mongodb";
import OpenAI from "openai";

// ---------- ENV ----------
const MONGO_URI = process.env.MONGO_URI!;
const OPENAI_KEY = process.env.OPENAI_KEY!;
if (!MONGO_URI) throw new Error("❌ MONGO_URI is not set");
if (!OPENAI_KEY) throw new Error("❌ OPENAI_KEY is not set");

// ---------- GLOBAL CLIENTS ----------
const mongo = new MongoClient(MONGO_URI, { maxPoolSize: 10 });
const openai = new OpenAI({ apiKey: OPENAI_KEY });
let cachedDb: Db | null = null;

// ---------- HELPERS ----------
function classifyHeuristic(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("ban") || lower.includes("halt") || lower.includes("litigation")) {
    return { bucket: "risks", wind: "headwinds", sentiment: -0.5 };
  }
  if (lower.includes("investment") || lower.includes("expansion") || lower.includes("approved")) {
    return { bucket: "opportunities", wind: "tailwinds", sentiment: 0.5 };
  }
  return { bucket: "opportunities", wind: "tailwinds", sentiment: 0.0 };
}

// ---------- ROUTES ----------
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const headline = (body.headline || "").trim();
  const k = Math.min(Number(body.k || 8), 50);

  if (!headline) {
    return NextResponse.json({ ok: false, error: "No headline provided" }, { status: 400 });
  }

  console.log("🔍 Searching for:", headline);

  try {
    // --- connect to Mongo ---
    if (!cachedDb) {
      await mongo.connect();
      cachedDb = mongo.db("prism_db");
      console.log("✅ Connected to Mongo");
    }

    // --- run vector search ---
    const coll = cachedDb.collection("signals");
    const emb = await openai.embeddings.create({
      model: "text-embedding-3-large",
      input: headline,
    });
    const qvec = emb.data[0].embedding;

    console.log("✅ Got embedding");

    const docs = await coll
      .aggregate([
        {
          $search: {
            index: "default", // update if your index is named differently
            knnBeta: { vector: qvec, path: "embedding", k: k * 3 },
          },
        },
        { $limit: k },
      ])
      .toArray();

    console.log(`✅ Got ${docs.length} docs`);

    // --- classify with LLM ---
    let classifications: any[] = [];
    if (docs.length > 0) {
      const prompt = `Classify each signal into:
- bucket: opportunities or risks
- wind: tailwinds or headwinds
- sentiment: float -1.0 → 1.0

Return ONLY JSON array like:
[{"id":"1","bucket":"opportunities","wind":"tailwinds","sentiment":0.3}] 

Signals:
${docs.map((d, i) => `id:${i} :: ${d.signal || ""}`).join("\n")}`;

      try {
        const resp = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.1,
        });

        const raw = resp.choices[0]?.message?.content ?? "[]";
        classifications = JSON.parse(raw);
        console.log("✅ LLM classification parsed");
      } catch (err) {
        console.warn("⚠️ LLM classification failed, falling back to heuristics");
        classifications = docs.map((d, i) => ({
          id: String(i),
          ...classifyHeuristic(d.signal || ""),
        }));
      }
    }

    // --- storyboard summary ---
    let storyboard: any = {};
    try {
      const boardPrompt = `Summarize the headline "${headline}" with key risks, opportunities, and second-order plays. 
Return JSON with keys: tldr, opps, risks, sentiment_label.`;

      const resp = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: boardPrompt }],
        temperature: 0.3,
      });

      const raw = resp.choices[0]?.message?.content ?? "{}";
      storyboard = JSON.parse(raw);
      console.log("✅ Storyboard built");
    } catch {
      storyboard = { tldr: "No summary available" };
    }

    return NextResponse.json({
      ok: true,
      headline,
      total_docs: docs.length,
      docs,
      classifications,
      storyboard,
    });
  } catch (err) {
    console.error("❌ Handler error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

