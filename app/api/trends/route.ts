import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

const mockTrends = [
  {
    topic: "Environmental Regulations",
    count: 45,
    trend: 25,
    riskLevel: "high",
    countries: ["India", "Brazil", "Canada"],
    recentEvents: [
      "New EIA requirements in India",
      "Amazon protection measures in Brazil",
      "Indigenous consultation frameworks in Canada",
    ],
  },
  {
    topic: "Indigenous Rights",
    count: 32,
    trend: 20,
    riskLevel: "high",
    countries: ["Canada", "Brazil", "Australia"],
    recentEvents: ["Mandatory consultation periods", "Land rights recognition", "Benefit sharing agreements"],
  },
  {
    topic: "Carbon Emissions",
    count: 28,
    trend: 18,
    riskLevel: "medium",
    countries: ["European Union", "Canada", "Australia"],
    recentEvents: ["Steel industry emission targets", "Carbon tax increases", "Green technology incentives"],
  },
  {
    topic: "Mining Taxation",
    count: 24,
    trend: 15,
    riskLevel: "medium",
    countries: ["Canada", "Australia", "Chile"],
    recentEvents: ["Royalty rate adjustments", "Super profits tax proposals", "Revenue sharing frameworks"],
  },
  {
    topic: "Land Acquisition",
    count: 19,
    trend: 12,
    riskLevel: "high",
    countries: ["India", "Indonesia", "Philippines"],
    recentEvents: ["Community resistance movements", "Compensation framework updates", "Protest activities"],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const days = Number.parseInt(searchParams.get("days") || "7")

    if (!isDatabaseAvailable()) {
      // Filter mock trends by country if specified
      let filteredTrends = mockTrends

      if (country) {
        filteredTrends = mockTrends.filter((trend) =>
          trend.countries.some((c) => c.toLowerCase() === country.toLowerCase()),
        )
      }

      return NextResponse.json({
        success: true,
        trends: filteredTrends,
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("regulatory_documents")

    // Aggregate trending topics from recent documents
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const pipeline = [
      {
        $match: {
          publishedDate: { $gte: cutoffDate },
          ...(country && { country: country }),
        },
      },
      {
        $group: {
          _id: "$topic",
          count: { $sum: 1 },
          riskLevels: { $push: "$riskLevel" },
          countries: { $addToSet: "$country" },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]

    const results = await collection.aggregate(pipeline).toArray()

    // Transform results to match expected format
    const trends = results.map((result) => ({
      topic: result._id,
      count: result.count,
      trend: Math.floor(Math.random() * 30) + 10, // Mock trend percentage
      riskLevel: result.riskLevels.includes("high") || result.riskLevels.includes("critical") ? "high" : "medium",
      countries: result.countries,
      recentEvents: [], // Would need additional query to populate
    }))

    return NextResponse.json({
      success: true,
      trends,
      source: "database",
    })
  } catch (error) {
    console.error("Trends API error:", error)

    return NextResponse.json({
      success: true,
      trends: mockTrends,
      source: "mock_fallback",
      error: "Database unavailable, using mock data",
    })
  }
}
