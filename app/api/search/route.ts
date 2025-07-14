import { type NextRequest, NextResponse } from "next/server"
import { getDatabase, isDatabaseAvailable } from "@/lib/mongodb"

// Mock search results for when database is not available
const mockSearchResults = [
  {
    title: "New Environmental Impact Assessment Requirements for Coal Mining",
    content:
      "The Ministry of Environment has introduced stricter environmental impact assessment requirements for coal mining operations. These new regulations mandate comprehensive biodiversity studies, water quality assessments, and community consultation processes before any mining permits are approved.",
    country: "india",
    sector: "coal",
    topic: "Environmental",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-15"),
    source: "Ministry of Environment, Forest and Climate Change",
    tags: [
      "environmental impact",
      "coal mining",
      "biodiversity",
      "water quality",
      "community consultation",
      "mining permits",
      "regulations",
      "compliance",
    ],
    metadata: {
      documentType: "regulation",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-03-01"),
    },
    score: 0.95,
    relevance: 95,
    matchedTags: ["environmental impact", "coal mining"],
    searchContext: "Title and content match",
  },
  {
    title: "Indigenous Land Rights Consultation Framework for Mining",
    content:
      "New mandatory consultation process for mining permits on traditional territories. The framework requires free, prior, and informed consent from Indigenous communities and establishes benefit-sharing agreements.",
    country: "canada",
    sector: "uranium",
    topic: "Indigenous Rights",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-25"),
    source: "Crown-Indigenous Relations and Northern Affairs Canada",
    tags: [
      "indigenous rights",
      "land rights",
      "consultation",
      "traditional territories",
      "free prior informed consent",
      "benefit sharing",
      "mining permits",
    ],
    metadata: {
      documentType: "framework",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-02-15"),
    },
    score: 0.88,
    relevance: 88,
    matchedTags: ["indigenous rights", "mining permits"],
    searchContext: "Tag and content match",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query, filters = {} } = body

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Query is required",
        },
        { status: 400 },
      )
    }

    if (!isDatabaseAvailable()) {
      // Return filtered mock results
      let results = mockSearchResults

      if (filters.country) {
        results = results.filter((item) => item.country === filters.country)
      }
      if (filters.sector) {
        results = results.filter((item) => item.sector === filters.sector)
      }
      if (filters.topic) {
        results = results.filter((item) => item.topic === filters.topic)
      }
      if (filters.riskLevel) {
        results = results.filter((item) => item.riskLevel === filters.riskLevel)
      }

      // Simple text matching for mock results
      const queryLower = query.toLowerCase()
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(queryLower) ||
          item.content.toLowerCase().includes(queryLower) ||
          item.tags.some((tag) => tag.toLowerCase().includes(queryLower)),
      )

      return NextResponse.json({
        success: true,
        results: results.slice(0, filters.limit || 10),
        source: "mock",
      })
    }

    const db = await getDatabase()
    const collection = db.collection("regulatory_documents")

    // Build search query
    const searchQuery: any = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    }

    // Apply filters
    if (filters.country) searchQuery.country = filters.country
    if (filters.sector) searchQuery.sector = filters.sector
    if (filters.topic) searchQuery.topic = filters.topic
    if (filters.riskLevel) searchQuery.riskLevel = filters.riskLevel

    const results = await collection
      .find(searchQuery)
      .limit(filters.limit || 10)
      .toArray()

    // Add mock scoring for database results
    const scoredResults = results.map((result) => ({
      ...result,
      score: Math.random() * 0.5 + 0.5, // Random score between 0.5-1.0
      relevance: Math.floor((Math.random() * 0.5 + 0.5) * 100),
      matchedTags: result.tags?.slice(0, 3) || [],
      searchContext: "Database match",
    }))

    return NextResponse.json({
      success: true,
      results: scoredResults,
      source: "database",
    })
  } catch (error) {
    console.error("Search API error:", error)

    return NextResponse.json({
      success: true,
      results: mockSearchResults.slice(0, 5),
      source: "mock_fallback",
      error: "Database unavailable, using mock data",
    })
  }
}
