import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

const mockAlerts = [
  {
    id: "alert-001",
    title: "High Risk: Pawan Kalyan Mobilizes Against Mining Project",
    message:
      "Deputy Chief Minister Pawan Kalyan has called for protests against the proposed iron ore mining project in Visakhapatnam. Immediate stakeholder engagement recommended.",
    severity: "high",
    country: "India",
    sector: "iron_ore",
    timestamp: new Date("2025-01-20T09:15:00Z"),
    source: "Political Monitoring System",
    actionRequired: true,
    affectedOperations: ["Land Acquisition", "Community Relations", "Government Affairs"],
    recommendedActions: [
      "Initiate dialogue with Jana Sena Party leadership",
      "Enhance community engagement programs",
      "Review environmental impact mitigation measures",
      "Prepare stakeholder communication strategy",
    ],
  },
  {
    id: "alert-002",
    title: "Medium Risk: New Indigenous Consultation Requirements in Canada",
    message:
      "Federal government has extended mandatory consultation periods to 90 days for all mining permits on traditional territories. Review current project timelines.",
    severity: "medium",
    country: "Canada",
    sector: "mining",
    timestamp: new Date("2025-01-19T11:30:00Z"),
    source: "Regulatory Monitoring System",
    actionRequired: true,
    affectedOperations: ["Permit Applications", "Project Planning", "Legal Compliance"],
    recommendedActions: [
      "Update project timelines to account for extended consultation",
      "Initiate early engagement with affected Indigenous communities",
      "Review legal compliance frameworks",
      "Assess budget impact of extended timelines",
    ],
  },
  {
    id: "alert-003",
    title: "Critical Risk: Amazon Mining Moratorium Proposed in Brazil",
    message:
      "Environmental groups are pushing for a complete moratorium on new mining permits in Amazon regions. Monitor legislative developments closely.",
    severity: "critical",
    country: "Brazil",
    sector: "iron_ore",
    timestamp: new Date("2025-01-18T14:45:00Z"),
    source: "Legislative Monitoring System",
    actionRequired: true,
    affectedOperations: ["Strategic Planning", "Government Relations", "Environmental Compliance"],
    recommendedActions: [
      "Engage with government officials and legislators",
      "Prepare alternative operational scenarios",
      "Strengthen environmental compliance programs",
      "Develop public relations strategy",
    ],
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const severity = searchParams.get("severity")
    const country = searchParams.get("country")
    const sector = searchParams.get("sector")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!isDatabaseAvailable()) {
      // Filter mock alerts
      let filteredAlerts = mockAlerts

      if (severity) {
        filteredAlerts = filteredAlerts.filter((alert) => alert.severity === severity)
      }
      if (country) {
        filteredAlerts = filteredAlerts.filter((alert) => alert.country.toLowerCase() === country.toLowerCase())
      }
      if (sector) {
        filteredAlerts = filteredAlerts.filter((alert) => alert.sector === sector)
      }

      return NextResponse.json({
        success: true,
        alerts: filteredAlerts.slice(0, limit),
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("risk_alerts")

    // Build query
    const query: any = {}
    if (severity) query.severity = severity
    if (country) query.country = country
    if (sector) query.sector = sector

    const alerts = await collection.find(query).sort({ timestamp: -1 }).limit(limit).toArray()

    return NextResponse.json({
      success: true,
      alerts,
      source: "database",
    })
  } catch (error) {
    console.error("Alerts API error:", error)

    return NextResponse.json({
      success: true,
      alerts: mockAlerts,
      source: "mock_fallback",
      error: "Database unavailable, using mock data",
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, userId, alertType = "keyword" } = body

    if (!query || !userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Query and userId are required",
        },
        { status: 400 },
      )
    }

    // Generate alert ID
    const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    if (!isDatabaseAvailable()) {
      // Mock alert creation
      return NextResponse.json({
        success: true,
        alertId,
        message: `Alert created for query: "${query}"`,
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("user_alerts")

    const alertDoc = {
      alertId,
      userId,
      query,
      alertType,
      createdAt: new Date(),
      isActive: true,
      lastTriggered: null,
      triggerCount: 0,
    }

    await collection.insertOne(alertDoc)

    return NextResponse.json({
      success: true,
      alertId,
      message: `Alert created for query: "${query}"`,
      source: "database",
    })
  } catch (error) {
    console.error("Alert creation error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create alert",
      },
      { status: 500 },
    )
  }
}
