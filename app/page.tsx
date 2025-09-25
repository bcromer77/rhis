"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Globe,
  Briefcase,
  Activity,
  Users,
  TrendingUp,
  Loader2,
  TrendingDown,
  TrendingUp as TrendingUpIcon,
} from "lucide-react";
import { GeoHeadlineChart } from "@/components/ui/chart";

// Crisis Card Type (matches your backend)
type CrisisCard = {
  _id: string;
  company: string;
  signal: string;
  description: string;
  why_traders_care?: string;
  commodity?: string[];
  tickers?: string[];
  country?: string;
  sentiment?: number;
  severity?: "CRITICAL" | "WARNING" | "OPPORTUNITY";
  source?: string;
  date?: string;
  tags?: string[];
  who_loses?: string;
  who_wins?: string;
  _score?: number;
  _mlBucket?: "risks" | "opportunities";
};

// Demo Crisis Cards (fallback data)
const demoCrisisCards: CrisisCard[] = [
  {
    _id: "demo-1",
    company: "Sarepta Therapeutics",
    signal: "FDA Clinical Hold on SRP-9001",
    description: "FDA places clinical hold on SRP-9001 trial (DMD gene therapy).",
    why_traders_care: "FDA delay hands competitors extra runway in gene therapy.",
    country: "USA",
    commodity: ["Biotech"],
    tickers: ["SRPT"],
    severity: "CRITICAL",
    sentiment: -0.7,
    who_loses: "Sarepta shareholders, DMD patients",
    who_wins: "Pfizer, PTC Therapeutics (competitors)",
    source: "FDA docket, CBER notes",
    _score: 0.95,
    date: "2024-01-15",
  },
  {
    _id: "demo-2",
    company: "MP Materials",
    signal: "Mexico Halts Lithium Concessions / China Tightens Export Bans",
    description: "Geopolitical tensions create rare earth supply constraints.",
    why_traders_care: "Supply tightening + reshoring subsidies = pricing power.",
    country: "Mexico/China",
    commodity: ["Lithium", "Rare Earth"],
    tickers: ["MP"],
    severity: "OPPORTUNITY",
    sentiment: 0.6,
    who_loses: "Apple, Tesla (higher input costs)",
    who_wins: "MP Materials (domestic alternative)",
    source: "Mexico Gazette, Chinese Ministry",
    _score: 0.92,
    date: "2024-01-10",
  },
  {
    _id: "demo-3",
    company: "Nexstar Media",
    signal: "FCC Approves Political Ad Expansion",
    description: "Regulatory approval expands political advertising opportunities.",
    why_traders_care: "Election cycle expansion = direct revenue upside.",
    country: "USA",
    commodity: ["Media"],
    tickers: ["NXST"],
    severity: "OPPORTUNITY",
    sentiment: 0.8,
    who_loses: "Local regional competitors",
    who_wins: "Nexstar (market share expansion)",
    source: "FCC filing, company PR",
    _score: 0.88,
    date: "2024-01-12",
  },
  {
    _id: "demo-4",
    company: "MongoDB",
    signal: "EU Digital Markets Act flags cloud database dependency",
    description: "DMA scrutiny creates opportunities for neutral database providers.",
    why_traders_care: "Regulatory pressure shifts enterprise contracts away from hyperscalers.",
    country: "EU",
    commodity: ["Tech"],
    tickers: ["MDB"],
    severity: "OPPORTUNITY",
    sentiment: 0.4,
    who_loses: "AWS (regulatory scrutiny)",
    who_wins: "MongoDB (neutral alternative)",
    source: "EU DMA filings",
    _score: 0.85,
    date: "2024-01-08",
  },
];

