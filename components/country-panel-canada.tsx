"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertTriangle, CheckCircle, XCircle, Radio, Scale, Users, FileText, MapPin } from "lucide-react"

interface IndigenousRadarData {
  province: string
  duty_to_consult: "High" | "Medium" | "Low" | "None"
  media_access: "Active" | "Limited" | "Absent"
  legal_cases: number
  esg_alignment: "High" | "Medium" | "Low"
  in_legislation: boolean
  notes: string
}

export function CountryPanelCanada() {
  const [radarData, setRadarData] = useState<IndigenousRadarData[]>([])
  const [highlightLitigation, setHighlightLitigation] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load Indigenous radar data
    const loadRadarData = async () => {
      try {
        const response = await fetch("/data/indigenous-radar.json")
        const data = await response.json()
        setRadarData(data)
      } catch (error) {
        console.error("Failed to load Indigenous radar data:", error)
        // Fallback to mock data if file not found
        setRadarData([
          {
            province: "Quebec",
            duty_to_consult: "None",
            media_access: "Absent",
            legal_cases: 5,
            esg_alignment: "Low",
            in_legislation: false,
            notes: "No First Nations represented in U.S. trade delegation. 5 ongoing land rights lawsuits.",
          },
          {
            province: "British Columbia",
            duty_to_consult: "High",
            media_access: "Active",
            legal_cases: 1,
            esg_alignment: "High",
            in_legislation: true,
            notes: "Strong UNDRIP implementation. Active APTN coverage and community radio networks.",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadRadarData()
  }, [])

  const getComplianceColor = (level: string) => {
    switch (level) {
      case "High":
        return "bg-green-100 text-green-800 border-green-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "None":
        return "bg-red-100 text-red-800 border-red-200"
      case "Active":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Limited":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Absent":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getComplianceIcon = (level: string) => {
    switch (level) {
      case "High":
        return <CheckCircle className="h-4 w-4" />
      case "Medium":
        return <AlertTriangle className="h-4 w-4" />
      case "Low":
      case "None":
        return <XCircle className="h-4 w-4" />
      case "Active":
        return <Radio className="h-4 w-4" />
      case "Limited":
        return <AlertTriangle className="h-4 w-4" />
      case "Absent":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const totalLegalCases = radarData.reduce((sum, province) => sum + province.legal_cases, 0)
  const activeMediaProvinces = radarData.filter((p) => p.media_access === "Active").length
  const highComplianceProvinces = radarData.filter((p) => p.duty_to_consult === "High").length

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />🧭 Indigenous Sovereignty Radar
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
            <Users className="h-5 w-5" />🧭 Indigenous Sovereignty Radar
          </CardTitle>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-1">
              <Scale className="h-4 w-4" />
              {totalLegalCases} Active Cases
            </div>
            <div className="flex items-center gap-1">
              <Radio className="h-4 w-4" />
              {activeMediaProvinces}/10 Active Media
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              {highComplianceProvinces}/10 High Compliance
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Toggle Controls */}
          <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="highlight-litigation"
                checked={highlightLitigation}
                onCheckedChange={setHighlightLitigation}
              />
              <label
                htmlFor="highlight-litigation"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Highlight provinces with active litigation or broadcasting zones
              </label>
            </div>
          </div>

          {/* Radar Grid */}
          <div className="grid gap-3">
            {radarData.map((province) => (
              <Tooltip key={province.province}>
                <TooltipTrigger asChild>
                  <div
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md cursor-pointer ${
                      highlightLitigation && (province.legal_cases > 0 || province.media_access === "Active")
                        ? "ring-2 ring-blue-500 bg-blue-50"
                        : "bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        <span className="font-semibold text-slate-900">{province.province}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {province.in_legislation ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-xs text-slate-600">
                          {province.in_legislation ? "In Legislation" : "Not Present"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {/* Duty to Consult */}
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600 font-medium">Duty to Consult</div>
                        <Badge
                          variant="outline"
                          className={`${getComplianceColor(province.duty_to_consult)} flex items-center gap-1`}
                        >
                          {getComplianceIcon(province.duty_to_consult)}
                          {province.duty_to_consult}
                        </Badge>
                      </div>

                      {/* Media Access */}
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600 font-medium">Media Coverage</div>
                        <Badge
                          variant="outline"
                          className={`${getComplianceColor(province.media_access)} flex items-center gap-1`}
                        >
                          {getComplianceIcon(province.media_access)}
                          {province.media_access}
                        </Badge>
                      </div>

                      {/* Legal Cases */}
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600 font-medium">Legal Cases</div>
                        <Badge
                          variant="outline"
                          className={`${
                            province.legal_cases > 3
                              ? "bg-red-100 text-red-800 border-red-200"
                              : province.legal_cases > 0
                                ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                : "bg-green-100 text-green-800 border-green-200"
                          } flex items-center gap-1`}
                        >
                          <FileText className="h-3 w-3" />
                          {province.legal_cases}
                        </Badge>
                      </div>

                      {/* ESG Alignment */}
                      <div className="space-y-1">
                        <div className="text-xs text-slate-600 font-medium">ESG Alignment</div>
                        <Badge
                          variant="outline"
                          className={`${getComplianceColor(province.esg_alignment)} flex items-center gap-1`}
                        >
                          {getComplianceIcon(province.esg_alignment)}
                          {province.esg_alignment}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-sm">
                  <p className="text-sm">
                    📍 {province.province}: {province.notes}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">National Overview</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">High Compliance Provinces:</span>
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  {highComplianceProvinces}/10
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Active Media Coverage:</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {activeMediaProvinces}/10
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Total Legal Proceedings:</span>
                <Badge
                  variant="outline"
                  className={`${totalLegalCases > 15 ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}
                >
                  {totalLegalCases}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  )
}
