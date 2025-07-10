"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MapPin, TrendingUp, AlertTriangle, CheckCircle, AlertCircle, Filter, BarChart3, Globe } from "lucide-react"
import { enhancedHeatmapData, getRiskStatistics, getCategoryRiskDistribution } from "@/lib/heatmap-data"
import type { HeatmapInsight } from "@/lib/heatmap-data"

interface RegulatoryRiskHeatmapProps {
  selectedCategory?: string
  selectedRiskLevel?: string
}

export function RegulatoryRiskHeatmap({ selectedCategory, selectedRiskLevel }: RegulatoryRiskHeatmapProps) {
  const [filteredData, setFilteredData] = useState<HeatmapInsight[]>(enhancedHeatmapData)
  const [activeFilter, setActiveFilter] = useState<{
    category: string
    riskLevel: string
    location: string
  }>({
    category: "All",
    riskLevel: "All",
    location: "All",
  })

  const riskStats = getRiskStatistics()
  const categoryDistribution = getCategoryRiskDistribution()

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

  const applyFilters = (category: string, riskLevel: string, location: string) => {
    let filtered = enhancedHeatmapData

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category)
    }
    if (riskLevel !== "All") {
      filtered = filtered.filter((item) => item.riskLevel === riskLevel)
    }
    if (location !== "All") {
      filtered = filtered.filter((item) => item.location === location)
    }

    setFilteredData(filtered)
    setActiveFilter({ category, riskLevel, location })
  }

  const locations = [...new Set(enhancedHeatmapData.map((item) => item.location))]

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-slate-600" />
              <CardTitle className="text-2xl text-slate-800">Regulatory Risk Heatmap</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <BarChart3 className="h-4 w-4" />
              <span>{filteredData.length} insights analyzed</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Level Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Low Risk</span>
              </div>
              <div className="text-2xl font-bold text-green-800">{riskStats.low}</div>
              <div className="text-sm text-green-600">{riskStats.lowPercentage}% of total insights</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Medium Risk</span>
              </div>
              <div className="text-2xl font-bold text-yellow-800">{riskStats.medium}</div>
              <div className="text-sm text-yellow-600">{riskStats.mediumPercentage}% of total insights</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-800">High Risk</span>
              </div>
              <div className="text-2xl font-bold text-red-800">{riskStats.high}</div>
              <div className="text-sm text-red-600">{riskStats.highPercentage}% of total insights</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <select
              value={activeFilter.category}
              onChange={(e) => applyFilters(e.target.value, activeFilter.riskLevel, activeFilter.location)}
              className="px-3 py-1 border border-slate-200 rounded text-sm bg-white"
            >
              <option value="All">All Categories</option>
              <option value="Economic">Economic</option>
              <option value="Environmental">Environmental</option>
              <option value="Regulatory">Regulatory</option>
            </select>
            <select
              value={activeFilter.riskLevel}
              onChange={(e) => applyFilters(activeFilter.category, e.target.value, activeFilter.location)}
              className="px-3 py-1 border border-slate-200 rounded text-sm bg-white"
            >
              <option value="All">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            <select
              value={activeFilter.location}
              onChange={(e) => applyFilters(activeFilter.category, activeFilter.riskLevel, e.target.value)}
              className="px-3 py-1 border border-slate-200 rounded text-sm bg-white"
            >
              <option value="All">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            {(activeFilter.category !== "All" ||
              activeFilter.riskLevel !== "All" ||
              activeFilter.location !== "All") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  applyFilters("All", "All", "All")
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((insight, index) => (
          <motion.div
            key={`${insight.title}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="p-6">
                {/* Header with Risk Level */}
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

                {/* Category and Location */}
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${getCategoryColor(insight.category)} font-medium text-xs`}>
                    {insight.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3 w-3" />
                    {insight.location}
                  </div>
                </div>

                {/* Impact */}
                <div className="mb-4 p-3 bg-slate-50 rounded-lg border-l-4 border-l-orange-400">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-sm font-medium text-slate-700">Impact Analysis</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{insight.impact}</p>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{insight.politician}</span>
                    <span>{new Date(insight.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-12 text-center">
            <Filter className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No insights match your filters</h3>
            <p className="text-slate-500 mb-4">Try adjusting your filter criteria</p>
            <Button variant="outline" onClick={() => applyFilters("All", "All", "All")}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
