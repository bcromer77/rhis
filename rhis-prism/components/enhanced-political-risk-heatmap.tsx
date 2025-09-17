"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { AlertTriangle, Users, Globe, Filter, MapPin, Calendar, BarChart3, Activity, Zap } from "lucide-react"
import { politicalActivistRisks, getPoliticalActivistRiskStats } from "@/lib/political-activist-data"

interface RiskZone {
  id: string
  state: string
  type: string
  category: string
  level: "red" | "orange" | "yellow" | "green"
  title: string
  coordinates: {
    lat: number
    lng: number
  }
  description: string
  actions: string[]
  last_updated: string
}

const riskZones: RiskZone[] = [
  {
    id: "andhra-pradesh-land-acquisition",
    state: "Andhra Pradesh",
    type: "Land Rights",
    category: "Political Risk",
    level: "red",
    title: "Pawan Kalyan Opposition to Land Acquisition",
    coordinates: {
      lat: 15.9129,
      lng: 79.74,
    },
    description:
      "Jana Sena Party leader Pawan Kalyan has mobilized significant opposition to land acquisition projects, particularly affecting mining and industrial operations in coastal Andhra Pradesh.",
    actions: [
      "Enhanced community engagement protocols",
      "Transparent land acquisition processes",
      "Fair compensation frameworks",
      "Environmental impact mitigation",
    ],
    last_updated: "2025-03-20",
  },
  {
    id: "jharkhand-tribal-rights",
    state: "Jharkhand",
    type: "Tribal Rights",
    category: "Social Risk",
    level: "red",
    title: "Intensified Tribal Rights Activism",
    coordinates: {
      lat: 23.6102,
      lng: 85.2799,
    },
    description:
      "Organized tribal rights activism led by Dayamani Barla and Jharkhand Janadhikar Mahasabha opposing mining operations with legal challenges to permits.",
    actions: [
      "Tribal consultation protocols",
      "Revenue sharing agreements",
      "Cultural preservation programs",
      "Legal compliance review",
    ],
    last_updated: "2025-03-12",
  },
  {
    id: "odisha-environmental-coalition",
    state: "Odisha",
    type: "Environmental",
    category: "ESG Risk",
    level: "orange",
    title: "Environmental Activist Coalition",
    coordinates: {
      lat: 20.9517,
      lng: 85.0985,
    },
    description:
      "Coalition led by Prafulla Samantara organizing against steel plant expansions, citing air pollution and water contamination concerns in coastal Odisha.",
    actions: [
      "Enhanced environmental monitoring",
      "Community health programs",
      "Green technology adoption",
      "Stakeholder engagement",
    ],
    last_updated: "2025-03-10",
  },
  {
    id: "gujarat-farmer-protests",
    state: "Gujarat",
    type: "Land Rights",
    category: "Social Risk",
    level: "orange",
    title: "Farmer Protests Against Land Acquisition",
    coordinates: {
      lat: 23.0225,
      lng: 72.5714,
    },
    description:
      "Organized farmer protests demanding higher compensation and alternative livelihood arrangements for steel plant expansion projects.",
    actions: [
      "Fair compensation packages",
      "Alternative livelihood programs",
      "Agricultural development support",
      "Community dialogue enhancement",
    ],
    last_updated: "2025-03-05",
  },
  {
    id: "sivepolicia-sinaloa-redzone",
    state: "Sinaloa",
    type: "Surveillance",
    category: "ESG Risk",
    level: "red",
    title: "SIVEPOLICÍA Expansion Without Consultation",
    coordinates: {
      lat: 25.8333,
      lng: -108.9833,
    },
    description:
      "State-level surveillance infrastructure (SIVEPOLICÍA) is expanding across Sinaloa without documented FPIC (Free, Prior and Informed Consent) from Indigenous communities. This poses a reputational and legal risk for extractive industries operating near Indigenous zones.",
    actions: [
      "Audit geospatial overlap with Indigenous territories",
      "Demand FPIC before surveillance deployment",
      "Clarify corporate non-involvement in state surveillance activities",
    ],
    last_updated: "2025-07-11",
  },
]

