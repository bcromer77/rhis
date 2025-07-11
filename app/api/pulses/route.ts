import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

const mockPulses = [
  {
    id: "pulse-001",
    title: "Pawan Kalyan Opposes New Mining Project in Andhra Pradesh",
    content:
      "Deputy Chief Minister Pawan Kalyan has publicly opposed a new iron ore mining project in Visakhapatnam district, citing environmental concerns and lack of community consultation.",
    country: "india",
    sector: "iron_ore",
    riskLevel: "high",
    timestamp: new Date("2025-01-20T10:30:00Z"),
    source: "Jana Sena Party Press Release",
    tags: ["pawan kalyan", "mining opposition", "environmental concerns", "andhra pradesh"],
    impact: "Potential delays in project approval and increased regulatory scrutiny",
    affectedOperations: ["Land Acquisition", "Environmental Clearance", "Community Relations"],
  },
  {
    id: "pulse-002",
    title: "Canada Introduces New Indigenous Consultation Requirements",
    content:
      "Federal government announces mandatory 90-day consultation period with Indigenous communities for all new mining permits on traditional territories.",
    country: "canada",
    sector: "mining",
    riskLevel: "medium",
    timestamp: new Date("2025-01-19T14:15:00Z"),
    source: "Crown-Indigenous Relations Canada",
    tags: ["indigenous rights", "consultation requirements", "mining permits", "canada"],
    impact: "Extended project timelines and additional compliance costs",
    affectedOperations: ["Permit Applications", "Community Engagement", "Project Planning"],
  },
  {
    id: "pulse-003",
    title: "Brazil Tightens Amazon Mining Regulations",
    content:
      "Environmental ministry announces stricter regulations for mining operations in Amazon region, including mandatory reforestation bonds and enhanced monitoring.",
    country: "brazil",
    sector: "iron_ore",
    riskLevel: "high",
    timestamp: new Date("2025-01-18T16:45:00Z"),
    source: "Brazilian Ministry of Environment",
    tags: ["amazon regulations", "environmental protection", "mining restrictions", "brazil"],
    impact: "Increased operational costs and potential project restrictions",
    affectedOperations: ["Environmental Compliance", "Cost Management", "Operational Planning"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const sector = searchParams.get("sector")
    const hours = Number.parseInt(searchParams.get("hours") || "24")

    if (!isDatabaseAvailable()) {
      // Filter mock data
      let filteredPulses = mockPulses

      if (country) {
        filteredPulses = filteredPulses.filter((pulse) => pulse.country === country)
      }
      if (sector) {
        filteredPulses = filteredPulses.filter((pulse) => pulse.sector === sector)
      }

      // Filter by time (mock data is always recent)
      const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000)
      filteredPulses = filteredPulses.filter((pulse) => pulse.timestamp >= cutoffTime)

      return NextResponse.json({
        success: true,
        pulses: filteredPulses,
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("regulatory_pulses")

    // Build query
    const query: any = {
      timestamp: { $gte: new Date(Date.now() - hours * 60 * 60 * 1000) },
    }

    if (country) query.country = country
    if (sector) query.sector = sector

    const pulses = await collection.find(query).sort({ timestamp: -1 }).limit(20).toArray()

    return NextResponse.json({
      success: true,
      pulses,
      source: "database",
    })
  } catch (error) {
    console.error("Pulses API error:", error)

    return NextResponse.json({
      success: true,
      pulses: mockPulses,
      source: "mock_fallback",
      error: "Database unavailable, using mock data",
    })
  }
}
