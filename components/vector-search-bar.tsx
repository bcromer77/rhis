"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

const mockResults = {
  "sinaloa": [
    "⚠️ Sinaloa: Wind turbine expansion bypassed Mayo community consultation — Article 2 breach risk",
    "📡 La Voz de los Pueblos aired warnings over regulatory violations and Indigenous sovereignty"
  ],
  "tamil nadu": [
    "🚧 Tamil Nadu: Proposed land reforms near Kattupalli port may violate tribal land rights",
    "🔍 Legal risk flagged: Environmental clearance pending — active protest reported in Tiruvallur"
  ],
  "manipur": [
    "📍 Manipur: Armed land disputes escalate in hill districts, overlapping with steel corridor zone",
    "⚖️ FPIC and electoral instability noted in recent parliamentary transcripts"
  ]
};

export default function VectorSearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])

  const handleSearch = () => {
    const key = query.toLowerCase().trim()
    if (mockResults[key]) {
      setResults(mockResults[key])
    } else {
      setResults(["🔍 No mock results found — try Sinaloa, Tamil Nadu, or Manipur"])
    }
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Search Emerging Legal Signals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="e.g. Sinaloa, Tamil Nadu, Manipur"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <div className="space-y-2">
          {results.map((result, idx) => (
            <div key={idx} className="bg-slate-100 p-3 rounded shadow-sm">{result}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

