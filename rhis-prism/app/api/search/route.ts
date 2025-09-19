import { NextRequest, NextResponse } from "next/server"

const WEAVIATE_URL = process.env.WEAVIATE_URL || "http://localhost:8080"
const X_BEARER = process.env.X_BEARER

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json(
        { success: false, error: "Missing query" },
        { status: 400 }
      )
    }

    // --- 1. Query Weaviate (transcripts) ---
    let transcripts: any[] = []
    try {
      const weaviateRes = await fetch(`${WEAVIATE_URL}/v1/graphql`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `{
            Get {
              RegulatorySignal(
                limit: 5
                nearText: { concepts: ["${query}"] }
              ) {
                title
                video_id
                key_issues
              }
            }
          }`,
        }),
      })

      const weaviateJson = await weaviateRes.json()
      transcripts = weaviateJson?.data?.Get?.RegulatorySignal || []
    } catch (err) {
      console.error("Weaviate error:", err)
    }

    // --- 2. Query X API (tweets) ---
    let tweets: any[] = []
    if (X_BEARER) {
      try {
        const xRes = await fetch(
          `https://api.x.com/2/tweets/search/recent?query=${encodeURIComponent(
            query
          )} lang:es -is:retweet&max_results=10&tweet.fields=author_id,created_at,text&expansions=author_id&user.fields=username,description,public_metrics`,
          { headers: { Authorization: `Bearer ${X_BEARER}` } }
        )

        const xJson = await xRes.json()
        tweets = xJson?.data || []
      } catch (err) {
        console.error("X API error:", err)
      }
    }

    // --- 3. Merge and return ---
    return NextResponse.json({
      success: true,
      query,
      transcripts,
      tweets,
    })
  } catch (error) {
    console.error("Search API error:", error)
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    )
  }
}
