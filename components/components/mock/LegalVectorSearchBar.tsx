"use client";

import { useState } from "react";

export default function LegalVectorSearchBar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const mockResponses: Record<string, string> = {
    "sinaloa":
      "⚠️ Wind farm expansion in Mayo-Yoreme territory flagged by La Voz de los Pueblos. Legal breach: Article 2. FPIC bypassed.",
    "tamil nadu":
      "🛑 Radio Tirunelveli warns on port development near tribal zones without public consultation. Judicial notice filed.",
    "quebec":
      "📻 CBC North: Innu leaders claim duty-to-consult violations on hydro lines. Possible injunction pending.",
    "andhra pradesh":
      "📡 AIR Visakhapatnam reports electoral unrest over land transfer acts. FPIC risk and tribal protest escalation expected.",
  };

  const handleSearch = () => {
    const lower = query.trim().toLowerCase();
    setResult(mockResponses[lower] || "No flagged alerts or FPIC issues found.");
  };

  return (
    <div className="bg-white border border-slate-300 p-4 mb-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-slate-700">Legal Risk Lookup (Mock)</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search e.g. Sinaloa, Tamil Nadu, Quebec..."
          className="flex-grow px-3 py-2 border border-slate-300 rounded-md shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      {result && (
        <div className="mt-4 text-sm text-slate-800 bg-slate-100 border border-slate-200 p-3 rounded-md">
          {result}
        </div>
      )}
    </div>
  );
}