// Crisis Card Component
function CrisisCardComponent({ card }: { card: CrisisCard }) {
  const severity = card.severity || "OPPORTUNITY";
  const severityConfig = {
    CRITICAL: { color: "bg-red-100 text-red-700 border-red-500", icon: "🔴", border: "border-red-500" },
    WARNING: { color: "bg-yellow-100 text-yellow-700 border-yellow-500", icon: "🟠", border: "border-yellow-500" },
    OPPORTUNITY: { color: "bg-green-100 text-green-700 border-green-500", icon: "🟢", border: "border-green-500" }
  };

  const config = severityConfig[severity];

  return (
    <Card className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 ${config.border} bg-gradient-to-r from-white to-slate-50`}>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <div>
            <span className="text-lg font-bold text-slate-900">
              {card.company}
            </span>
            {card.tickers && card.tickers.length > 0 && (
              <div className="text-sm text-slate-600 mt-1">
                {card.tickers.map(ticker => `$${ticker}`).join(", ")}
              </div>
            )}
          </div>
          <Badge className={config.color}>
            {config.icon} {severity}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold text-slate-800 mb-3">{card.signal}</p>
        
        {card.why_traders_care && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-2 border-blue-400">
            <p className="text-sm text-blue-800">
              <strong>Why Traders Care:</strong> {card.why_traders_care}
            </p>
          </div>
        )}

        {/* Winners & Losers */}
        <div className="mb-4 space-y-2">
          <div className="flex items-start gap-2">
            <TrendingDown className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-red-600 font-semibold uppercase">Losers</span>
              <p className="text-sm text-red-700">{card.who_loses}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUpIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs text-green-600 font-semibold uppercase">Winners</span>
              <p className="text-sm text-green-700">{card.who_wins}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          {card.country && (
            <div>
              <span className="text-slate-500 font-medium">Country:</span>
              <p className="text-slate-700">{card.country}</p>
            </div>
          )}
          {card.commodity && card.commodity.length > 0 && (
            <div>
              <span className="text-slate-500 font-medium">Sector:</span>
              <p className="text-slate-700">{card.commodity.join(", ")}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center text-xs text-slate-400">
          <span>Score: {card._score?.toFixed(2) || "N/A"}</span>
          <span>{card.source}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// ✅ Only ONE default export now
export default function LandingPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CrisisCard[]>(demoCrisisCards);
  const [loading, setLoading] = useState(false);
  const [sentiment, setSentiment] = useState<number | null>(null);
  const [storyboard, setStoryboard] = useState<any>(null);

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
      
      if (data.ok && data.docs) {
        setResults(data.docs.length > 0 ? data.docs : demoCrisisCards);
        setSentiment(data.sentiment || null);
        setStoryboard(data.storyboard || null);
      } else {
        setResults(demoCrisisCards);
        setSentiment(null);
        setStoryboard(null);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setResults(demoCrisisCards);
      setSentiment(null);
      setStoryboard(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Before It's News, It's a Signal.
        </h1>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          Every risk is someone else's opportunity. See who bleeds and who benefits — instantly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">
              Try the Dashboard
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline">
              View Pricing
            </Button>
          </Link>
        </div>
      </section>

      {/* Crisis Cards Demo */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 via-slate-50 to-amber-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-4">
            🚨 Crisis Cards Recap
          </h2>
          <p className="text-center text-lg text-slate-600 max-w-2xl mx-auto mb-12">
            Instead of a sea of headlines, you see who bleeds and who benefits — instantly.
          </p>

          {/* Search Bar */}
          <div className="flex max-w-xl mx-auto shadow-md rounded-lg overflow-hidden mb-8 border border-slate-200 bg-white">
            <input
              type="text"
              placeholder="Try: Sarepta, lithium, FDA, China export..."
              className="flex-grow px-4 py-3 focus:outline-none text-slate-800"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && runSearch()}
            />
            <button
              onClick={runSearch}
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Search
                </>
              )}
            </button>
          </div>

          {/* Sentiment & Storyboard */}
          {(sentiment !== null || storyboard) && (
            <div className="text-center mb-8 space-y-4">
              {sentiment !== null && (
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  sentiment > 0.3 ? "bg-green-100 text-green-700" :
                  sentiment < -0.3 ? "bg-red-100 text-red-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  Overall Sentiment: {sentiment > 0.3 ? "🟢 Positive" : sentiment < -0.3 ? "🔴 Negative" : "🟠 Mixed"}
                  <span className="text-xs">({sentiment.toFixed(2)})</span>
                </div>
              )}
              {storyboard?.tldr && (
                <p className="text-slate-600 max-w-2xl mx-auto">{storyboard.tldr}</p>
              )}
            </div>
          )}

          {/* Crisis Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((card) => (
              <CrisisCardComponent key={card._id} card={card} />
            ))}
          </div>
        </div>
      </section>

      {/* Signals Grid */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Can Surface For You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Search className="h-6 w-6 text-blue-600" />}
              title="Biotech & Pharma"
              desc="FDA calendars, clinical trial updates, SEC filings."
            />
            <Feature
              icon={<Globe className="h-6 w-6 text-green-600" />}
              title="Council & Government"
              desc="Meeting agendas, zoning approvals, mining permits."
            />
            <Feature
              icon={<Briefcase className="h-6 w-6 text-purple-600" />}
              title="Visas & Immigration"
              desc="Policy shifts, labor restrictions, visa suspensions."
            />
            <Feature
              icon={<TrendingUp className="h-6 w-6 text-red-600" />}
              title="Commodities & Energy"
              desc="Pipeline strikes, sanctions chatter, OPEC updates."
            />
            <Feature
              icon={<Users className="h-6 w-6 text-pink-600" />}
              title="Geopolitics"
              desc="Elections, coups, unrest and sanctions worldwide."
            />
            <Feature
              icon={<Activity className="h-6 w-6 text-amber-600" />}
              title="ESG & Compliance"
              desc="CBAM, Indigenous consultations, biodiversity rules."
            />
          </div>
        </div>
      </section>

      {/* Case Studies CTA */}
      <section className="py-20 text-center bg-slate-50">
        <h2 className="text-3xl font-bold mb-4">See How Signals Move Markets</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          From Sarepta's FDA filings to ArcelorMittal's water permits — explore
          how hidden signals create outsized impact.
        </p>
        <Link href="/case-studies">
          <Button
            size="lg"
            className="bg-slate-900 text-white hover:bg-slate-800"
          >
            View Case Studies
          </Button>
        </Link>
      </section>

      {/* Pricing CTA */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Transparent Pricing</h2>
        <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
          Start free, upgrade when you're ready for unlimited insights and
          enterprise integration. No advice, just foresight.
        </p>
        <Link href="/pricing">
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-200"
          >
            View Pricing Plans
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t text-center text-slate-500 text-sm bg-slate-50">
        © {new Date().getFullYear()} RHIS — Regulatory Horizon Intelligence Signals.
      </footer>
    </div>
  );
}

// Feature Component
function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <Card className="text-center shadow-sm hover:shadow-md transition bg-white">
      <CardHeader>
        <div className="mb-2 flex justify-center">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-slate-600">{desc}</p>
      </CardContent>
    </Card>
  );
}

