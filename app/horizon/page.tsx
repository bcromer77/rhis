"use client";

import { useState } from "react";

type Classification = {
  id: string;
  bucket: "opportunities" | "risks";
  wind: "tailwinds" | "headwinds";
  sentiment: number;
};

export default function HorizonPage() {
  const [query, setQuery] = useState("Lithium");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  async function runSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/headline-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline: query }),
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("❌ search error:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-black text-white p-8">
      <h1 className="text-4xl font-bold mb-6">PRISM Horizon</h1>

      {/* Search Controls */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Paste a headline or type a keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {/* Loading / Error States */}
      {loading && <p className="italic text-gray-400">Crunching signals…</p>}
      {!loading && data && !data.ok && (
        <p className="text-red-400">Error: {data.error}</p>
      )}

      {/* Results */}
      {data && data.ok && (
        <div className="space-y-8">
          {/* Storyboard */}
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <p className="text-gray-300 mb-4">{data.storyboard.tldr}</p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded">
                Opps: {data.classifications.filter((c: Classification) => c.bucket === "opportunities").length}
              </span>
              <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded">
                Risks: {data.classifications.filter((c: Classification) => c.bucket === "risks").length}
              </span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded">
                Sentiment: {data.storyboard.sentiment_label || "Neutral"}
              </span>
            </div>
          </div>

          {/* Crisis Cards */}
          <div>
            <h2 className="text-xl font-bold mb-4">Signals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.docs.map((d: any, i: number) => {
                const cls = data.classifications.find((c: any) => c.id === String(i));
                return (
                  <div
                    key={i}
                    className={`bg-gray-900 border border-gray-700 border-l-4 rounded-xl p-6 shadow-lg ${
                      cls?.bucket === "opportunities"
                        ? "border-l-green-500"
                        : "border-l-red-500"
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{d.signal || "Untitled"}</h3>
                    <p className="text-gray-400 text-sm mb-3">{d.why_traders_care}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{d.country || "Global"}</span>
                      <span>
                        Sentiment:{" "}
                        <span
                          className={
                            cls?.sentiment > 0
                              ? "text-green-400"
                              : cls?.sentiment < 0
                              ? "text-red-400"
                              : "text-yellow-400"
                          }
                        >
                          {cls?.sentiment?.toFixed(1)}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Second Order Plays */}
          {data.storyboard.second_order && (
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Second-Order Plays</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {(data.storyboard.second_order || []).map(
                  (p: any, i: number) => (
                    <li
                      key={i}
                      className="px-3 py-2 bg-purple-500/20 text-purple-200 rounded text-sm"
                    >
                      {p.entity}: {p.why}
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

