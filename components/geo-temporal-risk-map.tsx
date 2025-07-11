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
}

interface RiskEvent {
  id: string
  facilityId: string
  timestamp: string
  eventType: string
  severity: "Low" | "Medium" | "High" | "Critical"
  description: string
}

export function GeoTemporalRiskMap() {
  const [selectedTimeRange, setSelectedTimeRange] = useState([0, 12])
  const [selectedRiskTypes, setSelectedRiskTypes] = useState<string[]>(["All"])
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [selectedFacility, setSelectedFacility] = useState<RiskFacility | null>(null)
  const [facilities, setFacilities] = useState<RiskFacility[]>([])
  const [riskEvents, setRiskEvents] = useState<RiskEvent[]>([])

  useEffect(() => {
    // Mock facility data
    const mockFacilities: RiskFacility[] = [
      {
        id: "f1",
        name: "Mumbai Industrial Complex",
        type: "Manufacturing",
        coordinates: [72.8777, 19.076],
        riskLevel: "High",
        riskScore: 78,
        lastIncident: "2024-12-10",
        operationalStatus: "Active",
      },
      {
        id: "f2",
        name: "Delhi Power Plant",
        type: "Energy",
        coordinates: [77.1025, 28.7041],
        riskLevel: "Medium",
        riskScore: 65,
        lastIncident: "2024-11-28",
        operationalStatus: "Active",
      },
      {
        id: "f3",
        name: "Bangalore Tech Hub",
        type: "Technology",
        coordinates: [77.5946, 12.9716],
        riskLevel: "Low",
        riskScore: 32,
        lastIncident: "2024-10-15",
        operationalStatus: "Active",
      },
      {
        id: "f4",
        name: "Chennai Port Authority",
        type: "Transportation",
        coordinates: [80.2707, 13.0827],
        riskLevel: "High",
        riskScore: 82,
        lastIncident: "2024-12-14",
        operationalStatus: "Maintenance",
      },
      {
        id: "f5",
        name: "Hyderabad Pharma District",
        type: "Healthcare",
        coordinates: [78.4867, 17.385],
        riskLevel: "Medium",
        riskScore: 58,
        lastIncident: "2024-12-01",
        operationalStatus: "Active",
      },
    ]

    const mockEvents: RiskEvent[] = [
      {
        id: "e1",
        facilityId: "f1",
        timestamp: "2024-12-10T14:30:00Z",
        eventType: "Environmental Violation",
        severity: "High",
        description: "Air quality standards exceeded during peak production hours",
      },
      {
        id: "e2",
        facilityId: "f4",
        timestamp: "2024-12-14T09:15:00Z",
        eventType: "Safety Incident",
        severity: "High",
        description: "Equipment malfunction in cargo handling area",
      },
      {
        id: "e3",
        facilityId: "f2",
        timestamp: "2024-11-28T16:45:00Z",
        eventType: "Regulatory Compliance",
        severity: "Medium",
        description: "Delayed submission of environmental impact report",
      },
    ]

    setFacilities(mockFacilities)
    setRiskEvents(mockEvents)
  }, [])

  const riskTypes = ["All", "Environmental", "Safety", "Regulatory", "Security", "Operational"]

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-red-500"
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

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Map className="h-5 w-5" />
            GeoTemporal Risk Controls
          </CardTitle>
          <CardDescription className="text-purple-200">
            Configure map display and temporal analysis parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Time Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-white flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Time Range (Months)
              </label>
              <span className="text-purple-200">
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
            <label className="text-white flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Risk Types
            </label>
            <Select value={selectedRiskTypes[0]} onValueChange={(value) => setSelectedRiskTypes([value])}>
              <SelectTrigger className="bg-white/20 text-white border-purple-500/30">
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
            <label className="text-white">Show Risk Heatmap</label>
            <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white">Interactive Risk Map</CardTitle>
              <CardDescription className="text-purple-200">
                Click on facility markers to view detailed information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simulated Map Area */}
              <div className="relative h-96 bg-slate-800 rounded-lg overflow-hidden">
                {/* Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900">
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" className="text-purple-500">
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
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 ${getRiskColor(facility.riskLevel)} hover:scale-150 transition-all`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`,
                    }}
                    onClick={() => setSelectedFacility(facility)}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      {facility.name}
                    </div>
                  </div>
                ))}

                {/* Heatmap Overlay */}
                {showHeatmap && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-yellow-500/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-1/3 left-1/2 w-20 h-20 bg-green-500/20 rounded-full blur-xl"></div>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-black/80 p-3 rounded-lg">
                  <h4 className="text-white text-sm font-semibold mb-2">Risk Levels</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      <span className="text-white text-xs">Critical/High</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-white text-xs">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-white text-xs">Low</span>
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
            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Factory className="h-5 w-5" />
                  {selectedFacility.name}
                </CardTitle>
                <CardDescription className="text-purple-200">{selectedFacility.type} Facility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Risk Level</span>
                  <Badge className={getRiskColor(selectedFacility.riskLevel)}>{selectedFacility.riskLevel}</Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-purple-200">Status</span>
                  <Badge className={getStatusColor(selectedFacility.operationalStatus)}>
                    {selectedFacility.operationalStatus}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between text-sm text-purple-200 mb-2">
                    <span>Risk Score</span>
                    <span>{selectedFacility.riskScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getRiskColor(selectedFacility.riskLevel)}`}
                      style={{ width: `${selectedFacility.riskScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-purple-200 text-sm">Last Incident</span>
                  <p className="text-white">{selectedFacility.lastIncident}</p>
                </div>

                <div>
                  <span className="text-purple-200 text-sm">Coordinates</span>
                  <p className="text-white text-sm font-mono">
                    {selectedFacility.coordinates[1].toFixed(4)}, {selectedFacility.coordinates[0].toFixed(4)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
              <CardContent className="text-center py-8">
                <Factory className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Select a Facility</h3>
                <p className="text-purple-200 text-sm">Click on a marker to view detailed information</p>
              </CardContent>
            </Card>
          )}

          {/* Risk Summary */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Risk Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Total Facilities</span>
                <span className="text-white font-semibold">{facilities.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">High Risk</span>
                <span className="text-red-400 font-semibold">
                  {facilities.filter((f) => f.riskLevel === "High" || f.riskLevel === "Critical").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Medium Risk</span>
                <span className="text-yellow-400 font-semibold">
                  {facilities.filter((f) => f.riskLevel === "Medium").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Low Risk</span>
                <span className="text-green-400 font-semibold">
                  {facilities.filter((f) => f.riskLevel === "Low").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-purple-200">Active Alerts</span>
                <span className="text-red-400 font-semibold">{riskEvents.length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Events */}
          <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {riskEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="p-3 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white text-sm font-semibold">{event.eventType}</span>
                    <Badge className={getRiskColor(event.severity)} size="sm">
                      {event.severity}
                    </Badge>
                  </div>
                  <p className="text-purple-200 text-xs mb-2">{event.description}</p>
                  <p className="text-purple-300 text-xs">{new Date(event.timestamp).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Temporal Analysis */}
      <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Temporal Risk Analysis
          </CardTitle>
          <CardDescription className="text-purple-200">Risk trends over the selected time period</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends" className="space-y-4">
            <TabsList className="bg-white/10 border-purple-500/20">
              <TabsTrigger value="trends" className="data-[state=active]:bg-purple-600">
                Risk Trends
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-purple-600">
                Event Timeline
              </TabsTrigger>
              <TabsTrigger value="predictions" className="data-[state=active]:bg-purple-600">
                Predictions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-4">
              <div className="h-48 bg-slate-800 rounded-lg p-4 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <p className="text-white">Risk Trend Visualization</p>
                  <p className="text-purple-200 text-sm">Interactive chart showing risk evolution over time</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <div className="space-y-3">
                {riskEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getRiskColor(event.severity)}`}></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white font-semibold">{event.eventType}</span>
                        <span className="text-purple-300 text-sm">
                          {new Date(event.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-purple-200 text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Next 30 Days</h4>
                  <p className="text-purple-200 text-sm mb-2">Predicted risk increase in manufacturing sector</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-yellow-500" style={{ width: "65%" }}></div>
                    </div>
                    <span className="text-yellow-400 text-sm">65%</span>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Next 90 Days</h4>
                  <p className="text-purple-200 text-sm mb-2">Environmental compliance risks expected to rise</p>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: "78%" }}></div>
                    </div>
                    <span className="text-red-400 text-sm">78%</span>
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
