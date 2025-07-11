import { getDatabase, isDatabaseAvailable } from "./mongodb"
import type { ObjectId } from "mongodb"

export interface RegulatoryDocument {
  _id?: ObjectId
  title: string
  content: string
  country: string
  sector: string
  topic: string
  region: string
  riskLevel: "high" | "medium" | "low"
  publishedDate: Date
  source: string
  embedding?: number[]
  tags: string[]
  metadata: {
    documentType: string
    jurisdiction: string
    status: string
    effectiveDate?: Date
  }
}

export interface SearchResult extends RegulatoryDocument {
  score: number
  relevance: number
  matchedTags: string[]
  searchContext: string
}

// Enhanced mock data with comprehensive tagging for better vector search simulation
const mockDocuments: RegulatoryDocument[] = [
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
  },
  {
    title: "Gold Mining Royalty Rate Adjustment Proposal",
    content:
      "Provincial government is considering a 15% increase in gold mining royalty rates to fund infrastructure development. The proposal includes new taxation frameworks and revenue sharing agreements with local communities.",
    country: "canada",
    sector: "gold",
    topic: "Taxation",
    region: "Provincial",
    riskLevel: "medium",
    publishedDate: new Date("2024-01-20"),
    source: "Ontario Ministry of Northern Development",
    tags: [
      "gold mining",
      "royalty rates",
      "taxation",
      "infrastructure",
      "revenue sharing",
      "local communities",
      "financial impact",
    ],
    metadata: {
      documentType: "proposal",
      jurisdiction: "provincial",
      status: "under_review",
      effectiveDate: new Date("2024-06-01"),
    },
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
  },
  {
    title: "Carbon Emissions Reduction Targets for Steel Industry",
    content:
      "European Union announces new carbon emissions reduction targets specifically for steel production facilities. Companies must reduce emissions by 40% by 2030 or face significant carbon tax penalties.",
    country: "european_union",
    sector: "steel",
    topic: "Environmental",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-02-01"),
    source: "European Commission",
    tags: [
      "carbon emissions",
      "steel industry",
      "reduction targets",
      "carbon tax",
      "penalties",
      "environmental compliance",
      "2030 targets",
    ],
    metadata: {
      documentType: "directive",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-04-01"),
    },
  },
  {
    title: "Land Acquisition Protests in Andhra Pradesh Mining Regions",
    content:
      "Pawan Kalyan leads protests against forced land acquisition for mining projects in Andhra Pradesh. Local communities demand fair compensation and environmental protection measures.",
    country: "india",
    sector: "iron_ore",
    topic: "Social Unrest",
    region: "State",
    riskLevel: "high",
    publishedDate: new Date("2024-02-10"),
    source: "Jana Sena Party Press Release",
    tags: [
      "land acquisition",
      "protests",
      "pawan kalyan",
      "andhra pradesh",
      "mining projects",
      "fair compensation",
      "environmental protection",
      "social unrest",
    ],
    metadata: {
      documentType: "news",
      jurisdiction: "state",
      status: "ongoing",
    },
  },
  {
    title: "Brazil Amazon Mining Restrictions Under Marina Silva",
    content:
      "Former Environment Minister Marina Silva advocates for stricter mining restrictions in Amazon regions. New proposals include mandatory reforestation and indigenous consultation requirements.",
    country: "brazil",
    sector: "iron_ore",
    topic: "Environmental",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-02-15"),
    source: "Brazilian Environmental Ministry",
    tags: [
      "amazon",
      "mining restrictions",
      "marina silva",
      "reforestation",
      "indigenous consultation",
      "environmental protection",
      "brazil",
    ],
    metadata: {
      documentType: "proposal",
      jurisdiction: "federal",
      status: "under_review",
    },
  },
  {
    title: "Mexico Green Energy Transition Excludes Mining from Priority Projects",
    content:
      "President Claudia Sheinbaum's administration excludes mining from Mexico's top 100 priority projects, focusing instead on renewable energy and sustainable development initiatives.",
    country: "mexico",
    sector: "mining",
    topic: "Policy",
    region: "Federal",
    riskLevel: "medium",
    publishedDate: new Date("2024-02-20"),
    source: "Mexican Presidency",
    tags: [
      "green energy",
      "transition",
      "claudia sheinbaum",
      "priority projects",
      "renewable energy",
      "sustainable development",
      "mining exclusion",
    ],
    metadata: {
      documentType: "policy",
      jurisdiction: "federal",
      status: "active",
    },
  },
  {
    title: "Greta Thunberg Calls for Steel Industry Carbon Tax Reform",
    content:
      "Climate activist Greta Thunberg demands immediate implementation of carbon border adjustments for steel imports, targeting high-emission producers globally.",
    country: "global",
    sector: "steel",
    topic: "Environmental",
    region: "International",
    riskLevel: "high",
    publishedDate: new Date("2024-02-25"),
    source: "Fridays for Future International",
    tags: [
      "greta thunberg",
      "carbon tax",
      "steel industry",
      "carbon border adjustments",
      "high emissions",
      "climate activism",
      "global impact",
    ],
    metadata: {
      documentType: "statement",
      jurisdiction: "international",
      status: "advocacy",
    },
  },
]

