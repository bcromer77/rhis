"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Calendar,
  User,
  FileText,
  ExternalLink,
  X,
  Globe,
  BarChart3,
} from "lucide-react"
import { enhancedHeatmapData, getRiskStatistics, getCategoryRiskDistribution } from "@/lib/heatmap-data"
import type { HeatmapInsight } from "@/lib/heatmap-data"

interface UnifiedRegulatoryDashboardProps {
  initialView?: "list" | "heatmap" | "split"
}

export function UnifiedRegulatoryDashboard({ initialView = "split" }: UnifiedRegulatoryDashboardProps) {
  const [view, setView] = useState<"list" | "heatmap" | "split">(initialView)
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedInsight, setSelectedInsight] = useState<HeatmapInsight | null>(null)

  // Filter states
  const [filters, setFilters] = useState({
    category: "All",
    riskLevel: "All",
    sentiment: "All",
    location: "All",
    dateRange: "All",
  })

  const riskStats = getRiskStatistics()
  const categoryDistribution = getCategoryRiskDistribution()

  // Get unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(enhancedHeatmapData.map((item) => item.category))]
    const riskLevels = [...new Set(enhancedHeatmapData.map((item) => item.riskLevel))]
    const sentiments = [...new Set(enhancedHeatmapData.map((item) => item.sentiment))]
    const locations = [...new Set(enhancedHeatmapData.map((item) => item.location))]

    return { categories, riskLevels, sentiments, locations }
  }, [])

  // Filter and search logic
  const filteredData = useMemo(() => {
    let filtered = enhancedHeatmapData

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.politician.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.impact.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply filters
    if (filters.category !== "All") {
      filtered = filtered.filter((item) => item.category === filters.category)
    }
    if (filters.riskLevel !== "All") {
      filtered = filtered.filter((item) => item.riskLevel === filters.riskLevel)
    }
    if (filters.sentiment !== "All") {
      filtered = filtered.filter((item) => item.sentiment === filters.sentiment)
    }
    if (filters.location !== "All") {
      filtered = filtered.filter((item) => item.location === filters.location)
    }

    return filtered
  }, [searchQuery, filters])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearAllFilters = () => {
    setFilters({
      category: "All",
      riskLevel: "All",
      sentiment: "All",
      location: "All",
      dateRange: "All",
    })
    setSearchQuery("")
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Economic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Environmental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Regulatory":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Supportive":
        return "bg-green-100 text-green-700"
      case "Neutral":
        return "bg-yellow-100 text-yellow-700"
      case "Negative":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Supportive":
        return "👍"
      case "Neutral":
        return "➖"
      case "Negative":
        return "👎"
      default:
        return "❓"
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -320, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-80 bg-white border-r border-slate-200 flex flex-col"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters & Search
                </h2>
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search insights, politicians, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Clear Filters */}
              {(Object.values(filters).some((f) => f !== "All") || searchQuery) && (
                <Button variant="outline" size="sm" onClick={clearAllFilters} className="w-full bg-transparent">
                  Clear All Filters
                </Button>
              )}
            </div>

            {/* Filter Options */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                >
                  <option value="All">All Categories</option>
                  {filterOptions.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Risk Level Filter */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Risk Level</label>
                <select
                  value={filters.riskLevel}
                  onChange={(e) => updateFilter("riskLevel", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                >
                  <option value="All">All Risk Levels</option>
                  {filterOptions.riskLevels.map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)} Risk
                    </option>
                  ))}
                </select>
              </div>

              {/* Sentiment Filter */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Sentiment</label>
                <select
                  value={filters.sentiment}
                  onChange={(e) => updateFilter("sentiment", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                >
                  <option value="All">All Sentiments</option>
                  {filterOptions.sentiments.map((sentiment) => (
                    <option key={sentiment} value={sentiment}>
                      {sentiment}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="text-sm font-medium text-slate-700 mb-2 block">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm bg-white"
                >
                  <option value="All">All Locations</option>
                  {filterOptions.locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Statistics */}
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-slate-700 mb-3">Risk Distribution</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Low Risk</span>
                    </div>
                    <span className="font-medium">{riskStats.low}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>Medium Risk</span>
                    </div>
                    <span className="font-medium">{riskStats.medium}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>High Risk</span>
                    </div>
                    <span className="font-medium">{riskStats.high}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                  <Filter className="h-4 w-4" />
                </Button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <Globe className="h-6 w-6" />
                  Regulatory Intelligence Dashboard
                </h1>
                <p className="text-slate-600">
                  {filteredData.length} of {enhancedHeatmapData.length} insights displayed
                </p>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2">
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("list")}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                List View
              </Button>
              <Button
                variant={view === "heatmap" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("heatmap")}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Heatmap View
              </Button>
              <Button
                variant={view === "split" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("split")}
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Split View
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {view === "list" && <ListView data={filteredData} onSelectInsight={setSelectedInsight} />}
          {view === "heatmap" && <HeatmapView data={filteredData} onSelectInsight={setSelectedInsight} />}
          {view === "split" && (
            <div className="flex h-full">
              <div className="w-1/2 border-r border-slate-200">
                <HeatmapView data={filteredData} onSelectInsight={setSelectedInsight} />
              </div>
              <div className="w-1/2">
                <ListView data={filteredData} onSelectInsight={setSelectedInsight} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedInsight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <InsightDetailModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// List View Component
function ListView({
  data,
  onSelectInsight,
}: {
  data: HeatmapInsight[]
  onSelectInsight: (insight: HeatmapInsight) => void
}) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "medium":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Economic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Environmental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Regulatory":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      {data.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No insights found</h3>
            <p className="text-slate-500">Try adjusting your search terms or filters</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((insight, index) => (
            <motion.div
              key={`${insight.title}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ y: -2, scale: 1.01 }}
            >
              <Card
                className="bg-white border-slate-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                onClick={() => onSelectInsight(insight)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getRiskIcon(insight.riskLevel)}
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(insight.riskLevel)}`}></div>
                        <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                          {insight.riskLevel} Risk
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2 leading-tight">{insight.title}</h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getCategoryColor(insight.category)} font-medium text-xs`}>
                      {insight.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      {insight.location}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Calendar className="h-3 w-3" />
                      {new Date(insight.date).toLocaleDateString()}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-3 line-clamp-2">{insight.impact}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {insight.politician}
                    </div>
                    <span className="text-blue-600 hover:text-blue-800">View Details →</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Heatmap View Component
function HeatmapView({
  data,
  onSelectInsight,
}: {
  data: HeatmapInsight[]
  onSelectInsight: (insight: HeatmapInsight) => void
}) {
  const locationGroups = useMemo(() => {
    const groups = data.reduce(
      (acc, insight) => {
        if (!acc[insight.location]) {
          acc[insight.location] = []
        }
        acc[insight.location].push(insight)
        return acc
      },
      {} as Record<string, HeatmapInsight[]>,
    )
    return groups
  }, [data])

  const getLocationRiskLevel = (insights: HeatmapInsight[]) => {
    const riskScores = { low: 1, medium: 2, high: 3 }
    const avgRisk = insights.reduce((sum, insight) => sum + riskScores[insight.riskLevel], 0) / insights.length
    if (avgRisk >= 2.5) return "high"
    if (avgRisk >= 1.5) return "medium"
    return "low"
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500 border-green-600"
      case "medium":
        return "bg-yellow-500 border-yellow-600"
      case "high":
        return "bg-red-500 border-red-600"
      default:
        return "bg-gray-500 border-gray-600"
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      {Object.keys(locationGroups).length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No location data found</h3>
            <p className="text-slate-500">Try adjusting your filters</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Regional Risk Heatmap</h2>
            <p className="text-slate-600">Color-coded regions based on regulatory risk levels</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(locationGroups).map(([location, insights]) => {
              const locationRisk = getLocationRiskLevel(insights)
              return (
                <motion.div
                  key={location}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer"
                >
                  <Card
                    className={`border-2 ${getRiskColor(locationRisk)} hover:shadow-lg transition-all duration-300`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {location}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">{insights.length} insights</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            locationRisk === "high"
                              ? "bg-red-100 text-red-700"
                              : locationRisk === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {locationRisk} risk
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {insights.slice(0, 3).map((insight, idx) => (
                          <div
                            key={idx}
                            className="p-2 bg-slate-50 rounded text-sm hover:bg-slate-100 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectInsight(insight)
                            }}
                          >
                            <div className="font-medium text-slate-800 line-clamp-1">{insight.title}</div>
                            <div className="text-xs text-slate-600">{insight.category}</div>
                          </div>
                        ))}
                        {insights.length > 3 && (
                          <div className="text-xs text-slate-500 text-center py-1">
                            +{insights.length - 3} more insights
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Insight Detail Modal Component
function InsightDetailModal({ insight, onClose }: { insight: HeatmapInsight; onClose: () => void }) {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "medium":
        return <AlertCircle className="h-5 w-5 text-yellow-600" />
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-600" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Economic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Environmental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Regulatory":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Supportive":
        return "bg-green-100 text-green-700"
      case "Neutral":
        return "bg-yellow-100 text-yellow-700"
      case "Negative":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Supportive":
        return "👍"
      case "Neutral":
        return "➖"
      case "Negative":
        return "👎"
      default:
        return "❓"
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {getRiskIcon(insight.riskLevel)}
            <div className={`w-4 h-4 rounded-full ${getRiskColor(insight.riskLevel)}`}></div>
            <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">{insight.riskLevel} Risk</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">{insight.title}</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Badge className={`${getCategoryColor(insight.category)} font-medium`}>{insight.category}</Badge>
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-sm">
          <MapPin className="h-3 w-3" />
          {insight.location}
        </div>
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded text-sm">
          <Calendar className="h-3 w-3" />
          {new Date(insight.date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">{getSentimentIcon(insight.sentiment)}</span>
          <Badge className={`${getSentimentColor(insight.sentiment)} text-xs font-medium`}>{insight.sentiment}</Badge>
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="mb-6 p-4 bg-slate-50 rounded-lg border-l-4 border-l-orange-400">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-5 w-5 text-orange-600" />
          <span className="font-medium text-slate-700">Impact Analysis</span>
        </div>
        <p className="text-slate-600 leading-relaxed">{insight.impact}</p>
      </div>

      {/* Politician & Citation */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-slate-500" />
          <span className="font-medium text-slate-700">{insight.politician}</span>
        </div>
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-slate-500" />
            <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1">
              {insight.citation}
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
