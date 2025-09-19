"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// 🎯 Landing Page / Feature Grid
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-600 to-purple-700">
      {/* Header / Hero Section */}
      <header className="py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">RHIS PRISM</h1>
        <p className="text-xl mb-6">
          Regulatory & Human Intelligence Surveillance Platform
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <span className="bg-white text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
            Real-time Monitoring
          </span>
          <span className="bg-white text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
            ESG Risk Analysis
          </span>
          <span className="bg-white text-indigo-700 px-4 py-1 rounded-full text-sm font-medium">
            Political Intelligence
          </span>
        </div>
      </header>

      {/* Feature Grid */}
      <main className="flex-grow bg-gray-50 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Unified Dashboard */}
          <Link href="/dashboard">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                  Unified Dashboard
                </h2>
                <p className="text-sm text-gray-600 mb-3">
                  Comprehensive regulatory monitoring and risk assessment
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Real-time
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Multi-source
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Vector Search */}
          <Link href="/vector-search">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Vector Search</h2>
                <p className="text-sm text-gray-600 mb-3">
                  AI-powered semantic search across regulatory documents
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    AI-Powered
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Semantic
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Political Risk Heatmap */}
          <Link href="/political-risk">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Political Risk Heatmap</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Geographic visualization of political and regulatory risks
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Geographic
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Risk Analysis
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Global Political Signals */}
          <Link href="/political-signals">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Global Political Signals</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Worldwide political intelligence and trend analysis
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Global
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Intelligence
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Legal Risk Intelligence */}
          <Link href="/legal-risk">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Legal Risk Intelligence</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Treaty violations, ISDS triggers, and compliance monitoring
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Legal
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Compliance
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Geo-Temporal Risk Map */}
          <Link href="/geo-temporal-risk">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Geo-Temporal Risk Map</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Time-based geographic risk analysis and forecasting
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Temporal
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Forecasting
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* ESG Risk Heatmap */}
          <Link href="/esg-risk">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">ESG Risk Heatmap</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Environmental, social, and governance risk visualization
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    ESG
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Visualization
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Regulatory Insights */}
          <Link href="/insights">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Regulatory Insights</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Deep analysis and insights from regulatory data
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Analytics
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Insights
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Compare Mode */}
          <Link href="/compare">
            <Card className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-2">Compare Mode</h2>
                <p className="text-sm text-gray-600 mb-3">
                  Side-by-side comparison of regulatory environments
                </p>
                <div className="flex gap-2 flex-wrap">
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Comparison
                  </span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                    Analysis
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-10 mt-12 text-center">
        <h2 className="text-lg font-bold mb-2">RHIS PRISM</h2>
        <p className="text-sm mb-4">
          Advanced regulatory intelligence and risk monitoring platform
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">
            Enterprise Ready
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">
            Real-time Data
          </span>
          <span className="bg-gray-800 px-3 py-1 rounded-full text-xs">
            Global Coverage
          </span>
        </div>
      </footer>
    </div>
  )
}