export function EnhancedPoliticalRiskHeatmap() {
  const [selectedRiskTypes, setSelectedRiskTypes] = useState<string[]>(["All"])
  const [riskThreshold, setRiskThreshold] = useState([1])
  const [showActivistLayer, setShowActivistLayer] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [showPredictions, setShowPredictions] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)

  const riskStats = getPoliticalActivistRiskStats()

  const riskTypes = ["All", "Political", "Social", "Environmental", "Economic", "Surveillance", "Indigenous Rights"]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "red":
        return "bg-red-500"
      case "orange":
        return "bg-orange-500"
      case "yellow":
        return "bg-yellow-500"
      case "green":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "red":
        return "bg-red-100 text-red-800 border-red-200"
      case "orange":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "yellow":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "green":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredRiskZones = riskZones.filter((zone) => {
    if (selectedRiskTypes.includes("All")) return true
    return selectedRiskTypes.some((type) => zone.type === type || zone.category.includes(type))
  })

  const filteredActivistRisks = politicalActivistRisks.filter((risk) => {
    const riskLevels = ["low", "medium", "high", "critical"]
    const riskIndex = riskLevels.indexOf(risk.riskLevel)
    return riskIndex >= riskThreshold[0]
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Enhanced Political Risk Heatmap</h2>
          <p className="text-slate-600">
            Real-time monitoring of political and activist risks with predictive analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Live Data
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {filteredRiskZones.length + filteredActivistRisks.length} Active Risks
          </Badge>
        </div>
      </div>

      {/* Control Panel */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            Risk Analysis Controls
          </CardTitle>
          <CardDescription>Configure heatmap display and analysis parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Risk Types</label>
              <Select value={selectedRiskTypes[0]} onValueChange={(value) => setSelectedRiskTypes([value])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {riskTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Timeframe</label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Region</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="mexico">Mexico</SelectItem>
                  <SelectItem value="brazil">Brazil</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Risk Threshold: {["Low", "Medium", "High", "Critical"][riskThreshold[0]]}+
              </label>
              <Slider
                value={riskThreshold}
                onValueChange={setRiskThreshold}
                max={3}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Switch checked={showActivistLayer} onCheckedChange={setShowActivistLayer} />
                <label className="text-sm font-medium">Show Activist Layer</label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch checked={showPredictions} onCheckedChange={setShowPredictions} />
                <label className="text-sm font-medium">Predictive Analytics</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Heatmap */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Interactive Risk Heatmap
              </CardTitle>
              <CardDescription>Click on risk zones for detailed analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100">
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" className="text-slate-400">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                </div>

                {/* Risk Zone Markers */}
                {filteredRiskZones.map((zone, index) => (
                  <div
                    key={zone.id}
                    className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-3 -translate-y-3 ${getLevelColor(zone.level)} hover:scale-125 transition-all shadow-lg border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    style={{
                      left: `${15 + index * 15}%`,
                      top: `${25 + index * 12}%`,
                    }}
                    onClick={() => setSelectedRisk(selectedRisk === zone.id ? null : zone.id)}
                  >
                    <AlertTriangle className="h-3 w-3" />
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {zone.title}
                      <br />
                      <span className="text-slate-300">{zone.state}</span>
                    </div>
                  </div>
                ))}

                {/* Activist Risk Overlay */}
                {showActivistLayer &&
                  filteredActivistRisks.slice(0, 5).map((risk, index) => (
                    <div
                      key={risk.id}
                      className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 border border-white shadow-md ${
                        risk.riskLevel === "critical"
                          ? "bg-red-600"
                          : risk.riskLevel === "high"
                            ? "bg-orange-500"
                            : risk.riskLevel === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                      style={{
                        left: `${25 + index * 12}%`,
                        top: `${35 + index * 10}%`,
                      }}
                      title={risk.title}
                    >
                      <Users className="h-2 w-2 text-white m-1" />
                    </div>
                  ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg border border-slate-200 shadow-lg">
                  <h4 className="text-slate-800 text-sm font-semibold mb-2">Risk Levels</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-slate-700 text-xs">Critical Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-700 text-xs">High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-slate-700 text-xs">Medium Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700 text-xs">Low Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Risk Details */}
          {selectedRisk && (
            <Card className="mt-4 bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Risk Zone Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const zone = riskZones.find((z) => z.id === selectedRisk)
                  if (!zone) return null
                  return (
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">{zone.title}</h3>
                          <p className="text-slate-600">
                            {zone.state} • {zone.type}
                          </p>
                        </div>
                        <Badge className={getLevelBadgeColor(zone.level)}>{zone.level.toUpperCase()}</Badge>
                      </div>
                      <p className="text-slate-700">{zone.description}</p>
                      <div>
                        <h4 className="font-semibold text-slate-800 mb-2">Recommended Actions:</h4>
                        <ul className="space-y-1">
                          {zone.actions.map((action, index) => (
                            <li key={index} className="text-slate-600 text-sm flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Calendar className="h-4 w-4" />
                        Last updated: {zone.last_updated}
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Risk Statistics */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Risk Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Critical Risks</span>
                <Badge variant="destructive">{riskStats.critical}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">High Risks</span>
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">{riskStats.high}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Medium Risks</span>
                <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">{riskStats.medium}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Low Risks</span>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">{riskStats.low}</Badge>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Average Risk Score</span>
                  <span className="font-semibold text-slate-800">{riskStats.averageRiskScore}/100</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Risk Events */}
          <Card className="bg-white border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Recent Risk Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {filteredRiskZones.slice(0, 3).map((zone) => (
                <div key={zone.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-slate-800 text-sm font-semibold">{zone.type}</span>
                    <Badge className={getLevelBadgeColor(zone.level)} size="sm">
                      {zone.level}
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-xs mb-2">{zone.title}</p>
                  <p className="text-slate-500 text-xs">
                    {zone.state} • {zone.last_updated}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Predictive Analytics */}
          {showPredictions && (
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Risk Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="text-red-800 font-semibold text-sm mb-1">Next 30 Days</h4>
                  <p className="text-red-700 text-xs mb-2">Escalation predicted in Andhra Pradesh land disputes</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-red-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-red-600 text-xs">85%</span>
                  </div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="text-orange-800 font-semibold text-sm mb-1">Next 60 Days</h4>
                  <p className="text-orange-700 text-xs mb-2">Environmental protests likely in Odisha coastal areas</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-orange-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-orange-500" style={{ width: "72%" }}></div>
                    </div>
                    <span className="text-orange-600 text-xs">72%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
