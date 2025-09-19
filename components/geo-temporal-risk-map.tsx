"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Globe, TrendingUp, AlertTriangle, Users, Eye, EyeOff } from "lucide-react"

interface RiskPoint {
  id: string
  country: string
  region: string
  lat: number
  lng: number
  riskLevel: "High" | "Medium" | "Low"
  category: string
  description: string
  trend: "increasing" | "stable" | "decreasing"
  lastUpdated: string
}

interface IndigenousOverlayPoint {
  country: string
  region: string
  lat: number
  lng: number
  type: string
  risk: "High" | "Medium" | "Low"
  notes: string
}

export function GeoTemporalRiskMap() {
  const [riskPoints, setRiskPoints] = useState<RiskPoint[]>([])
  const [indigenousOverlay, setIndigenousOverlay] = useState<IndigenousOverlayPoint[]>([])
  const [showIndigenousZones, setShowIndigenousZones] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load risk data and indigenous overlay data
    const loadData = async () => {
      try {
        // Load main risk data
        const mockRiskData: RiskPoint[] = [
          {
            id: "1",
            country: "India",
            region: "Maharashtra",
            lat: 19.7515,
            lng: 75.7139,
            riskLevel: "High",
            category: "Regulatory",
            description: "New environmental compliance requirements affecting steel production",
            trend: "increasing",
            lastUpdated: "2025-01-11",
          },
          {
            id: "2",
            country: "Brazil",
            region: "Minas Gerais",
            lat: -19.9167,
            lng: -43.9345,
            riskLevel: "Medium",
            category: "Political",
            description: "Mining license renewal delays due to environmental concerns",
            trend: "stable",
            lastUpdated: "2025-01-10",
          },
          {
            id: "3",
            country: "Mexico",
            region: "Coahuila",
            lat: 25.4232,
            lng: -101.0053,
            riskLevel: "High",
            category: "ESG",
            description: "Water usage restrictions impacting steel operations",
            trend: "increasing",
            lastUpdated: "2025-01-11",
          },
          {
            id: "4",
            country: "Canada",
            region: "Ontario",
            lat: 43.6532,
            lng: -79.3832,
            riskLevel: "Low",
            category: "Regulatory",
            description: "Carbon pricing adjustments for industrial sectors",
            trend: "stable",
            lastUpdated: "2025-01-09",
          },
        ]

        // Load indigenous overlay data
        const overlayResponse = await fetch("/data/indigenous-overlay.json")
        const overlayData = await overlayResponse.json()

        setRiskPoints(mockRiskData)
        setIndigenousOverlay(overlayData)
      } catch (error) {
        console.error("Failed to load map data:", error)
        // Fallback data
        setIndigenousOverlay([
          {
            country: "India",
            region: "Andhra Pradesh",
            lat: 17.0,
            lng: 82.0,
            type: "radio_gap_zone",
            risk: "High",
            notes: "No structured tribal media access near ArcelorMittal Rajayyapeta plant",
          },
          {
            country: "Mexico",
            region: "Tamaulipas",
            lat: 23.7,
            lng: -99.0,
            type: "spectrum_conflict",
            risk: "High",
            notes: "10% spectrum reserved for Indigenous media; proximity to gas-related ESG claims",
          },
          {
            country: "Brazil",
            region: "Minas Gerais",
            lat: -18.9,
            lng: -43.9,
            type: "broadcast_gap",
            risk: "Medium",
            notes: "FUNAI and NGOs operate informal FM networks; no telecom formalization yet",
          },
          {
            country: "Canada",
            region: "Ontario",
            lat: 49.0,
            lng: -85.0,
            type: "active_native_broadcast",
            risk: "Low",
            notes: "APTN & CRTC-backed Native FM in compliance zone; risk is reputational only",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
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

  const getBroadcastTypeIcon = (type: string) => {
    switch (type) {
      case "radio_gap_zone":
        return "📻"
      case "spectrum_conflict":
        return "📡"
      case "broadcast_gap":
        return "🔇"
      case "active_native_broadcast":
        return "🎙️"
      default:
        return "📻"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-3 w-3 text-red-500" />
      case "decreasing":
        return <TrendingUp className="h-3 w-3 text-green-500 rotate-180" />
      case "stable":
        return <div className="h-3 w-3 bg-yellow-500 rounded-full" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            GeoTemporal Risk Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <TooltipProvider>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            GeoTemporal Risk Map
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="indigenous-zones" checked={showIndigenousZones} onCheckedChange={setShowIndigenousZones} />
              <label
                htmlFor="indigenous-zones"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                🎙️ Indigenous Broadcasting Zones
              </label>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIndigenousZones(!showIndigenousZones)}
              className="flex items-center gap-1"
            >
              {showIndigenousZones ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showIndigenousZones ? "Hide" : "Show"} Overlay
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Map Container - Simulated with grid layout */}
          <div className="relative bg-slate-100 rounded-lg p-6 min-h-[400px]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg opacity-50"></div>

            {/* Risk Points */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 h-full">
              {riskPoints.map((point) => (
                <Tooltip key={point.id}>
                  <TooltipTrigger asChild>
                    <div
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedRisk === point.id ? "ring-2 ring-blue-500" : ""
                      } ${
                        point.riskLevel === "High"
                          ? "border-red-500 bg-red-50"
                          : point.riskLevel === "Medium"
                            ? "border-yellow-500 bg-yellow-50"
                            : "border-green-500 bg-green-50"
                      }`}
                      onClick={() => setSelectedRisk(selectedRisk === point.id ? null : point.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${getRiskColor(point.riskLevel)}`}></div>
                        <span className="font-semibold text-sm">{point.country}</span>
                        {getTrendIcon(point.trend)}
                      </div>
                      <div className="text-xs text-slate-600 mb-1">{point.region}</div>
                      <Badge variant="outline" className="text-xs">
                        {point.category}
                      </Badge>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-sm">
                    <div className="space-y-1">
                      <p className="font-semibold">
                        {point.country} - {point.region}
                      </p>
                      <p className="text-sm">{point.description}</p>
                      <p className="text-xs text-slate-500">Updated: {point.lastUpdated}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            {/* Indigenous Broadcasting Overlay */}
            {showIndigenousZones && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="relative h-full">
                  {indigenousOverlay.map((zone, index) => (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div
                          className="absolute pointer-events-auto cursor-pointer"
                          style={{
                            left: `${20 + index * 20}%`,
                            top: `${30 + index * 15}%`,
                          }}
                        >
                          <div
                            className={`p-2 rounded-full border-2 border-purple-500 bg-purple-100 hover:bg-purple-200 transition-colors ${
                              zone.risk === "High"
                                ? "ring-2 ring-red-400"
                                : zone.risk === "Medium"
                                  ? "ring-2 ring-yellow-400"
                                  : "ring-2 ring-green-400"
                            }`}
                          >
                            <span className="text-lg">{getBroadcastTypeIcon(zone.type)}</span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm">
                        <div className="space-y-1">
                          <p className="font-semibold">🎙️ Indigenous radio zone near {zone.region}</p>
                          <p className="text-sm">{zone.notes}</p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              zone.risk === "High"
                                ? "bg-red-100 text-red-800"
                                : zone.risk === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {zone.risk} Risk
                          </Badge>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Risk Levels:</span>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-xs">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-xs">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-xs">Low</span>
              </div>
            </div>

            {showIndigenousZones && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Broadcasting Zones:</span>
                <div className="flex items-center gap-1">
                  <span className="text-sm">📻</span>
                  <span className="text-xs">Radio Gap</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">📡</span>
                  <span className="text-xs">Spectrum Conflict</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm">🎙️</span>
                  <span className="text-xs">Active Native</span>
                </div>
              </div>
            )}
          </div>

          {/* Risk Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="font-semibold text-red-800">High Risk Zones</span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {riskPoints.filter((p) => p.riskLevel === "High").length}
              </div>
              {showIndigenousZones && (
                <div className="text-xs text-red-600 mt-1">
                  + {indigenousOverlay.filter((z) => z.risk === "High").length} Broadcasting Zones
                </div>
              )}
            </div>

            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-semibold text-yellow-800">Medium Risk Zones</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">
                {riskPoints.filter((p) => p.riskLevel === "Medium").length}
              </div>
              {showIndigenousZones && (
                <div className="text-xs text-yellow-600 mt-1">
                  + {indigenousOverlay.filter((z) => z.risk === "Medium").length} Broadcasting Zones
                </div>
              )}
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-800">Low Risk Zones</span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {riskPoints.filter((p) => p.riskLevel === "Low").length}
              </div>
              {showIndigenousZones && (
                <div className="text-xs text-green-600 mt-1">
                  + {indigenousOverlay.filter((z) => z.risk === "Low").length} Broadcasting Zones
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
