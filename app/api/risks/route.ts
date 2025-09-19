import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

const mockRiskData = [
  {
    id: "risk-001",
    title: "Pawan Kalyan Opposition to Land Acquisition",
    category: "Political",
    riskLevel: "high",
    riskScore: 85,
    country: "India",
    region: "Andhra Pradesh",
    description:
      "Deputy Chief Minister Pawan Kalyan's strong opposition to land acquisition for industrial projects poses significant risks to mining operations in Andhra Pradesh.",
    keyFactors: [
      "Growing political influence",
      "Strong community support",
      "Environmental activism",
      "Land rights advocacy",
    ],
    potentialImpacts: ["Project delays", "Increased compliance costs", "Community resistance", "Regulatory scrutiny"],
    mitigationStrategies: [
      "Enhanced community engagement",
      "Transparent compensation processes",
      "Environmental impact mitigation",
      "Political stakeholder dialogue",
    ],
    lastUpdated: new Date("2025-01-20"),
    trend: "increasing",
  },
  {
    id: "risk-002",
    title: "Indigenous Rights Strengthening in Canada",
    category: "Regulatory",
    riskLevel: "medium",
    riskScore: 72,
    country: "Canada",
    region: "Federal",
    description:
      "New federal requirements for Indigenous consultation and consent are extending project timelines and increasing compliance complexity.",
    keyFactors: [
      "Mandatory consultation periods",
      "Free, prior, informed consent requirements",
      "Benefit sharing obligations",
      "Traditional territory recognition",
    ],
    potentialImpacts: [
      "Extended project timelines",
      "Additional compliance costs",
      "Legal challenges",
      "Operational delays",
    ],
    mitigationStrategies: [
      "Early Indigenous engagement",
      "Benefit sharing agreements",
      "Cultural sensitivity training",
      "Legal compliance frameworks",
    ],
    lastUpdated: new Date("2025-01-19"),
    trend: "stable",
  },
  {
    id: "risk-003",
    title: "Amazon Mining Restrictions in Brazil",
    category: "Environmental",
    riskLevel: "critical",
    riskScore: 92,
    country: "Brazil",
    region: "Amazon",
    description:
      "Tightening environmental regulations and international pressure are severely restricting mining operations in Amazon regions.",
    keyFactors: [
      "International environmental pressure",
      "Deforestation concerns",
      "Indigenous territory protection",
      "Climate change commitments",
    ],
    potentialImpacts: [
      "Operational shutdowns",
      "Massive compliance costs",
      "International sanctions",
      "Reputational damage",
    ],
    mitigationStrategies: [
      "Sustainable mining practices",
      "Reforestation programs",
      "Indigenous partnerships",
      "Environmental technology adoption",
    ],
    lastUpdated: new Date("2025-01-18"),
    trend: "increasing",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const country = searchParams.get("country")
    const category = searchParams.get("category")
    const riskLevel = searchParams.get("riskLevel")

    if (!isDatabaseAvailable()) {
      // Filter mock data
      let filteredRisks = mockRiskData

      if (country) {
        filteredRisks = filteredRisks.filter((risk) => risk.country.toLowerCase() === country.toLowerCase())
      }
      if (category) {
        filteredRisks = filteredRisks.filter((risk) => risk.category.toLowerCase() === category.toLowerCase())
      }
      if (riskLevel) {
        filteredRisks = filteredRisks.filter((risk) => risk.riskLevel === riskLevel)
      }

      return NextResponse.json({
        success: true,
        risks: filteredRisks,
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("political_risks")

    // Build query
    const query: any = {}
    if (country) query.country = country
    if (category) query.category = category
    if (riskLevel) query.riskLevel = riskLevel

    const risks = await collection.find(query).sort({ riskScore: -1, lastUpdated: -1 }).toArray()

    return NextResponse.json({
      success: true,
      risks,
      source: "database",
    })
  } catch (error) {
    console.error("Risks API error:", error)

    return NextResponse.json({
      success: true,
      risks: mockRiskData,
      source: "mock_fallback",
      error: "Database unavailable, using mock data",
    })
  }
}
