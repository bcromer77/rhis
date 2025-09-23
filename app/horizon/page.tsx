"use client";

import { useEffect, useState } from "react";

export default function HorizonPage() {
  const [query, setQuery] = useState("Mexico lithium mining law");
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const data = await res.json();
      setCards(data);
    } catch (err: any) {
      console.error("❌ Search error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Run a default search on page load
  useEffect(() => {
    runSearch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">PRISM Horizon</h1>

      {/* Search box */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g., 'Mexico lithium mining law'"
          className="flex-1 p-3 rounded-lg border border-gray-600 bg-gray-800 text-white"
        />
        <button
          onClick={runSearch}
          disabled={loading}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-400 mb-6">Error: {error}</p>}

      {/* Crisis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.length === 0 && !loading && !error && (
          <p className="text-gray-400">No results yet. Try a search above.</p>
        )}
        {cards.map((card) => (
          <div
            key={card._id || card.id}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-xl mb-2">{card.signal}</h3>
            <p className="text-gray-300 text-sm mb-2">
              {card.why_traders_care}
            </p>
            <p className="text-amber-400 text-sm mb-4 italic">
              {card.platform_pitch}
            </p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{card.country || "Unknown"}</span>
              <span>
                Urgency:{" "}
                {typeof card.urgency === "number"
                  ? card.urgency.toFixed(1)
                  : "N/A"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