export class VectorSearchService {
  private db: any = null

  private async initializeDb() {
    if (!isDatabaseAvailable()) {
      console.warn("MongoDB not configured, using enhanced mock data")
      return null
    }

    try {
      this.db = await getDatabase()
      return this.db
    } catch (error) {
      console.error("Failed to initialize database:", error)
      return null
    }
  }

  // Enhanced vector search simulation with sophisticated matching
  private simulateVectorSearch(query: string, filters: any): SearchResult[] {
    const queryWords = query
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 2)
    let results = [...mockDocuments]

    // Apply filters first
    if (filters.country) {
      results = results.filter((doc) => doc.country === filters.country)
    }
    if (filters.sector) {
      results = results.filter((doc) => doc.sector === filters.sector)
    }
    if (filters.topic) {
      results = results.filter((doc) => doc.topic === filters.topic)
    }
    if (filters.riskLevel) {
      results = results.filter((doc) => doc.riskLevel === filters.riskLevel)
    }

    // Enhanced search logic with multiple matching strategies
    const scoredResults = results.map((doc) => {
      let score = 0
      const matchedTags: string[] = []
      let searchContext = ""

      // 1. Exact phrase matching in title (highest weight)
      if (doc.title.toLowerCase().includes(query.toLowerCase())) {
        score += 0.4
        searchContext = "Title match"
      }

      // 2. Exact phrase matching in content
      if (doc.content.toLowerCase().includes(query.toLowerCase())) {
        score += 0.3
        searchContext = searchContext ? searchContext + ", Content match" : "Content match"
      }

      // 3. Tag matching (high relevance)
      doc.tags.forEach((tag) => {
        if (queryWords.some((word) => tag.toLowerCase().includes(word))) {
          score += 0.2
          matchedTags.push(tag)
        }
      })

      // 4. Individual word matching in title and content
      queryWords.forEach((word) => {
        if (doc.title.toLowerCase().includes(word)) {
          score += 0.1
        }
        if (doc.content.toLowerCase().includes(word)) {
          score += 0.05
        }
        if (doc.topic.toLowerCase().includes(word)) {
          score += 0.1
        }
      })

      // 5. Semantic similarity simulation (based on related concepts)
      const semanticMatches = this.getSemanticMatches(query, doc)
      score += semanticMatches * 0.15

      // 6. Risk level boost for high-risk items
      if (doc.riskLevel === "high") {
        score += 0.05
      }

      // 7. Recency boost
      const daysSincePublished = (Date.now() - doc.publishedDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSincePublished < 30) {
        score += 0.1
      }

      return {
        ...doc,
        score: Math.min(score, 1), // Cap at 1.0
        relevance: Math.round(Math.min(score, 1) * 100),
        matchedTags,
        searchContext: searchContext || "Semantic match",
      }
    })

