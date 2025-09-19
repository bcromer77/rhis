"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Globe, TrendingUp, AlertTriangle } from "lucide-react"

// Mock data for RHIS PRISM demo - based on the provided dataset structure
const globalPoliticalProfiles = [
  {
    name: "Pawan Kalyan",
    position: "Jana Sena Party Chief & Actor-Politician",
    country: "India",
    region: "Asia",
    riskLevel: "High",
    influenceScore: 85,
    recentStatement:
      "We will not allow our sacred lands to be exploited by corporate greed. The people of Andhra Pradesh deserve better.",
    lastActivity: "2024-12-15",
    keyIssues: ["Land Rights Protection", "Environmental Conservation", "Anti-Mining Activism", "Social Justice"],
    trendingScore: 92,
  },
  {
    name: "Claudia Sheinbaum",
    position: "President of Mexico",
    country: "Mexico",
    region: "North America",
    riskLevel: "High",
    influenceScore: 88,
    recentStatement:
      "Mexico will continue AMLO's nationalization agenda, particularly in strategic sectors like lithium mining.",
    lastActivity: "2024-12-14",
    keyIssues: ["Lithium Nationalization", "Mining Regulation", "Foreign Investment Control", "Resource Sovereignty"],
    trendingScore: 89,
  },
  {
    name: "Damares Alves",
    position: "Brazilian Senator",
    country: "Brazil",
    region: "South America",
    riskLevel: "Medium",
    influenceScore: 76,
    recentStatement: "Constitutional reform on Indigenous land demarcation is essential for Brazil's development.",
    lastActivity: "2024-12-13",
    keyIssues: ["Indigenous Land Rights", "Constitutional Reform", "Mining Regulation", "Environmental Policy"],
    trendingScore: 73,
  },
  {
    name: "Doug Ford",
    position: "Premier of Ontario",
    country: "Canada",
    region: "North America",
    riskLevel: "Medium",
    influenceScore: 72,
    recentStatement:
      "Ontario's mining sector needs fair taxation that supports both industry growth and provincial revenue.",
    lastActivity: "2024-12-12",
    keyIssues: ["Mining Royalty Reform", "Provincial Taxation", "Industry Relations", "Economic Development"],
    trendingScore: 68,
  },
  {
    name: "Greta Thunberg",
    position: "Climate Activist",
    country: "Sweden",
    region: "Europe",
    riskLevel: "High",
    influenceScore: 95,
    recentStatement: "Corporate greenwashing must end. We demand real action on climate change now.",
    lastActivity: "2024-12-16",
    keyIssues: ["Climate Change", "Corporate Accountability", "Youth Activism", "Global Protests"],
    trendingScore: 98,
  },
  {
    name: "Alexandria Ocasio-Cortez",
    position: "US Representative",
    country: "United States",
    region: "North America",
    riskLevel: "Medium",
    influenceScore: 78,
    recentStatement:
      "The Green New Deal is not just about the environment - it's about creating good-paying jobs and ensuring justice.",
    lastActivity: "2024-12-11",
    keyIssues: ["Green New Deal", "Climate Justice", "Corporate Regulation", "Social Equity"],
    trendingScore: 75,
  },
  {
    name: "Vandana Shiva",
    position: "Environmental Activist & Author",
    country: "India",
    region: "Asia",
    riskLevel: "Medium",
    influenceScore: 72,
    recentStatement:
      "Biodiversity and seed sovereignty are fundamental rights that must be protected from corporate monopolization.",
    lastActivity: "2024-12-10",
    keyIssues: ["Biodiversity", "Seed Rights", "Sustainable Agriculture", "Corporate Resistance"],
    trendingScore: 68,
  },
  {
    name: "Cheeli Singaiah (Legacy)",
    position: "YSR Party Activist (Posthumous Impact)",
    country: "India",
    region: "Asia",
    riskLevel: "Critical",
    influenceScore: 82,
    recentStatement: "His death has sparked massive protests against land acquisition policies in Andhra Pradesh.",
    lastActivity: "Legacy continues",
    keyIssues: ["Land Rights Martyrdom", "Political Violence", "Anti-Corporate Sentiment", "Social Unrest"],
    trendingScore: 85,
  },
]

