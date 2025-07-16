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
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Vector Search */}
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
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Political Risk Heatmap */}
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
                </div>
              </CardContent>
            </Card>
          </Link>

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
                </div>
              </CardContent>
            </Card>
          </Link>

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
                </div>
              </CardContent>
            </Card>
          </Link>

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
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Regulatory Insights */}
          <Link href="/insights">
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
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Compare Mode */}
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
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
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
}
