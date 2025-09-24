"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, AlertTriangle, TrendingUp, Globe, Users } from "lucide-react"
import { useVectorSearch } from "@/hooks/use-vector-search"

export function VectorSearch() {
  const searchParams = useSearchParams()
  const country = searchParams?.get("country") || ""
  const sector = searchParams?.get("sector") || ""

  const [query, setQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const { results, isLoading, search, suggestions } = useVectorSearch()

  const smartSuggestions = [
    "Political instability risks in energy sector",
    "Regulatory changes affecting healthcare",
    "Environmental activism impact on mining",
    "Trade policy effects on technology",
    "Labor disputes in manufacturing",
    "Currency volatility in emerging markets",
  ]

  const filterOptions = [
    "High Risk",
    "Medium Risk",
    "Low Risk",
    "Political",
    "Economic",
    "Environmental",
    "Recent",
    "Trending",
    "Critical",
  ]

  const handleSearch = () => {
    if (query.trim()) {
      search(query, { country, sector, filters: selectedFilters })
    }
  }

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    )
  }

  return (
    <div className="space-y-6">
      {/* Context Header */}
      <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Search Context: {country} - {sector}
          </CardTitle>
          <CardDescription className="text-purple-200">
            AI-powered vector search for regulatory and political risk intelligence
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search Interface */}
      <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <Input
              placeholder="Enter your search query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-white/20 text-white placeholder:text-purple-200 border-purple-500/30"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Smart Suggestions */}
          <div className="mb-4">
            <p className="text-sm text-purple-200 mb-2">Smart Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {smartSuggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-600/20 text-purple-200 border-purple-500/30"
                  onClick={() => setQuery(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div>
            <p className="text-sm text-purple-200 mb-2 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters:
            </p>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((filter) => (
                <Badge
                  key={filter}
                  variant={selectedFilters.includes(filter) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedFilters.includes(filter)
                      ? "bg-purple-600 text-white"
                      : "text-purple-200 border-purple-500/30 hover:bg-purple-600/20"
                  }`}
                  onClick={() => toggleFilter(filter)}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert System */}
      <Card className="bg-red-500/10 backdrop-blur-sm border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Active Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-red-500/20 rounded-lg">
              <span className="text-red-200">High political tension detected in {country}</span>
              <Badge variant="destructive">Critical</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/20 rounded-lg">
              <span className="text-yellow-200">Regulatory changes pending in {sector}</span>
              <Badge className="bg-yellow-600">Medium</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Search Results ({results.length})
          </h3>
          {results.map((result, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-purple-500/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{result.title}</CardTitle>
                    <CardDescription className="text-purple-200">{result.source}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      result.riskLevel === "High"
                        ? "destructive"
                        : result.riskLevel === "Medium"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {result.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-100 mb-3">{result.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {result.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-purple-200 border-purple-500/30"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-sm text-purple-300">
                    Relevance: {result.relevanceScore}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results State */}
      {!isLoading && results.length === 0 && query && (
        <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20">
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Results Found</h3>
            <p className="text-purple-200">Try adjusting your search query or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
