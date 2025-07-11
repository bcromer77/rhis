"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  Scale,
  Leaf,
  DollarSign,
  Shield,
  Users,
  FileText,
} from "lucide-react"

interface RiskEntry {
  country: string
  politician_name: string
  issue: string
  impact: string
  category: string
  date: string
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  action_required: string[]
}

const mockRiskData: RiskEntry[] = [
  {
    country: "Brazil",
    politician_name: "Senator Damares Alves",
    issue: "Supreme Court ruling against Indigenous land demarcation restrictions",
    impact: "Increased legal exposure for mining companies operating in disputed Indigenous territories",
    category: "Environmental, Legal, Social",
    date: "2025-07-04",
    riskLevel: "High",
    action_required: ["Halt exploratory activity on contested lands", "Engage Indigenous associations"],
  },
  {
    country: "Brazil",
    politician_name: "Deputy Reginaldo Lopes",
    issue: "Mass protests against iron ore expansion near river basins",
    impact: "High operational disruption risk; water pollution allegations spark federal probe",
    category: "Environmental, Social, Regulatory",
    date: "2025-07-07",
    riskLevel: "Critical",
    action_required: ["Activate local risk intelligence teams", "Engage with IBAMA for audit mitigation"],
  },
  {
    country: "Canada",
    politician_name: "Doug Ford",
    issue: "Mining Royalty Reform Bill raises extraction levies by 18%",
    impact: "Erosion of export profit margins for steel and iron producers",
    category: "Economic, Regulatory",
    date: "2025-06-21",
    riskLevel: "High",
    action_required: ["Coordinate with Ontario Mining Association", "Model cost inflation impact"],
  },
  {
    country: "Canada",
    politician_name: "Jagmeet Singh",
    issue: "Indigenous group files lawsuit blocking access to copper and gold deposits",
    impact: "Legal injunction halts exploratory mining in key zones near Skeena River",
    category: "Legal, Environmental, Social",
    date: "2025-07-10",
    riskLevel: "Critical",
    action_required: ["Monitor federal court proceedings", "Initiate Indigenous relations protocol review"],
  },
  {
    country: "Mexico",
    politician_name: "Claudia Sheinbaum",
    issue: "Revival of Mexican pharmaceutical industry via production-based procurement policy",
    impact: "Foreign pharmaceutical companies without domestic facilities may lose government tenders",
    category: "Economic, Regulatory, Industrial Policy",
    date: "2025-07-10",
    riskLevel: "High",
    action_required: [
      "Assess AM/NS exposure to pharmaceutical sector reforms",
      "Monitor Ministry of Health procurement",
    ],
  },
  {
    country: "Mexico",
    politician_name: "Claudia Sheinbaum",
    issue: "Highway robbery surge including extortion, kidnappings, and National Guard collusion",
    impact: "Severe logistics disruptions and increased cost of freight movement",
    category: "Security, Transport, Economic Risk",
    date: "2025-07-10",
    riskLevel: "Critical",
    action_required: ["Reassess cargo movement risk", "Evaluate insurance coverage against extortion"],
  },
]

const countries = ["Brazil", "Canada", "Mexico"]
const categories = ["Environmental", "Legal", "Economic", "Security", "Social", "Regulatory"]

const getRiskColor = (level: string) => {
  switch (level) {
    case "Critical":
      return "bg-red-600 text-white"
    case "High":
      return "bg-red-500 text-white"
    case "Medium":
      return "bg-yellow-500 text-white"
    case "Low":
      return "bg-green-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

const getCategoryIcon = (category: string) => {
  if (category.includes("Legal")) return <Scale className="h-4 w-4" />
  if (category.includes("Environmental")) return <Leaf className="h-4 w-4" />
  if (category.includes("Economic")) return <DollarSign className="h-4 w-4" />
  if (category.includes("Security")) return <Shield className="h-4 w-4" />
  if (category.includes("Social")) return <Users className="h-4 w-4" />
  return <FileText className="h-4 w-4" />
}

const getCountryFlag = (country: string) => {
  switch (country) {
    case "Brazil":
      return "🇧🇷"
    case "Canada":
      return "🇨🇦"
    case "Mexico":
      return "🇲🇽"
    default:
      return "🌍"
  }
}

export function CompareModePanel() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [dateRange, setDateRange] = useState([0, 100])

  const filteredData = useMemo(() => {
    return mockRiskData.filter((entry) => {
      const matchesSearch =
        searchTerm === "" ||
        entry.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.politician_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.impact.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All" || entry.category.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, dateRange])

  const getCountryData = (country: string) => {
    const countryEntries = filteredData.filter((entry) => entry.country === country)
    const topRisks = countryEntries.slice(0, 3)
    const politicians = [...new Set(countryEntries.map((entry) => entry.politician_name))]
    const latestAction = countryEntries[0]?.action_required[0] || "No recent actions"

    return { topRisks, politicians, latestAction, totalRisks: countryEntries.length }
  }

  const exportData = (country: string) => {
    const countryData = filteredData.filter((entry) => entry.country === country)
    const csvContent = [
      ["Date", "Politician", "Issue", "Impact", "Category", "Risk Level"],
      ...countryData.map((entry) => [
        entry.date,
        entry.politician_name,
        entry.issue,
        entry.impact,
        entry.category,
        entry.riskLevel,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${country}_risk_analysis.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Risk Comparison Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search risks, politicians, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category Filter</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date Range
              </label>
              <Slider value={dateRange} onValueChange={setDateRange} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>May 2025</span>
                <span>July 2025</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Country Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {countries.map((country) => {
          const { topRisks, politicians, latestAction, totalRisks } = getCountryData(country)

          return (
            <Card key={country} className="bg-white border-slate-200 shadow-lg">
              {/* Country Header */}
              <CardHeader className="bg-slate-50 border-b border-slate-200">
                <CardTitle className="text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="text-2xl">{getCountryFlag(country)}</span>
                    {country}
                  </span>
                  <Badge variant="outline" className="text-slate-600">
                    {totalRisks} risks
                  </Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 p-4">
                {/* Top 3 Current Risks */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Top Current Risks
                  </h4>
                  <div className="space-y-2">
                    {topRisks.map((risk, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(risk.category)}
                            <Badge className={`text-xs ${getRiskColor(risk.riskLevel)}`}>{risk.riskLevel}</Badge>
                          </div>
                          <span className="text-xs text-slate-500">{risk.date}</span>
                        </div>
                        <p className="text-sm text-slate-700 font-medium mb-1">{risk.issue}</p>
                        <p className="text-xs text-slate-600">{risk.impact.substring(0, 100)}...</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Politician Watchlist */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Key Politicians
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {politicians.slice(0, 3).map((politician, index) => (
                      <Badge key={index} variant="outline" className="text-xs text-slate-600 border-slate-300">
                        {politician}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Latest Legal/Regulatory Action */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Scale className="h-4 w-4" />
                    Latest Action Required
                  </h4>
                  <p className="text-sm text-slate-600 bg-blue-50 p-2 rounded">{latestAction}</p>
                </div>

                {/* Strategic Insight Summary */}
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Strategic Insight</h4>
                  <p className="text-sm text-slate-600">
                    {totalRisks > 2
                      ? "High activity region requiring close monitoring"
                      : totalRisks > 0
                        ? "Moderate risk environment with specific concerns"
                        : "Low risk environment with stable conditions"}
                  </p>
                </div>

                {/* Export Button */}
                <Button onClick={() => exportData(country)} variant="outline" size="sm" className="w-full mt-4">
                  <Download className="h-4 w-4 mr-2" />
                  Export {country} Data
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
