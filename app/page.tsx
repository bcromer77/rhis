// app/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

// Teaser results with Polaroid-style colored themes
const teaserResults = [
  {
    title: "Taiwan Semiconductor Supply Chain Risk",
    category: "Geopolitical",
    impact: "Critical",
    preview: "Escalation over Taiwan raises risks for semiconductor supply chains...",
    date: "2025-09-27",
    locked: false,
    borderColor: "border-l-red-500", // Red Polaroid frame
    bgColor: "bg-red-50",
    tags: ["Real-time", "Supply Chain"]
  },
  {
    title: "EU Grain Export Disruption Analysis", 
    category: "Trade Intelligence",
    impact: "Warning",
    preview: "Attacks disrupt Ukrainian and Romanian export flows...",
    date: "2025-09-26", 
    locked: false,
    borderColor: "border-l-blue-500", // Blue Polaroid frame
    bgColor: "bg-blue-50",
    tags: ["AI-Powered", "Trade Risk"]
  },
  {
    title: "Mexico Lithium Nationalization Impact",
    category: "ESG Monitoring", 
    impact: "Critical",
    preview: "Mexico halts new lithium concessions, expands LitioMx's monopoly...",
    date: "2025-09-25",
    locked: true,
    borderColor: "border-l-green-500", // Green Polaroid frame  
    bgColor: "bg-green-50",
    tags: ["Geographic", "ESG Analysis"]
  },
  {
    title: "Advanced Risk Heatmaps Available",
    category: "Premium Intelligence",
    impact: "Unlock", 
    preview: "Get full market impact analysis, winner/loser breakdowns, and real-time alerts...",
    date: "Sign up",
    locked: true,
    borderColor: "border-l-orange-500", // Orange Polaroid frame
    bgColor: "bg-orange-50", 
    tags: ["Global", "Intelligence"]
  },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(e.target.value || "regulatory risks");
    setShowResults(true);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your full-stack platform for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                regulatory intelligence
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              PRISM is the largest ecosystem where analysts build, deploy, and publish 
              regulatory intelligence, ESG monitoring, and geopolitical risk tools. 
              We call them Crisis Radars.
            </p>

            {/* Teaser Search Bar */}
            <div className="mx-auto mt-10 max-w-2xl">
              <form onSubmit={handleSearch} className="flex gap-x-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Try 'Taiwan', 'ESG activism', 'lithium supply'..."
                  className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-gray-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Polaroid Cards Results Section */}
      {showResults && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              Crisis Intelligence Preview
            </h2>
            <p className="mt-2 text-gray-600">
              Here's what PRISM found for "{searchQuery}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {teaserResults.map((result, index) => (
              <div
                key={index}
                className={`relative rounded-lg border-l-4 ${result.borderColor} bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-200 ${
                  result.locked ? 'opacity-75' : 'hover:-translate-y-1'
                }`}
                style={{
                  background: result.locked 
                    ? `linear-gradient(135deg, ${result.bgColor.replace('bg-', '').replace('-50', '')}-50 0%, white 100%)`
                    : 'white'
                }}
              >
                {result.locked && (
                  <div className="absolute top-4 right-4">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Polaroid-style header with icon */}
                <div className="flex items-center mb-4">
                  <div className={`h-8 w-8 rounded ${result.bgColor} flex items-center justify-center mr-3`}>
                    {result.category.includes('Geopolitical') && (
                      <svg className="h-4 w-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM18.894 17.834a.75.75 0 00-1.06 1.06l-1.591-1.59a.75.75 0 111.06-1.061l1.591 1.59zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM5.106 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 10-1.06-1.061l-1.591 1.59zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM5.106 6.166a.75.75 0 001.06-1.06l1.591 1.59a.75.75 0 11-1.06 1.061L5.106 6.166z" clipRule="evenodd" />
                      </svg>
                    )}
                    {result.category.includes('Trade') && (
                      <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    {result.category.includes('ESG') && (
                      <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" clipRule="evenodd" />
                      </svg>
                    )}
                    {result.category.includes('Premium') && (
                      <svg className="h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    )}
                  </div>
                  <h4 className="text-sm font-medium text-gray-900">{result.category}</h4>
                </div>

                <h3 className={`text-lg font-semibold mb-3 ${result.locked ? 'text-gray-600' : 'text-gray-900'}`}>
                  {result.title}
                </h3>
                
                <p className={`text-sm mb-4 ${result.locked ? 'text-gray-500' : 'text-gray-600'}`}>
                  {result.locked ? (
                    <>
                      {result.preview.substring(0, 50)}...{" "}
                      <span className="font-medium text-blue-600">Sign up to read more</span>
                    </>
                  ) : (
                    result.preview
                  )}
                </p>

                {/* Polaroid-style tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {result.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{result.date}</span>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    result.impact === 'Critical' 
                      ? 'bg-red-100 text-red-800'
                      : result.impact === 'Warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : result.impact === 'Unlock'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {result.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="rounded-lg bg-gray-50 px-6 py-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to see the full intelligence feed?
              </h3>
              <p className="text-gray-600 mb-6">
                Get access to complete risk analysis, market impact breakdowns, winner/loser identification, and real-time alerts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
                >
                  Start free trial
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Preview (when no search yet) */}
      {!showResults && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Polaroid-style feature cards */}
            <div className="border-l-4 border-l-blue-500 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded bg-blue-50 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3s-4.5 4.03-4.5 9 2.015 9 4.5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Geopolitical Risk</h3>
              <p className="text-sm text-gray-600 mb-4">
                Track Taiwan tensions, trade wars, and supply chain disruptions before they hit headlines.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                  Real-time
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                  Global
                </span>
              </div>
            </div>

            <div className="border-l-4 border-l-green-500 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded bg-green-50 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ESG & Activism</h3>
              <p className="text-sm text-gray-600 mb-4">
                Monitor environmental campaigns, labor disputes, and regulatory changes affecting your portfolio.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  ESG Analysis
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  Compliance
                </span>
              </div>
            </div>

            <div className="border-l-4 border-l-red-500 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded bg-red-50 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Market Impact</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get clear winner/loser analysis and quantified risk assessments for every crisis.
              </p>
              <div className="flex gap-2">
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                  Risk Analysis
                </span>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                  Intelligence
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
