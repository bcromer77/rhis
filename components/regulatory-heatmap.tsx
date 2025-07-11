"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { TrendingUp, AlertTriangle, Globe, Filter, Calendar } from "lucide-react"

interface RegulatoryData {
  country: string
  sector: string
  riskLevel: "low" | "medium" | "high" | "critical"
  regulationCount: number
  recentChanges: number
  trend: "increasing" | "stable" | "decreasing"
  lastUpdate: string
  keyRegulations: string[]
}

const mockRegulatoryData: RegulatoryData[] = [
  {
    country: "India",
    sector: "Coal",
    riskLevel: "high",
    regulationCount: 247,
    recentChanges: 12,
    trend: "increasing",
    lastUpdate: "2025-01-15",
    keyRegulations: ["Environmental Impact Assessment", "Land Acquisition Act", "Forest Rights Act"],
  },
  {
    country: "India",
    sector: "Iron Ore",
    riskLevel: "medium",
    regulationCount: 189,
    recentChanges: 8,
    trend: "stable",
    lastUpdate: "2025-01-10",
    keyRegulations: ["Mining Lease Rules", "Environmental Clearance", "Tribal Rights"],
  },
  {
    country: "Canada",
    sector: "Gold",
    riskLevel: "medium",
    regulationCount: 156,
    recentChanges: 5,
    trend: "stable",
    lastUpdate: "2025-01-12",
    keyRegulations: ["Indigenous Consultation", "Environmental Assessment", "Mining Tax"],
  },
  {
    country: "Canada",
    sector: "Uranium",
    riskLevel: "high",
    regulationCount: 98,
    recentChanges: 7,
    trend: "increasing",
    lastUpdate: "2025-01-08",
    keyRegulations: ["Nuclear Safety", "Indigenous Rights", "Environmental Protection"],
  },
  {
    country: "Mexico",
    sector: "Silver",
    riskLevel: "low",
    regulationCount: 134,
    recentChanges: 3,
    trend: "decreasing",
    lastUpdate: "2025-01-05",
    keyRegulations: ["Mining Concessions", "Environmental Standards", "Labor Laws"],
  },
  {
    country: "Brazil",
    sector: "Iron Ore",
    riskLevel: "critical",
    regulationCount: 203,
    recentChanges: 15,
    trend: "increasing",
    lastUpdate: "2025-01-18",
    keyRegulations: ["Amazon Protection", "Indigenous Territories", "Environmental Licensing"],
  },
]

interface RegulatoryHeatmapProps {
  selectedCountry?: string
  selectedSector?: string
}

export function RegulatoryHeatmap({ selectedCountry, selectedSector }: RegulatoryHeatmapProps) {
  const [filteredData, setFilteredData] = useState<RegulatoryData[]>(mockRegulatoryData)
  const [filters, setFilters] = useState({
    country: selectedCountry || "All",
    sector: selectedSector || "All",
    riskLevel: "All",
  })

  useEffect(() => {
    let filtered = mockRegulatoryData

    if (filters.country !== "All") {
      filtered = filtered.filter((item) => item.country.toLowerCase() === filters.country.toLowerCase())
    }
    if (filters.sector !== "All") {
      filtered = filtered.filter((item) => item.sector.toLowerCase() === filters.sector.toLowerCase())
    }
    if (filters.riskLevel !== "All") {
      filtered = filtered.filter((item) => item.riskLevel === filters.riskLevel)
    }

    setFilteredData(filtered)
  }, [filters])

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      case "critical":
        return "bg-red-700"
      default:
        return "bg-gray-500"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return "↗️"
      case "decreasing":
        return "↘️"
      default:
        return "➡️"
    }
  }

  const getCountryFlag = (country: string) => {
    switch (country) {
      case "India":
        return "🇮🇳"
      case "Canada":
        return "🇨🇦"
      case "Mexico":
        return "🇲🇽"
      case "Brazil":
        return "🇧🇷"
      default:
        return "🌍"
    }
  }

  const countries = [...new Set(mockRegulatoryData.map((item) => item.country))]
  const sectors = [...new Set(mockRegulatoryData.map((item) => item.sector))]

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-slate-600" />
              <CardTitle className="text-2xl text-slate-800">Regulatory Risk Heatmap</CardTitle>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Globe className="h-4 w-4" />
              <span>{filteredData.length} regulatory zones</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            <select
              value={filters.country}
              onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
              className="px-3 py-1 border border-slate-200 rounded text-sm bg-white"
            >
              <option value="All">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {getCountryFlag(country)} {country}
                </option>
              ))}
            </select>
            <select
              value={filters.sector}
              onChange={(e) => setFilters((prev) => ({ ...prev, sector: e.target.value }))}
              className="px-3 py-1 border border-slate-200 rounded text-sm bg-white"
            >
              <option value="All">All Sectors</option>
              {sectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
            <select
              value={filters.riskLevel}
              onChange={(e) => setFilters((prev) => ({ ...prev, riskLevel: e.target.value }))}
              className="px-3 py-1 border border-slate-200 rounded text-sm bg-white"
            >
              <option value="All">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
              <option value="critical">Critical Risk</option>
            </select>
            {(filters.country !== "All" || filters.sector !== "All" || filters.riskLevel !== "All") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters({ country: "All", sector: "All", riskLevel: "All" })}
              >
                Clear Filters
              </Button>
            )}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-slate-800">
                {filteredData.reduce((sum, item) => sum + item.regulationCount, 0)}
              </div>
              <div className="text-sm text-slate-600">Total Regulations</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-800">
                {filteredData.filter((item) => item.riskLevel === "high" || item.riskLevel === "critical").length}
              </div>
              <div className="text-sm text-red-600">High Risk Zones</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-800">
                {filteredData.reduce((sum, item) => sum + item.recentChanges, 0)}
              </div>
              <div className="text-sm text-blue-600">Recent Changes</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-800">
                {filteredData.filter((item) => item.trend === "increasing").length}
              </div>
              <div className="text-sm text-green-600">Increasing Trends</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <motion.div
            key={`${item.country}-${item.sector}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCountryFlag(item.country)}</span>
                    <div>
                      <h3 className="font-semibold text-slate-800">{item.country}</h3>
                      <p className="text-sm text-slate-600">{item.sector} Mining</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`w-4 h-4 rounded-full ${getRiskColor(item.riskLevel)} mb-1`}></div>
                    <span className="text-xs font-medium text-slate-600 uppercase">{item.riskLevel}</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Regulations:</span>
                    <span className="font-semibold text-slate-800">{item.regulationCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Recent Changes:</span>
                    <Badge
                      variant={
                        item.recentChanges > 10 ? "destructive" : item.recentChanges > 5 ? "default" : "secondary"
                      }
                    >
                      {item.recentChanges}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Trend:</span>
                    <div className="flex items-center gap-1">
                      <span>{getTrendIcon(item.trend)}</span>
                      <span className="text-sm font-medium text-slate-700 capitalize">{item.trend}</span>
                    </div>
                  </div>
                </div>

                {/* Key Regulations */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Key Regulations:</h4>
                  <div className="space-y-1">
                    {item.keyRegulations.slice(0, 3).map((reg, idx) => (
                      <div key={idx} className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded">
                        {reg}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-200">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Updated {new Date(item.lastUpdate).toLocaleDateString()}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                    View Details
                  </Button>
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
            <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 mb-2">No data matches your filters</h3>
            <p className="text-slate-500 mb-4">Try adjusting your filter criteria</p>
            <Button variant="outline" onClick={() => setFilters({ country: "All", sector: "All", riskLevel: "All" })}>
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
