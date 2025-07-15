"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { legalSearchMockData } from "./legalSearchMockData"

export default function LegalVectorSearchBar() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState("")

  const handleSearch = () => {
    const match = legalSearchMockData.find(item =>
      item.query.toLowerCase().includes(query.toLowerCase())
    )
    setResult(match ? match.result : "No relevant legal vector found.")
  }

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4">🔎 Legal Intelligence Vector Search</h2>
      <div className="flex gap-2">
        <Input
          placeholder="e.g. Tamil Nadu port expansion"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {result && (
        <div className="mt-4 p-4 bg-slate-100 rounded-lg border border-slate-300">
          <p className="text-sm text-slate-800">{result}</p>
        </div>
      )}
    </div>
  )
}

