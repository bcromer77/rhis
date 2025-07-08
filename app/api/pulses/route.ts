import { type NextRequest, NextResponse } from "next/server"
import { vectorSearch } from "@/lib/vector-search"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const sector = searchParams.get("sector")
    const hours = Number.parseInt(searchParams.get("hours") || "24")

    const pulses = await vectorSearch.getRecentPulses(country || undefined, sector || undefined, hours)

    return NextResponse.json({
      pulses,
      total: pulses.length,
      timeframe: `${hours} hours`,
    })
  } catch (error) {
    console.error("Pulses error:", error)
    return NextResponse.json({ error: "Pulses service temporarily unavailable" }, { status: 500 })
  }
}
