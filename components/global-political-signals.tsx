"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Globe, TrendingUp, AlertTriangle } from "lucide-react"
import { globalPoliticalProfiles } from "@/lib/global-political-profiles"

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
        return "border-red-500 bg-red-500/10"
      case "High":
        return "border-red-400 bg-red-400/10"
      case "Medium":
        return "border-yellow-400 bg-yellow-400/10"
      case "Low":
        return "border-green-400 bg-green-400/10"
      default:
        return "border-gray-400 bg-gray-400/10"
    }
  }

  const getRiskBadgeColor = (level: string) => {
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

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Political Profiles
          </CardTitle>
          <CardDescription className="text-purple-200">
            Discover global political figures and their risk profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search by name, position, or country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/20 text-white placeholder:text-purple-200 border-purple-500/30"
          />

          <div className="flex flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-purple-200 flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Region:
              </span>
              {regions.map((region) => (
                <Button
                  key={region}
                  size="sm"
                  variant={selectedRegion === region ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region)}
                  className={selectedRegion === region ? "bg-purple-600" : "border-purple-500/30 text-purple-200"}
                >
                  {region}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-purple-200 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                Risk:
              </span>
              {riskLevels.map((risk) => (
                <Button
                  key={risk}
                  size="sm"
                  variant={selectedRisk === risk ? "default" : "outline"}
                  onClick={() => setSelectedRisk(risk)}
                  className={selectedRisk === risk ? "bg-purple-600" : "border-purple-500/30 text-purple-200"}
                >
                  {risk}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              {filteredProfiles.length} profiles found
            </span>
            <div className="flex items-center gap-4 text-sm text-purple-200">
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
            className={`bg-white/10 backdrop-blur-sm border-2 transform rotate-1 hover:rotate-0 transition-all duration-300 hover:scale-105 ${getRiskColor(profile.riskLevel)}`}
            style={{
              transform: `rotate(${((index % 3) - 1) * 2}deg)`,
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg font-bold">{profile.name}</CardTitle>
                  <CardDescription className="text-purple-200 text-sm">{profile.position}</CardDescription>
                  <p className="text-purple-300 text-sm mt-1">
                    {profile.country} • {profile.region}
                  </p>
                </div>
                <Badge className={getRiskBadgeColor(profile.riskLevel)}>{profile.riskLevel}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-purple-200 mb-1">
                  <span>Influence Score</span>
                  <span>{profile.influenceScore}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-2 rounded-full bg-purple-500" style={{ width: `${profile.influenceScore}%` }} />
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Recent Statement</h4>
                <p className="text-purple-100 text-sm italic">"{profile.recentStatement}"</p>
                <p className="text-purple-300 text-xs mt-1">{profile.lastActivity}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold text-sm mb-2">Key Issues</h4>
                <div className="flex flex-wrap gap-1">
                  {profile.keyIssues.slice(0, 3).map((issue, issueIndex) => (
                    <Badge key={issueIndex} variant="outline" className="text-xs text-purple-200 border-purple-500/30">
                      {issue}
                    </Badge>
                  ))}
                  {profile.keyIssues.length > 3 && (
                    <Badge variant="outline" className="text-xs text-purple-200 border-purple-500/30">
                      +{profile.keyIssues.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-purple-500/20">
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Trending: {profile.trendingScore}%
                  </span>
                  <span>Updated: {profile.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Profiles Found</h3>
            <p className="text-purple-200">Try adjusting your search criteria or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Also export as GlobalPoliticalSignals for backward compatibility
export { EcologyVoices as GlobalPoliticalSignals }
