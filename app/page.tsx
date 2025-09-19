<<<<<<< HEAD
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
=======
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Globe, TrendingUp, AlertTriangle, Search, BarChart3, Map, GitCompare, Scale } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
        <div className="absolute inset-0 bg-gray-800/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">RHIS PRISM</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Regulatory & Human Intelligence Surveillance Platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-blue-100 text-blue-500 border-blue-200">
                Real-time Monitoring
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-500 border-blue-200">
                ESG Risk Analysis
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-500 border-blue-200">
                Political Intelligence
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Unified Dashboard */}
          <Link href="/unified-dashboard">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-emerald-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-emerald-500" />
                  <CardTitle className="text-gray-800">Unified Dashboard</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Comprehensive regulatory monitoring and risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Real-time</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Multi-source</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Vector Search */}
<<<<<<< HEAD
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
=======
          <Link href="/dashboard">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Search className="h-6 w-6 text-blue-500" />
                  <CardTitle className="text-gray-800">Vector Search</CardTitle>
                </div>
                <CardDescription className="text-gray-600">AI-powered semantic search across regulatory documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Semantic</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">AI-Powered</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Political Risk Heatmap */}
<<<<<<< HEAD
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
=======
          <Link href="/political-risk-heatmap">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-red-500" />
                  <CardTitle className="text-gray-800">Political Risk Heatmap</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Geographic visualization of political and regulatory risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Geographic</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Risk Analysis</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

<<<<<<< HEAD
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
=======
          {/* Global Signals */}
          <Link href="/global-signals">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-amber-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-amber-500" />
                  <CardTitle className="text-gray-800">Global Political Signals</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Worldwide political intelligence and trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Global</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Intelligence</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

<<<<<<< HEAD
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
=======
          {/* Legal Risks */}
          <Link href="/legal-risks">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-indigo-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Scale className="h-6 w-6 text-indigo-500" />
                  <CardTitle className="text-gray-800">Legal Risk Intelligence</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Treaty violations, ISDS triggers, and compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Legal</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Compliance</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

<<<<<<< HEAD
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
=======
          {/* Indigenous Broadcasting News */}
          <Link href="/indigenous-news">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-600 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Map className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-gray-800">Indigenous Broadcasting News</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Community alerts, FPIC violations, and live grievance tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">FPIC Risk</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Electoral Instability</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Live Feeds</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Regulatory Insights */}
          <Link href="/insights">
<<<<<<< HEAD
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
=======
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-teal-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-teal-500" />
                  <CardTitle className="text-gray-800">Regulatory Insights</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Deep analysis and insights from regulatory data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Analytics</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Insights</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Compare Mode */}
<<<<<<< HEAD
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
=======
          <Link href="/compare-mode">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-cyan-500 bg-gray-50">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <GitCompare className="h-6 w-6 text-cyan-500" />
                  <CardTitle className="text-gray-800">Compare Mode</CardTitle>
                </div>
                <CardDescription className="text-gray-600">Side-by-side comparison of regulatory environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Comparison</Badge>
                  <Badge variant="outline" className="border-blue-200 text-blue-500">Analysis</Badge>
>>>>>>> origin/main
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
<<<<<<< HEAD
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
=======
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">RHIS PRISM</h3>
            <p className="text-gray-300 mb-4">Advanced regulatory intelligence and risk monitoring platform</p>
            <div className="flex justify-center space-x-6">
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Enterprise Ready
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Real-time Data
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Global Coverage
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
>>>>>>> origin/main
}
