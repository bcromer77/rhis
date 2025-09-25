"use client";

import { useState } from "react";
import CrisisCard from "@/components/regulatory-card";
import { mockResults } from "@/lib/mock-results";

// Flatten all mock results into one demo array
const demoCrisisCards = [
  ...mockResults.nike,
  ...mockResults.paramount,
  ...mockResults.mexico,
  ...mockResults.taiwan,
  ...mockResults.russia,
  ...mockResults.water,
];

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(demoCrisisCards);

  const handleSearch = () => {
    const q = query.toLowerCase().trim();
    const filtered = demoCrisisCards.filter(
      (card) =>
        card.company.toLowerCase().includes(q) ||
        card.signal.toLowerCase().includes(q) ||
        card.country.toLowerCase().includes(q)
    );
    setResults(filtered.length > 0 ? filtered : []);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-bold mb-4">PRISM Intelligence — Crisis Radar</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Try 'Mexico', 'Taiwan', 'Nike', 'Paramount'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {results.length === 0 ? (
        <p className="text-slate-600">
          🔍 No results — try searching for "Nike", "Mexico", "Taiwan", or "Russia"
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((card, index) => (
            <CrisisCard key={card._id} {...card} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
