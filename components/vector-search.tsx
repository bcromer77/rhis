"use client"
import { useState } from "react"
import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Search, TrendingUp } from "lucide-react"
import { useVectorSearch } from "@/hooks/use-vector-search"

interface VectorSearchProps {
  country?: string
  sector?: string
}

export function VectorSearch({ country, sector }: VectorSearchProps) {
  const [query, setQuery] = useState("")
  const [filters, setFilters] = useState({
    country,
    sector,
    topic: "",
    riskLevel: "",
    limit: 10,
  })

  const { results, loading, error, search } = useVectorSearch()

  const handleSearch = () => {
    search(query, filters)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <Card className="bg-white border-slate-200">
        <CardContent className="p-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search regulations, policies, or ask questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <select
              value={filters.topic}
              onChange={(e) => setFilters((prev) => ({ ...prev, topic: e.target.value }))}
              className="px-3 py-1 border border-slate-200 rounded text-sm"
            >
              <option value="">All Topics</option>
              <option value="Environmental">Environmental</option>
              <option value="Safety">Safety</option>
              <option value="Taxation">Taxation</option>
              <option value="Export">Export</option>
              <option value="Labor">Labor</option>
              <option value="Indigenous Rights">Indigenous Rights</option>
            </select>

            <select
              value={filters.riskLevel}
              onChange={(e) => setFilters((prev) => ({ ...prev, riskLevel: e.target.value }))}
              className="px-3 py-1 border border-slate-200 rounded text-sm"
            >
              <option value="">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>

            <select
              value={filters.limit}
              onChange={(e) => setFilters((prev) => ({ ...prev, limit: Number.parseInt(e.target.value) }))}
              className="px-3 py-1 border border-slate-200 rounded text-sm"
            >
              <option value="10">10 Results</option>
              <option value="25">25 Results</option>
              <option value="50">50 Results</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <p className="text-red-700">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Search Results ({results.length})
          </h3>

          {results.map((result, index) => (
            <motion.div
              key={result._id?.toString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            result.riskLevel === "high"
                              ? "bg-red-100 text-red-700"
                              : result.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {result.riskLevel} risk
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                          {result.country}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                          {result.topic}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-800 mb-2">{result.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed mb-2">
                        {result.content.substring(0, 200)}...
                      </p>
                      <div className="text-xs text-slate-500">
                        Source: {result.source} • {result.publishedDate.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm font-semibold text-slate-800">{Math.round(result.relevance)}% match</div>
                      <div className="text-xs text-slate-500">Score: {result.score.toFixed(3)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {query && results.length === 0 && !loading && !error && (
        <Card className="bg-slate-50 border-slate-200">
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600">No results found for "{query}"</p>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
