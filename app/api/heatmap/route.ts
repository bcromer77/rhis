import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

// Mock data for when database is not available
const mockHeatmapData = [
  {
    country: "India",
    sector: "Coal",
    riskLevel: "high",
    regulationCount: 247,
    recentChanges: 12,
    trend: "increasing",
    lastUpdate: "2025-01-15",
    keyRegulations: ["Environmental Impact Assessment", "Land Acquisition Act", "Forest Rights Act"],
  },
  {
    country: "Canada",
    sector: "Gold",
    riskLevel: "medium",
    regulationCount: 156,
    recentChanges: 5,
    trend: "stable",
    lastUpdate: "2025-01-12",
    keyRegulations: ["Indigenous Consultation", "Environmental Assessment", "Mining Tax"],
  },
  {
    country: "Brazil",
    sector: "Iron Ore",
    riskLevel: "critical",
    regulationCount: 203,
    recentChanges: 15,
    trend: "increasing",
    lastUpdate: "2025-01-18",
    keyRegulations: ["Amazon Protection", "Indigenous Territories", "Environmental Licensing"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const sector = searchParams.get("sector")
    const riskLevel = searchParams.get("riskLevel")

    if (!isDatabaseAvailable()) {
      // Return filtered mock data
      let filteredData = mockHeatmapData

      if (country && country !== "All") {
        filteredData = filteredData.filter((item) => item.country.toLowerCase() === country.toLowerCase())
      }
      if (sector && sector !== "All") {
        filteredData = filteredData.filter((item) => item.sector.toLowerCase() === sector.toLowerCase())
      }
      if (riskLevel && riskLevel !== "All") {
        filteredData = filteredData.filter((item) => item.riskLevel === riskLevel)
      }

      return NextResponse.json({
        success: true,
        data: filteredData,
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("regulatory_heatmap")

    // Build query based on filters
    const query: any = {}
    if (country && country !== "All") query.country = country
    if (sector && sector !== "All") query.sector = sector
    if (riskLevel && riskLevel !== "All") query.riskLevel = riskLevel

    const data = await collection.find(query).toArray()

    return NextResponse.json({
      success: true,
      data,
      source: "database",
    })
  } catch (error) {
    console.error("Heatmap API error:", error)

    // Fallback to mock data on error
    return NextResponse.json({
      success: true,
      data: mockHeatmapData,
      source: "mock_fallback",
      error: "Database unavailable, using mock data",
    })
  }
}
