"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Map, Calendar, Filter, AlertTriangle, Factory, TrendingUp } from "lucide-react"

interface RiskFacility {
  id: string
  name: string
  type: string
  coordinates: [number, number]
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  riskScore: number
  lastIncident: string
  operationalStatus: "Active" | "Inactive" | "Maintenance"
  country: string
  state: string
  relatedRHISEntry?: string
}

interface RiskEvent {
  id: string
  facilityId: string
  timestamp: string
  eventType: string
  severity: "Low" | "Medium" | "High" | "Critical"
  description: string
  politicalContext?: string
}

export function GeoTemporalRiskMap() {
  const [selectedTimeRange, setSelectedTimeRange] = useState([0, 12])
  const [selectedRiskTypes, setSelectedRiskTypes] = useState<string[]>(["All"])
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [selectedFacility, setSelectedFacility] = useState<RiskFacility | null>(null)
  const [facilities, setFacilities] = useState<RiskFacility[]>([])
  const [riskEvents, setRiskEvents] = useState<RiskEvent[]>([])

  useEffect(() => {
    // Mock facility data based on RHIS entries
    const mockFacilities: RiskFacility[] = [
      {
        id: "f1",
        name: "Andhra Pradesh Mining Complex",
        type: "Mining",
        coordinates: [79.74, 15.9129],
        riskLevel: "Critical",
        riskScore: 92,
        lastIncident: "2025-07-10",
        operationalStatus: "Active",
        country: "India",
        state: "Andhra Pradesh",
        relatedRHISEntry: "New Land Ownership Bill - High risk of land acquisition disruption",
      },
      {
        id: "f2",
        name: "Sonora Lithium Extraction Site",
        type: "Mining",
        coordinates: [-110.9559, 29.2972],
        riskLevel: "High",
        riskScore: 85,
        lastIncident: "2025-06-28",
        operationalStatus: "Active",
        country: "Mexico",
        state: "Sonora",
        relatedRHISEntry: "Federal Bill on Lithium Nationalization - Risk of asset seizure",
      },
      {
        id: "f3",
        name: "Minas Gerais Iron Ore Mine",
        type: "Mining",
        coordinates: [-44.5557, -18.5122],
        riskLevel: "High",
        riskScore: 78,
        lastIncident: "2025-07-05",
        operationalStatus: "Maintenance",
        country: "Brazil",
        state: "Minas Gerais",
        relatedRHISEntry: "Indigenous Land Demarcation - Mining delays due to land claims",
      },
      {
        id: "f4",
        name: "Ontario Steel Processing Plant",
        type: "Steel",
        coordinates: [-79.3832, 43.6532],
        riskLevel: "Medium",
        riskScore: 65,
        lastIncident: "2025-07-02",
        operationalStatus: "Active",
        country: "Canada",
        state: "Ontario",
        relatedRHISEntry: "Mining Royalty Reform Bill - Increased extraction costs",
      },
      {
        id: "f5",
        name: "Mumbai Port Logistics Hub",
        type: "Logistics",
        coordinates: [72.8777, 19.076],
        riskLevel: "Medium",
        riskScore: 58,
        lastIncident: "2024-12-01",
        operationalStatus: "Active",
        country: "India",
        state: "Maharashtra",
        relatedRHISEntry: "Regional political tensions affecting supply chain",
      },
    ]

    const mockEvents: RiskEvent[] = [
      {
        id: "e1",
        facilityId: "f1",
        timestamp: "2025-07-10T14:30:00Z",
        eventType: "Political Violence",
        severity: "Critical",
        description: "YSR Party activist Cheeli Singaiah killed, sparking massive protests against land acquisition",
        politicalContext: "Deep political tension rising in Andhra Pradesh",
      },
      {
        id: "e2",
        facilityId: "f2",
        timestamp: "2025-06-28T09:15:00Z",
        eventType: "Regulatory Change",
        severity: "High",
        description: "Federal Bill on Lithium Nationalization passed, threatening foreign company operations",
        politicalContext: "Government faces backlash from private mining sector",
      },
      {
        id: "e3",
        facilityId: "f3",
        timestamp: "2025-07-05T16:45:00Z",
        eventType: "Social Unrest",
        severity: "High",
        description: "Protests erupt in Belo Horizonte as Indigenous groups clash with federal police",
        politicalContext: "Constitutional Amendment on Indigenous Land Demarcation creating tensions",
      },
      {
        id: "e4",
        facilityId: "f4",
        timestamp: "2025-07-02T11:20:00Z",
        eventType: "Economic Policy",
        severity: "Medium",
        description: "Ontario Mining Royalty Reform Bill increases extraction costs significantly",
        politicalContext: "Mining unions rally against new tax; political friction with provincial government",
      },
    ]

    setFacilities(mockFacilities)
    setRiskEvents(mockEvents)
  }, [])

  const riskTypes = ["All", "Political", "Economic", "Environmental", "Social", "Regulatory"]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-600"
      case "Maintenance":
        return "bg-yellow-600"
      case "Inactive":
        return "bg-gray-600"
      default:
        return "bg-gray-500"
    }
  }

  const getCountryFlag = (country: string) => {
    switch (country) {
      case "India":
        return "🇮🇳"
      case "Mexico":
        return "🇲🇽"
      case "Brazil":
        return "🇧🇷"
      case "Canada":
        return "🇨🇦"
      default:
        return "🌍"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-6">
      {/* Control Panel */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-600" />
            GeoTemporal Risk Controls
          </CardTitle>
          <CardDescription className="text-slate-600">
            Configure map display and temporal analysis parameters for RHIS monitoring
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-slate-800 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                Time Range (Months)
              </label>
              <span className="text-slate-600">
                {selectedTimeRange[0]} - {selectedTimeRange[1]} months ago
              </span>
            </div>
            <Slider
              value={selectedTimeRange}
              onValueChange={setSelectedTimeRange}
              max={24}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          {/* Risk Type Filter */}
          <div className="space-y-3">
            <label className="text-slate-800 flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-600" />
              Risk Types
            </label>
            <Select value={selectedRiskTypes[0]} onValueChange={(value) => setSelectedRiskTypes([value])}>
              <SelectTrigger className="bg-white text-slate-800 border-slate-300">
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

          {/* Display Options */}
          <div className="flex items-center justify-between">
            <label className="text-slate-800">Show Risk Heatmap</label>
            <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800">Interactive RHIS Risk Map</CardTitle>
              <CardDescription className="text-slate-600">
                Click on facility markers to view detailed RHIS intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simulated Map Area */}
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

                {/* Facility Markers */}
                {facilities.map((facility, index) => (
                  <div
                    key={facility.id}
                    className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-3 -translate-y-3 ${getRiskColor(facility.riskLevel)} hover:scale-125 transition-all shadow-lg border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                    style={{
                      left: `${15 + index * 18}%`,
                      top: `${25 + index * 12}%`,
                    }}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    {getCountryFlag(facility.country)}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {facility.name}
                      <br />
                      <span className="text-slate-300">
                        {facility.country}, {facility.state}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Heatmap Overlay */}
                {showHeatmap && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-red-500/15 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-orange-500/15 rounded-full blur-xl"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl"></div>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/95 p-3 rounded-lg border border-slate-200 shadow-lg">
                  <h4 className="text-slate-800 text-sm font-semibold mb-2">RHIS Risk Levels</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
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
        </div>

        {/* Sidebar Information */}
        <div className="space-y-4">
          {/* Selected Facility Details */}
          {selectedFacility ? (
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Factory className="h-5 w-5 text-blue-600" />
                  {selectedFacility.name}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {selectedFacility.type} Facility • {getCountryFlag(selectedFacility.country)}{" "}
                  {selectedFacility.country}, {selectedFacility.state}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Risk Level</span>
                  <Badge className={getRiskColor(selectedFacility.riskLevel) + " text-white"}>
                    {selectedFacility.riskLevel}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Status</span>
                  <Badge className={getStatusColor(selectedFacility.operationalStatus) + " text-white"}>
                    {selectedFacility.operationalStatus}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Risk Score</span>
                    <span>{selectedFacility.riskScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getRiskColor(selectedFacility.riskLevel)}`}
                      style={{ width: `${selectedFacility.riskScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-slate-600 text-sm font-semibold">RHIS Intelligence</span>
                  <p className="text-slate-800 text-sm mt-1 p-2 bg-slate-50 rounded border-l-4 border-l-blue-500">
                    {selectedFacility.relatedRHISEntry}
                  </p>
                </div>

                <div>
                  <span className="text-slate-600 text-sm">Last Incident</span>
                  <p className="text-slate-800">{selectedFacility.lastIncident}</p>
                </div>

                <div>
                  <span className="text-slate-600 text-sm">Coordinates</span>
                  <p className="text-slate-800 text-sm font-mono">
                    {selectedFacility.coordinates[1].toFixed(4)}, {selectedFacility.coordinates[0].toFixed(4)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
              <CardContent className="text-center py-8">
                <Factory className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-slate-800 font-semibold mb-2">Select a Facility</h3>
                <p className="text-slate-600 text-sm">Click on a marker to view RHIS intelligence</p>
              </CardContent>
            </Card>
          )}

          {/* Risk Summary */}
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                RHIS Risk Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Facilities</span>
                <span className="text-slate-800 font-semibold">{facilities.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Critical Risk</span>
                <span className="text-red-600 font-semibold">
                  {facilities.filter((f) => f.riskLevel === "Critical").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">High Risk</span>
                <span className="text-orange-600 font-semibold">
                  {facilities.filter((f) => f.riskLevel === "High").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Medium Risk</span>
                <span className="text-yellow-600 font-semibold">
                  {facilities.filter((f) => f.riskLevel === "Medium").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Active Alerts</span>
                <span className="text-red-600 font-semibold">{riskEvents.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent RHIS Events */}
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                Recent RHIS Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-slate-800 text-sm font-semibold">{event.eventType}</span>
                    <Badge className={getRiskColor(event.severity) + " text-white"} size="sm">
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-slate-600 text-xs mb-2">{event.description}</p>
                  {event.politicalContext && (
                    <p className="text-slate-500 text-xs italic mb-2">Context: {event.politicalContext}</p>
                  )}
                  <p className="text-slate-500 text-xs">{new Date(event.timestamp).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Temporal Analysis */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            RHIS Temporal Risk Analysis
          </CardTitle>
          <CardDescription className="text-slate-600">Political and regulatory risk trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends" className="space-y-4">
            <TabsList className="bg-slate-100 border-slate-200">
              <TabsTrigger value="trends" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Risk Trends
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Event Timeline
              </TabsTrigger>
              <TabsTrigger
                value="predictions"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Predictions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-4">
              <div className="h-48 bg-slate-50 rounded-lg p-4 flex items-center justify-center border border-slate-200">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-800">RHIS Risk Trend Visualization</p>
                  <p className="text-slate-600 text-sm">Political and regulatory risk evolution over time</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="space-y-3">
                {riskEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className={`w-3 h-3 rounded-full mt-2 ${getRiskColor(event.severity)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-slate-800 font-semibold">{event.eventType}</span>
                        <span className="text-slate-500 text-sm">{new Date(event.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="text-slate-600 text-sm mb-1">{event.description}</p>
                      {event.politicalContext && (
                        <p className="text-slate-500 text-xs italic">Political Context: {event.politicalContext}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="text-slate-800 font-semibold mb-2">Next 30 Days</h4>
                  <p className="text-slate-600 text-sm mb-2">Predicted escalation in Andhra Pradesh land disputes</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-red-600 text-sm">85%</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h4 className="text-slate-800 font-semibold mb-2">Next 90 Days</h4>
                  <p className="text-slate-600 text-sm mb-2">Mexico lithium nationalization implementation risks</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-orange-500" style={{ width: "78%" }}></div>
                    </div>
                    <span className="text-orange-600 text-sm">78%</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
