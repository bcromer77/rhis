import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const mongo = new MongoClient(process.env.MONGO_URI!);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";

    await mongo.connect();
    const db = mongo.db("prism_db");
    const signals = db.collection("signals");

    // Flexible text search across multiple fields
    const results = await signals
      .find({
        $or: [
          { signal: { $regex: q, $options: "i" } },
          { why_traders_care: { $regex: q, $options: "i" } },
          { platform_pitch: { $regex: q, $options: "i" } },
          { country: { $regex: q, $options: "i" } },
        ],
      })
      .sort({ created_at: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json(results);
  } catch (err: any) {
    console.error("❌ API search error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

