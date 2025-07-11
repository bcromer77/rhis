import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get("timeframe") || "30" // days
    const dimension = searchParams.get("dimension") || "country-sector" // country-sector, topic-risk, time-series

    if (!isDatabaseAvailable()) {
      // Return mock data when database is not available
      return NextResponse.json({
        data: getMockHeatmapData(dimension),
        dimension,
        timeframe: `${timeframe} days`,
        generatedAt: new Date().toISOString(),
        note: "Using mock data - MongoDB not configured",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("regulatory_documents")

    const cutoffDate = new Date(Date.now() - Number.parseInt(timeframe) * 24 * 60 * 60 * 1000)

    let heatmapData

    switch (dimension) {
      case "country-sector":
        heatmapData = await getCountrySectorHeatmap(collection, cutoffDate)
        break
      case "topic-risk":
        heatmapData = await getTopicRiskHeatmap(collection, cutoffDate)
        break
      case "time-series":
        heatmapData = await getTimeSeriesHeatmap(collection, cutoffDate)
        break
      default:
        heatmapData = await getCountrySectorHeatmap(collection, cutoffDate)
    }

    return NextResponse.json({
      data: heatmapData,
      dimension,
      timeframe: `${timeframe} days`,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Heatmap error:", error)

    // Fallback to mock data on error
    const { searchParams } = new URL(request.url)
    const dimension = searchParams.get("dimension") || "country-sector"
    const timeframe = searchParams.get("timeframe") || "30"

    return NextResponse.json({
      data: getMockHeatmapData(dimension),
      dimension,
      timeframe: `${timeframe} days`,
      generatedAt: new Date().toISOString(),
      note: "Using mock data due to database error",
    })
  }
}

function getMockHeatmapData(dimension: string) {
  switch (dimension) {
    case "country-sector":
      return [
        {
          country: "india",
          sector: "coal",
          count: 23,
          highRiskCount: 8,
          mediumRiskCount: 10,
          lowRiskCount: 5,
          intensity: 45,
          riskScore: 2.1,
          topics: ["Environmental", "Safety"],
          latestUpdate: new Date().toISOString(),
        },
        {
          country: "canada",
          sector: "gold",
          count: 18,
          highRiskCount: 5,
          mediumRiskCount: 8,
          lowRiskCount: 5,
          intensity: 35,
          riskScore: 1.8,
          topics: ["Taxation", "Indigenous Rights"],
          latestUpdate: new Date().toISOString(),
        },
        {
          country: "mexico",
          sector: "silver",
          count: 12,
          highRiskCount: 2,
          mediumRiskCount: 6,
          lowRiskCount: 4,
          intensity: 20,
          riskScore: 1.5,
          topics: ["Export", "Safety"],
          latestUpdate: new Date().toISOString(),
        },
      ]
    case "topic-risk":
      return [
        {
          topic: "Environmental",
          riskLevel: "high",
          count: 15,
          countries: ["india", "canada"],
          sectors: ["coal", "uranium"],
          intensity: 45,
          latestUpdate: new Date().toISOString(),
        },
        {
          topic: "Safety",
          riskLevel: "medium",
          count: 12,
          countries: ["mexico", "canada"],
          sectors: ["copper", "gold"],
          intensity: 24,
          latestUpdate: new Date().toISOString(),
        },
      ]
    case "time-series":
      return [
        {
          date: "2024-01-15",
          country: "india",
          count: 8,
          highRiskCount: 3,
          sectors: ["coal"],
          topics: ["Environmental"],
          intensity: 14,
        },
        {
          date: "2024-01-16",
          country: "canada",
          count: 5,
          highRiskCount: 2,
          sectors: ["gold"],
          topics: ["Taxation"],
          intensity: 9,
        },
      ]
    default:
      return []
  }
}

async function getCountrySectorHeatmap(collection: any, cutoffDate: Date) {
  const pipeline = [
    {
      $match: {
        publishedDate: { $gte: cutoffDate },
      },
    },
    {
      $group: {
        _id: {
          country: "$country",
          sector: "$sector",
        },
        count: { $sum: 1 },
        highRiskCount: {
          $sum: { $cond: [{ $eq: ["$riskLevel", "high"] }, 1, 0] },
        },
        mediumRiskCount: {
          $sum: { $cond: [{ $eq: ["$riskLevel", "medium"] }, 1, 0] },
        },
        lowRiskCount: {
          $sum: { $cond: [{ $eq: ["$riskLevel", "low"] }, 1, 0] },
        },
        avgRiskScore: {
          $avg: {
            $switch: {
              branches: [
                { case: { $eq: ["$riskLevel", "high"] }, then: 3 },
                { case: { $eq: ["$riskLevel", "medium"] }, then: 2 },
                { case: { $eq: ["$riskLevel", "low"] }, then: 1 },
              ],
              default: 1,
            },
          },
        },
        topics: { $addToSet: "$topic" },
        latestUpdate: { $max: "$publishedDate" },
      },
    },
    {
      $project: {
        country: "$_id.country",
        sector: "$_id.sector",
        count: 1,
        highRiskCount: 1,
        mediumRiskCount: 1,
        lowRiskCount: 1,
        intensity: { $multiply: ["$avgRiskScore", "$count"] },
        riskScore: "$avgRiskScore",
        topics: 1,
        latestUpdate: 1,
      },
    },
    {
      $sort: { intensity: -1 },
    },
  ]

  return await collection.aggregate(pipeline).toArray()
}

async function getTopicRiskHeatmap(collection: any, cutoffDate: Date) {
  const pipeline = [
    {
      $match: {
        publishedDate: { $gte: cutoffDate },
      },
    },
    {
      $group: {
        _id: {
          topic: "$topic",
          riskLevel: "$riskLevel",
        },
        count: { $sum: 1 },
        countries: { $addToSet: "$country" },
        sectors: { $addToSet: "$sector" },
        latestUpdate: { $max: "$publishedDate" },
      },
    },
    {
      $project: {
        topic: "$_id.topic",
        riskLevel: "$_id.riskLevel",
        count: 1,
        countries: 1,
        sectors: 1,
        latestUpdate: 1,
        intensity: {
          $multiply: [
            "$count",
            {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id.riskLevel", "high"] }, then: 3 },
                  { case: { $eq: ["$_id.riskLevel", "medium"] }, then: 2 },
                  { case: { $eq: ["$_id.riskLevel", "low"] }, then: 1 },
                ],
                default: 1,
              },
            },
          ],
        },
      },
    },
    {
      $sort: { intensity: -1 },
    },
  ]

  return await collection.aggregate(pipeline).toArray()
}

async function getTimeSeriesHeatmap(collection: any, cutoffDate: Date) {
  const pipeline = [
    {
      $match: {
        publishedDate: { $gte: cutoffDate },
      },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$publishedDate",
            },
          },
          country: "$country",
        },
        count: { $sum: 1 },
        highRiskCount: {
          $sum: { $cond: [{ $eq: ["$riskLevel", "high"] }, 1, 0] },
        },
        sectors: { $addToSet: "$sector" },
        topics: { $addToSet: "$topic" },
      },
    },
    {
      $project: {
        date: "$_id.date",
        country: "$_id.country",
        count: 1,
        highRiskCount: 1,
        sectors: 1,
        topics: 1,
        intensity: { $add: ["$count", { $multiply: ["$highRiskCount", 2] }] },
      },
    },
    {
      $sort: { date: 1, intensity: -1 },
    },
  ]

  return await collection.aggregate(pipeline).toArray()
}