    // Filter out results with very low scores and sort by relevance
    return scoredResults
      .filter((result) => result.score > 0.05)
      .sort((a, b) => b.score - a.score)
      .slice(0, filters.limit || 10)
  }

  // Simulate semantic matching based on related concepts
  private getSemanticMatches(query: string, doc: RegulatoryDocument): number {
    const semanticGroups = {
      environmental: ["climate", "carbon", "emissions", "pollution", "sustainability", "green", "renewable"],
      mining: ["extraction", "ore", "coal", "gold", "iron", "uranium", "drilling", "excavation"],
      political: ["government", "policy", "regulation", "law", "minister", "president", "election"],
      social: ["community", "indigenous", "protest", "rights", "consultation", "activism"],
      economic: ["tax", "royalty", "cost", "revenue", "investment", "financial", "economic"],
    }

    let matches = 0
    const queryLower = query.toLowerCase()
    const docText = (doc.title + " " + doc.content + " " + doc.tags.join(" ")).toLowerCase()

    Object.values(semanticGroups).forEach((group) => {
      const queryInGroup = group.some((term) => queryLower.includes(term))
      const docInGroup = group.some((term) => docText.includes(term))
      if (queryInGroup && docInGroup) {
        matches += 0.1
      }
    })

    return matches
  }

  // Vector search with enhanced simulation
  async vectorSearch(
    query: string,
    filters: {
      country?: string
      sector?: string
      topic?: string
      riskLevel?: string
      limit?: number
    } = {},
  ): Promise<SearchResult[]> {
    if (!isDatabaseAvailable()) {
      return this.simulateVectorSearch(query, filters)
    }

    try {
      await this.initializeDb()
      if (!this.db) return this.simulateVectorSearch(query, filters)

      // In a real implementation, this would use actual vector search
      // For now, fall back to enhanced simulation
      return this.simulateVectorSearch(query, filters)
    } catch (error) {
      console.error("Vector search error:", error)
      return this.simulateVectorSearch(query, filters)
    }
  }

  // Get search suggestions based on popular queries
  async getSearchSuggestions(partialQuery: string): Promise<string[]> {
    const suggestions = [
      "carbon emissions steel industry",
      "land acquisition protests india",
      "indigenous rights mining canada",
      "environmental regulations brazil",
      "pawan kalyan andhra pradesh",
      "greta thunberg climate activism",
      "marina silva amazon protection",
      "claudia sheinbaum mexico policy",
      "mining royalty rates canada",
      "steel industry carbon tax",
      "uranium mining restrictions",
      "coal mining environmental impact",
    ]

    return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(partialQuery.toLowerCase())).slice(0, 5)
  }

  // Set up alerts for specific queries
  async setAlert(query: string, userId: string): Promise<{ success: boolean; alertId: string }> {
    // Simulate alert creation
    const alertId = `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log(`Alert set for user ${userId}: "${query}" (ID: ${alertId})`)

    return {
      success: true,
      alertId,
    }
  }

  // Get recent regulatory pulses with enhanced data
  async getRecentPulses(country?: string, sector?: string, hours = 24): Promise<RegulatoryDocument[]> {
    if (!isDatabaseAvailable()) {
      return this.mockGetRecentPulses(country, sector)
    }

    try {
      await this.initializeDb()
      if (!this.db) return this.mockGetRecentPulses(country, sector)

      const collection = this.db.collection("regulatory_documents")
      const cutoffDate = new Date(Date.now() - hours * 60 * 60 * 1000)

      const filter: any = {
        publishedDate: { $gte: cutoffDate },
      }

      if (country) filter.country = country
      if (sector) filter.sector = sector

      const results = await collection.find(filter).sort({ publishedDate: -1 }).limit(20).toArray()
      return results as RegulatoryDocument[]
    } catch (error) {
      console.error("Error getting pulses:", error)
      return this.mockGetRecentPulses(country, sector)
    }
  }

  private mockGetRecentPulses(country?: string, sector?: string): RegulatoryDocument[] {
    let results = [...mockDocuments]

    if (country) {
      results = results.filter((doc) => doc.country === country)
    }
    if (sector) {
      results = results.filter((doc) => doc.sector === sector)
    }

    return results.sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime()).slice(0, 5)
  }

  // Get trending topics with enhanced analytics
  async getTrendingTopics(
    country?: string,
    days = 7,
  ): Promise<Array<{ topic: string; count: number; trend: number; riskLevel: string }>> {
    if (!isDatabaseAvailable()) {
      return this.mockGetTrendingTopics(country)
    }

    try {
      await this.initializeDb()
      if (!this.db) return this.mockGetTrendingTopics(country)

      // Real implementation would use aggregation pipeline
      return this.mockGetTrendingTopics(country)
    } catch (error) {
      console.error("Error getting trending topics:", error)
      return this.mockGetTrendingTopics(country)
    }
  }

  private mockGetTrendingTopics(
    country?: string,
  ): Array<{ topic: string; count: number; trend: number; riskLevel: string }> {
    const topics = [
      { topic: "Environmental", count: 15, trend: 25, riskLevel: "high" },
      { topic: "Indigenous Rights", count: 12, trend: 20, riskLevel: "high" },
      { topic: "Taxation", count: 8, trend: 15, riskLevel: "medium" },
      { topic: "Social Unrest", count: 10, trend: 18, riskLevel: "high" },
      { topic: "Policy", count: 6, trend: 12, riskLevel: "medium" },
    ]

    return topics
  }
}

export const vectorSearch = new VectorSearchService()
