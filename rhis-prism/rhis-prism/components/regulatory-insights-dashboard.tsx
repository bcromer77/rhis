"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RegulatoryCard } from "./regulatory-card"
import { Search, FileText, TrendingUp } from "lucide-react"

interface RegulatoryInsight {
  title: string
  category: "Economic" | "Environmental" | "Regulatory"
  description: string
  impact: string
  date: string
  politician: string
  sentiment: "Supportive" | "Neutral" | "Negative"
  citation: string
}

// Sample data based on your JSON structure
const sampleInsights: RegulatoryInsight[] = [
  {
    title: "Economic Impact of Budget 2025-26",
    category: "Economic",
    description: "Discussion on the potential tax reforms and subsidies affecting the steel and mining sectors.",
    impact: "Changes in tax policies may affect profitability and operational costs for mining companies.",
    date: "2025-02-01",
    politician: "Vishaldada Prakashbapu Patil",
    sentiment: "Supportive",
    citation: "Transcript from the Union Budget 2025-26 (Session Date: 2025-02-01)",
  },
  {
    title: "Environmental Compliance and New Regulations",
    category: "Environmental",
    description: "Overview of new environmental laws and their impact on mining operations.",
    impact: "New regulations could increase operational costs due to stricter emissions standards.",
    date: "2025-03-15",
    politician: "Dr. Sangeeta Balwant",
    sentiment: "Neutral",
    citation: "Transcript from the Union Budget 2025-26 (Session Date: 2025-03-15)",
  },
  {
    title: "Mining License Renewal Framework",
    category: "Regulatory",
    description: "New framework for streamlining mining license renewals and compliance procedures.",
    impact: "Simplified renewal process may reduce administrative burden and operational delays.",
    date: "2025-01-20",
    politician: "Shri Ramesh Kumar",
    sentiment: "Supportive",
    citation: "Parliamentary Standing Committee Report (Session Date: 2025-01-20)",
  },
  {
    title: "Carbon Emission Standards for Mining",
    category: "Environmental",
    description: "Introduction of stricter carbon emission standards for mining operations nationwide.",
    impact: "Mining companies will need to invest in cleaner technologies, increasing capital expenditure.",
    date: "2025-02-28",
    politician: "Dr. Priya Sharma",
    sentiment: "Negative",
    citation: "Environment Committee Proceedings (Session Date: 2025-02-28)",
  },
]

export function RegulatoryInsightsDashboard() {
  const [insights, setInsights] = useState<RegulatoryInsight[]>(sampleInsights)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedSentiment, setSelectedSentiment] = useState<string>("All")

  const categories = ["All", "Economic", "Environmental", "Regulatory"]
  const sentiments = ["All", "Supportive", "Neutral", "Negative"]

  const filteredInsights = insights.filter((insight) => {
    const matchesSearch =
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.politician.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "All" || insight.category === selectedCategory
    const matchesSentiment = selectedSentiment === "All" || insight.sentiment === selectedSentiment

    return matchesSearch && matchesCategory && matchesSentiment
  })

  const getCategoryStats = () => {
    const stats = {
      Economic: insights.filter((i) => i.category === "Economic").length,
      Environmental: insights.filter((i) => i.category === "Environmental").length,
      Regulatory: insights.filter((i) => i.category === "Regulatory").length,
    }
    return stats
  }

  const stats = getCategoryStats()

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-slate-600" />
              <CardTitle className="text-2xl text-slate-800">Regulatory Scanning Insights</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <TrendingUp className="h-4 w-4" />
              <span>{filteredInsights.length} insights found</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-800">{stats.Economic}</div>
              <div className="text-sm text-blue-600">Economic Insights</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-800">{stats.Environmental}</div>
              <div className="text-sm text-green-600">Environmental Insights</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl font-bold text-purple-800">{stats.Regulatory}</div>
              <div className="text-sm text-purple-600">Regulatory Insights</div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search insights, politicians, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category} Category
                  </option>
                ))}
              </select>
              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
              >
                {sentiments.map((sentiment) => (
                  <option key={sentiment} value={sentiment}>
                    {sentiment} Sentiment
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Grid */}
      {filteredInsights.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((insight, index) => (
            <RegulatoryCard key={index} insight={insight} index={index} />
          ))}
        </div>
      ) : (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No insights found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
