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
}

// Mock data for when database is not available
const mockDocuments: RegulatoryDocument[] = [
  {
    title: "New Environmental Impact Assessment Requirements for Coal Mining",
    content:
      "The Ministry of Environment has introduced stricter environmental impact assessment requirements for coal mining operations.",
    country: "india",
    sector: "coal",
    topic: "Environmental",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-15"),
    source: "Ministry of Environment, Forest and Climate Change",
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
      "Provincial government is considering a 15% increase in gold mining royalty rates to fund infrastructure development.",
    country: "canada",
    sector: "gold",
    topic: "Taxation",
    region: "Provincial",
    riskLevel: "medium",
    publishedDate: new Date("2024-01-20"),
    source: "Ontario Ministry of Northern Development",
    metadata: {
      documentType: "proposal",
      jurisdiction: "provincial",
      status: "under_review",
      effectiveDate: new Date("2024-06-01"),
    },
  },
  {
    title: "Indigenous Land Rights Consultation Framework for Mining",
    content: "New mandatory consultation process for mining permits on traditional territories.",
    country: "canada",
    sector: "uranium",
    topic: "Indigenous Rights",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-25"),
    source: "Crown-Indigenous Relations and Northern Affairs Canada",
    metadata: {
      documentType: "framework",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-02-15"),
    },
  },
]

export class VectorSearchService {
  private db: any = null

  private async initializeDb() {
    if (!isDatabaseAvailable()) {
      console.warn("MongoDB not configured, using mock data")
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

  // Generate mock embedding
  private async generateEmbedding(text: string): Promise<number[]> {
    // Mock embedding for demo purposes
    return new Array(1536).fill(0).map(() => Math.random())
  }

  // Insert regulatory document with embedding
  async insertDocument(document: Omit<RegulatoryDocument, "_id" | "embedding">): Promise<ObjectId | string> {
    if (!isDatabaseAvailable()) {
      console.warn("Database not available, document not inserted")
      return "mock-id"
    }

    try {
      await this.initializeDb()
      if (!this.db) throw new Error("Database not available")

      const collection = this.db.collection("regulatory_documents")
      const embedding = await this.generateEmbedding(document.content)

      const result = await collection.insertOne({
        ...document,
        embedding,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return result.insertedId
    } catch (error) {
      console.error("Error inserting document:", error)
      return "error-id"
    }
  }

  // Vector search with filters - falls back to mock data
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
      return this.mockVectorSearch(query, filters)
    }

    try {
      await this.initializeDb()
      if (!this.db) return this.mockVectorSearch(query, filters)

      const collection = this.db.collection("regulatory_documents")
      const queryEmbedding = await this.generateEmbedding(query)

      // For demo purposes, use text search instead of vector search
      const textSearchResults = await collection
        .find({
          $text: { $search: query },
          ...(filters.country && { country: filters.country }),
          ...(filters.sector && { sector: filters.sector }),
          ...(filters.topic && { topic: filters.topic }),
          ...(filters.riskLevel && { riskLevel: filters.riskLevel }),
        })
        .limit(filters.limit || 10)
        .toArray()

      return textSearchResults.map((doc: any, index: number) => ({
        ...doc,
        score: 0.8 - index * 0.1,
        relevance: Math.round((0.8 - index * 0.1) * 100),
      }))
    } catch (error) {
      console.error("Vector search error:", error)
      return this.mockVectorSearch(query, filters)
    }
  }

  private mockVectorSearch(query: string, filters: any): SearchResult[] {
    let results = [...mockDocuments]

    // Apply filters
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

    // Simple text matching for demo
    if (query) {
      results = results.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query.toLowerCase()) ||
          doc.content.toLowerCase().includes(query.toLowerCase()) ||
          doc.topic.toLowerCase().includes(query.toLowerCase()),
      )
    }

    return results.slice(0, filters.limit || 10).map((doc, index) => ({
      ...doc,
      score: 0.9 - index * 0.1,
      relevance: Math.round((0.9 - index * 0.1) * 100),
    }))
  }

  // Get recent regulatory pulses - with fallback
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

    return results.slice(0, 5)
  }

  // Get trending topics - with fallback
  async getTrendingTopics(country?: string, days = 7): Promise<Array<{ topic: string; count: number; trend: number }>> {
    if (!isDatabaseAvailable()) {
      return this.mockGetTrendingTopics(country)
    }

    try {
      await this.initializeDb()
      if (!this.db) return this.mockGetTrendingTopics(country)

      const collection = this.db.collection("regulatory_documents")
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

      const pipeline = [
        {
          $match: {
            publishedDate: { $gte: cutoffDate },
            ...(country && { country }),
          },
        },
        {
          $group: {
            _id: "$topic",
            count: { $sum: 1 },
            avgRisk: {
              $avg: {
                $cond: [{ $eq: ["$riskLevel", "high"] }, 3, { $cond: [{ $eq: ["$riskLevel", "medium"] }, 2, 1] }],
              },
            },
          },
        },
        {
          $project: {
            topic: "$_id",
            count: 1,
            trend: { $multiply: ["$avgRisk", "$count"] },
          },
        },
        {
          $sort: { trend: -1 },
        },
        {
          $limit: 10,
        },
      ]

      const results = await collection.aggregate(pipeline).toArray()
      return results.map((r) => ({
        topic: r.topic,
        count: r.count,
        trend: Math.round(r.trend),
      }))
    } catch (error) {
      console.error("Error getting trending topics:", error)
      return this.mockGetTrendingTopics(country)
    }
  }

  private mockGetTrendingTopics(country?: string): Array<{ topic: string; count: number; trend: number }> {
    const topics = ["Environmental", "Safety", "Taxation", "Indigenous Rights"]
    return topics.map((topic, index) => ({
      topic,
      count: 10 - index * 2,
      trend: 15 - index * 3,
    }))
  }
}

export const vectorSearch = new VectorSearchService()
