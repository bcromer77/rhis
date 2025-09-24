"use client";

import { useState } from "react";
import Link from "next/link";

type CrisisCard = {
  id: string;
  company: string;
  title: string;
  severity: "CRITICAL" | "WARNING" | "CAUTION";
  description: string;
  source: string;
};

const demoCards: CrisisCard[] = [
  {
    id: "1",
    company: "Sarepta Therapeutics",
    title: "FDA Clinical Hold",
    severity: "CRITICAL",
    description: "FDA places clinical hold on SRP-9001 trial (DMD gene therapy).",
    source: "FDA Docket 2025-134"
  },
  {
    id: "2",
    company: "MP Materials",
    title: "Rare Earth Expansion",
    severity: "WARNING",
    description: "Expansion in Nevada faces scrutiny over tribal water rights.",
    source: "Nevada Council Minutes"
  },
  {
    id: "3",
    company: "Meta",
    title: "New Mexico Data Center",
    severity: "CRITICAL",
    description: "Tribal council challenges water allocations under Colorado Compact.",
    source: "Ute Mountain Council Record"
  },
  {
    id: "4",
    company: "De Beers",
    title: "Ownership Battle",
    severity: "CAUTION",
    description: "Botswana vs Angola fight could delay diamond/water rights permits.",
    source: "Reuters / Botswana Gazette"
  },
];

export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CrisisCard[]>(demoCards);
  const [loading, setLoading] = useState(false);

  async function runSearch() {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/headline-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ headline: query }),
      });
      const data = await res.json();
      // for now just fallback to demo cards if no docs
      setResults(data.docs?.length ? data.docs : demoCards);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-black text-white">
      {/* Hero */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          Before it’s news, it’s a signal.
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Type a ticker → see the risks no one else sees. Powered by MongoDB Atlas Vector Search.
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex max-w-xl mx-auto shadow rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Try: Sarepta, Meta, Micron, De Beers..."
            className="flex-grow px-4 py-3 text-black focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={runSearch}
            disabled={loading}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 font-semibold text-black"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Subscribe CTA */}
        <div className="mt-6">
          <Link
            href="/subscribe"
            className="text-amber-400 font-semibold hover:underline"
          >
            Subscribe for Crisis Alerts →
          </Link>
        </div>
      </section>

      {/* Crisis Cards Wall */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((card) => (
            <div
              key={card.id}
              className={`p-6 rounded-xl shadow-lg border-l-4 ${
                card.severity === "CRITICAL"
                  ? "border-red-500 bg-red-500/10"
                  : card.severity === "WARNING"
                  ? "border-yellow-500 bg-yellow-500/10"
                  : "border-amber-400 bg-amber-500/10"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{card.company}</h3>
              <p className="font-semibold mb-1">{card.title}</p>
              <p className="text-gray-300 mb-3">{card.description}</p>
              <p className="text-xs text-gray-400">Source: {card.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mini Map Widget */}
      <section className="bg-slate-800 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Signals Across the Globe</h2>
          <p className="text-gray-400 mb-8">
            From DRC cobalt to New Mexico water rights, PRISM captures risks in
            every jurisdiction.
          </p>
          <div className="w-full h-64 bg-slate-700 rounded-lg flex items-center justify-center text-gray-400">
            🌍 [Mini Global Map Placeholder]
          </div>
        </div>
      </section>

      {/* Features Behind the Demo */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Feature
          title="Vector Search"
          desc="Unify treaties, transcripts, and council minutes into a single searchable risk fabric."
        />
        <Feature
          title="Legal Risk Intelligence"
          desc="FPIC, ISDS, and treaty violation monitoring — grounded in filings, not headlines."
        />
        <Feature
          title="Global Signals"
          desc="Political and ESG risks from 20+ countries, surfaced before markets react."
        />
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-700 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2 text-amber-400">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </div>
  );
}

