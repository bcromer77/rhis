import { type NextRequest, NextResponse } from "next/server"
import { vectorSearch } from "@/lib/vector-search"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const days = Number.parseInt(searchParams.get("days") || "7")

    const trends = await vectorSearch.getTrendingTopics(country || undefined, days)

    return NextResponse.json({
      trends,
      timeframe: `${days} days`,
      country: country || "all",
    })
  } catch (error) {
    console.error("Trends error:", error)
    return NextResponse.json({ error: "Trends service temporarily unavailable" }, { status: 500 })
  }
}
