"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { TrendingUp, Filter, Calendar, MapPin, AlertTriangle } from "lucide-react"

interface HeatmapData {
  country?: string
  sector?: string
  topic?: string
  riskLevel?: string
  date?: string
  count: number
  intensity: number
  riskScore?: number
  highRiskCount?: number
  mediumRiskCount?: number
  lowRiskCount?: number
  topics?: string[]
  sectors?: string[]
  countries?: string[]
  latestUpdate: string
}

interface HeatmapProps {
  selectedCountry?: string
  selectedSector?: string
}

export function RegulatoryHeatmap({ selectedCountry, selectedSector }: HeatmapProps) {
  const [data, setData] = useState<HeatmapData[]>([])
  const [loading, setLoading] = useState(true)
  const [dimension, setDimension] = useState<"country-sector" | "topic-risk" | "time-series">("country-sector")
  const [timeframe, setTimeframe] = useState("30")
  const [hoveredCell, setHoveredCell] = useState<HeatmapData | null>(null)

  useEffect(() => {
    fetchHeatmapData()
  }, [dimension, timeframe])

  const fetchHeatmapData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/heatmap?dimension=${dimension}&timeframe=${timeframe}`)
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      console.error("Error fetching heatmap data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getIntensityColor = (intensity: number, maxIntensity: number) => {
    const normalizedIntensity = intensity / maxIntensity
    if (normalizedIntensity > 0.8) return "bg-red-600"
    if (normalizedIntensity > 0.6) return "bg-red-500"
    if (normalizedIntensity > 0.4) return "bg-orange-500"
    if (normalizedIntensity > 0.2) return "bg-yellow-500"
    if (normalizedIntensity > 0) return "bg-green-400"
    return "bg-slate-200"
  }

  const maxIntensity = Math.max(...data.map((d) => d.intensity), 1)

  const renderCountrySectorHeatmap = () => {
    const countries = [...new Set(data.map((d) => d.country))]
    const sectors = [...new Set(data.map((d) => d.sector))]

    return (
      <div className="space-y-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: `120px repeat(${sectors.length}, 1fr)` }}>
          {/* Header */}
          <div></div>
          {sectors.map((sector) => (
            <div key={sector} className="text-center text-sm font-medium text-slate-700 p-2">
              {sector}
            </div>
          ))}

          {/* Rows */}
          {countries.map((country) => (
            <div key={country} className="contents">
              <div className="flex items-center text-sm font-medium text-slate-700 p-2 bg-slate-50 rounded">
                {country === "india" && "🇮🇳"}
                {country === "mexico" && "🇲🇽"}
                {country === "canada" && "🇨🇦"}
                <span className="ml-2 capitalize">{country}</span>
              </div>
              {sectors.map((sector) => {
                const cellData = data.find((d) => d.country === country && d.sector === sector)
                const intensity = cellData?.intensity || 0
                return (
                  <motion.div
                    key={`${country}-${sector}`}
                    className={`h-16 rounded cursor-pointer border border-slate-300 flex items-center justify-center relative ${getIntensityColor(intensity, maxIntensity)}`}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    onHoverStart={() => setHoveredCell(cellData || null)}
                    onHoverEnd={() => setHoveredCell(null)}
                  >
                    {cellData && (
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">{cellData.count}</div>
                        {cellData.highRiskCount > 0 && (
                          <div className="text-white text-xs">⚠️ {cellData.highRiskCount}</div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTopicRiskHeatmap = () => {
    const topics = [...new Set(data.map((d) => d.topic))]
    const riskLevels = ["high", "medium", "low"]

    return (
      <div className="space-y-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: `150px repeat(${riskLevels.length}, 1fr)` }}>
          {/* Header */}
          <div></div>
          {riskLevels.map((risk) => (
            <div key={risk} className="text-center text-sm font-medium text-slate-700 p-2 capitalize">
              {risk} Risk
            </div>
          ))}

          {/* Rows */}
          {topics.map((topic) => (
            <div key={topic} className="contents">
              <div className="flex items-center text-sm font-medium text-slate-700 p-2 bg-slate-50 rounded">
                {topic}
              </div>
              {riskLevels.map((risk) => {
                const cellData = data.find((d) => d.topic === topic && d.riskLevel === risk)
                const intensity = cellData?.intensity || 0
                return (
                  <motion.div
                    key={`${topic}-${risk}`}
                    className={`h-16 rounded cursor-pointer border border-slate-300 flex items-center justify-center ${getIntensityColor(intensity, maxIntensity)}`}
                    whileHover={{ scale: 1.05, zIndex: 10 }}
                    onHoverStart={() => setHoveredCell(cellData || null)}
                    onHoverEnd={() => setHoveredCell(null)}
                  >
                    {cellData && (
                      <div className="text-center">
                        <div className="text-white font-bold text-lg">{cellData.count}</div>
                        <div className="text-white text-xs">{cellData.countries?.length} countries</div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTimeSeriesHeatmap = () => {
    const dates = [...new Set(data.map((d) => d.date))].sort()
    const countries = [...new Set(data.map((d) => d.country))]

    return (
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `100px repeat(${dates.length}, 40px)`,
              minWidth: `${100 + dates.length * 40}px`,
            }}
          >
            {/* Header */}
            <div></div>
            {dates.map((date) => (
              <div
                key={date}
                className="text-center text-xs text-slate-600 p-1 transform -rotate-45 origin-bottom-left"
              >
                {date?.split("-").slice(1).join("/")}
              </div>
            ))}

            {/* Rows */}
            {countries.map((country) => (
              <div key={country} className="contents">
                <div className="flex items-center text-sm font-medium text-slate-700 p-2 bg-slate-50 rounded">
                  {country === "india" && "🇮🇳"}
                  {country === "mexico" && "🇲🇽"}
                  {country === "canada" && "🇨🇦"}
                </div>
                {dates.map((date) => {
                  const cellData = data.find((d) => d.country === country && d.date === date)
                  const intensity = cellData?.intensity || 0
                  return (
                    <motion.div
                      key={`${country}-${date}`}
                      className={`h-8 rounded cursor-pointer border border-slate-300 ${getIntensityColor(intensity, maxIntensity)}`}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      onHoverStart={() => setHoveredCell(cellData || null)}
                      onHoverEnd={() => setHoveredCell(null)}
                    >
                      {cellData && cellData.count > 0 && (
                        <div className="text-white text-xs text-center leading-8">{cellData.count}</div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white border-slate-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-slate-600" />
              <CardTitle className="text-xl text-slate-800">Regulatory Activity Heatmap</CardTitle>
            </div>
            <div className="flex gap-2">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-3 py-1 border border-slate-200 rounded text-sm"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <select
                value={dimension}
                onChange={(e) => setDimension(e.target.value as any)}
                className="px-3 py-1 border border-slate-200 rounded text-sm"
              >
                <option value="country-sector">Country × Sector</option>
                <option value="topic-risk">Topic × Risk</option>
                <option value="time-series">Time Series</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-slate-500">Loading heatmap data...</div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Legend */}
              <div className="flex items-center gap-4 text-sm">
                <span className="text-slate-600">Intensity:</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Low</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span>High</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-red-600 rounded"></div>
                  <span>Critical</span>
                </div>
              </div>

              {/* Heatmap */}
              <div className="relative">
                {dimension === "country-sector" && renderCountrySectorHeatmap()}
                {dimension === "topic-risk" && renderTopicRiskHeatmap()}
                {dimension === "time-series" && renderTimeSeriesHeatmap()}

                {/* Tooltip */}
                {hoveredCell && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-slate-800 text-white p-4 rounded-lg shadow-lg z-20 min-w-64"
                  >
                    <div className="space-y-2">
                      {hoveredCell.country && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span className="capitalize">{hoveredCell.country}</span>
                          {hoveredCell.sector && <span>• {hoveredCell.sector}</span>}
                        </div>
                      )}
                      {hoveredCell.topic && (
                        <div className="flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          <span>{hoveredCell.topic}</span>
                          {hoveredCell.riskLevel && <span className="capitalize">• {hoveredCell.riskLevel} risk</span>}
                        </div>
                      )}
                      {hoveredCell.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{hoveredCell.date}</span>
                        </div>
                      )}
                      <div className="border-t border-slate-600 pt-2">
                        <div className="text-lg font-bold">{hoveredCell.count} regulations</div>
                        {hoveredCell.highRiskCount > 0 && (
                          <div className="flex items-center gap-1 text-red-400">
                            <AlertTriangle className="h-3 w-3" />
                            <span>{hoveredCell.highRiskCount} high risk</span>
                          </div>
                        )}
                        <div className="text-xs text-slate-400 mt-1">
                          Intensity: {Math.round(hoveredCell.intensity)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
