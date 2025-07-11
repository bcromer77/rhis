import { type NextRequest, NextResponse } from "next/server"
import { vectorSearch } from "@/lib/vector-search"

export async function POST(request: NextRequest) {
  try {
    const { query, filters } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const results = await vectorSearch.vectorSearch(query, filters)

    return NextResponse.json({
      results,
      total: results.length,
      query,
      filters,
    })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Search service temporarily unavailable" }, { status: 500 })
  }
}
