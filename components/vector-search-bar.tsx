"use client";

import { useState } from "react";
import { CrisisCard } from "@/components/regulatory-card";
import { mockResults } from "@/lib/mock-results";

export default function VectorSearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = () => {
    const key = query.toLowerCase().trim();
    if (mockResults[key]) {
      setResults(mockResults[key]);
    } else {
      setResults([
        {
          _id: "none",
          company: "No Results",
          signal: "🔍 No mock results found",
          description: "Try searching: Nike, Paramount, Mexico, Taiwan, Russia, Water",
          why_traders_care: "",
          country: "",
          commodity: [],
          tickers: [],
          severity: "INFO",
          sentiment: 0,
          who_loses: "",
          who_wins: "",
          source: "Demo Engine",
          _score: 0.0,
          date: new Date().toISOString(),
        },
      ]);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Vector Search Demo</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Try 'Nike', 'Paramount', 'Mexico', 'Taiwan', 'Russia', 'Water'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        />
          Search
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {results.map((card) => (
          <CrisisCard key={card._id} {...card} />
        ))}
      </div>
    </div>
  );
}