export function EcologyVoices() {
  const [profiles, setProfiles] = useState(globalPoliticalProfiles)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All")
  const [selectedRisk, setSelectedRisk] = useState("All")

  const regions = ["All", "Asia", "North America", "South America", "Europe", "Africa", "Middle East"]
  const riskLevels = ["All", "Low", "Medium", "High", "Critical"]

  const filteredProfiles = profiles.filter((profile) => {
    const matchesSearch =
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "All" || profile.region === selectedRegion
    const matchesRisk = selectedRisk === "All" || profile.riskLevel === selectedRisk

    return matchesSearch && matchesRegion && matchesRisk
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "border-red-500 bg-red-50"
      case "High":
        return "border-orange-400 bg-orange-50"
      case "Medium":
        return "border-yellow-400 bg-yellow-50"
      case "Low":
        return "border-green-400 bg-green-50"
      default:
        return "border-gray-400 bg-gray-50"
    }
  }

  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-600 text-white"
      case "High":
        return "bg-orange-500 text-white"
      case "Medium":
        return "bg-yellow-500 text-white"
      case "Low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Search Political Profiles
          </CardTitle>
          <CardDescription className="text-slate-600">
            Discover global political figures and their risk profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search by name, position, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white border-slate-300 text-slate-800 placeholder:text-slate-500"
          />

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600 flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Region:
              </span>
              {regions.map((region) => (
                <Button
                  key={region}
                  size="sm"
                  variant={selectedRegion === region ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region)}
                  className={
                    selectedRegion === region
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }
                >
                  {region}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-slate-600 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                Risk:
              </span>
              {riskLevels.map((risk) => (
                <Button
                  key={risk}
                  size="sm"
                  variant={selectedRisk === risk ? "default" : "outline"}
                  onClick={() => setSelectedRisk(risk)}
                  className={
                    selectedRisk === risk
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }
                >
                  {risk}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              {filteredProfiles.length} profiles found
            </span>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                High Risk: {filteredProfiles.filter((p) => p.riskLevel === "High" || p.riskLevel === "Critical").length}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Medium Risk: {filteredProfiles.filter((p) => p.riskLevel === "Medium").length}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Low Risk: {filteredProfiles.filter((p) => p.riskLevel === "Low").length}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profiles Grid - Polaroid Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile, index) => (
          <Card
            key={index}
            className={`bg-white border-2 transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl ${getRiskColor(profile.riskLevel)}`}
            style={{
              transform: `rotate(${((index % 3) - 1) * 2}deg)`,
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-slate-800 text-lg font-bold">{profile.name}</CardTitle>
                  <CardDescription className="text-slate-600 text-sm">{profile.position}</CardDescription>
                  <p className="text-slate-500 text-sm mt-1">
                    {profile.country} • {profile.region}
                  </p>
                </div>
                <Badge className={getRiskBadgeColor(profile.riskLevel)}>{profile.riskLevel}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>Influence Score</span>
                  <span>{profile.influenceScore}/100</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: `${profile.influenceScore}%` }} />
                </div>
              </div>

              <div>
                <h4 className="text-slate-800 font-semibold text-sm mb-2">Recent Statement</h4>
                <p className="text-slate-700 text-sm italic">"{profile.recentStatement}"</p>
                <p className="text-slate-500 text-xs mt-1">{profile.lastActivity}</p>
              </div>

              <div>
                <h4 className="text-slate-800 font-semibold text-sm mb-2">Key Issues</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.keyIssues.slice(0, 3).map((issue, issueIndex) => (
                    <Badge key={issueIndex} variant="outline" className="text-xs text-slate-600 border-slate-300">
                      {issue}
                    </Badge>
                  ))}
                  {profile.keyIssues.length > 3 && (
                    <Badge variant="outline" className="text-xs text-slate-600 border-slate-300">
                      +{profile.keyIssues.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Trending: {profile.trendingScore}%
                  </span>
                  <span>Updated: {profile.lastActivity}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Profiles Found</h3>
            <p className="text-slate-600">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Also export as GlobalPoliticalSignals for backward compatibility
export { EcologyVoices as GlobalPoliticalSignals }
