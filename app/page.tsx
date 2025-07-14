import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Globe, TrendingUp, AlertTriangle, Search, BarChart3, Map, GitCompare, Scale } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">RHIS PRISM</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Regulatory & Human Intelligence Surveillance Platform
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Real-time Monitoring
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                ESG Risk Analysis
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
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
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  <CardTitle>Unified Dashboard</CardTitle>
                </div>
                <CardDescription>Comprehensive regulatory monitoring and risk assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Real-time</Badge>
                  <Badge variant="outline">Multi-source</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Vector Search */}
          <Link href="/dashboard">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Search className="h-6 w-6 text-green-600" />
                  <CardTitle>Vector Search</CardTitle>
                </div>
                <CardDescription>AI-powered semantic search across regulatory documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">AI-Powered</Badge>
                  <Badge variant="outline">Semantic</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Political Risk Heatmap */}
          <Link href="/political-risk-heatmap">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                  <CardTitle>Political Risk Heatmap</CardTitle>
                </div>
                <CardDescription>Geographic visualization of political and regulatory risks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Geographic</Badge>
                  <Badge variant="outline">Risk Analysis</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Global Signals */}
          <Link href="/global-signals">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-purple-600" />
                  <CardTitle>Global Political Signals</CardTitle>
                </div>
                <CardDescription>Worldwide political intelligence and trend analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Global</Badge>
                  <Badge variant="outline">Intelligence</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Legal Risks */}
          <Link href="/legal-risks">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-amber-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Scale className="h-6 w-6 text-amber-600" />
                  <CardTitle>Legal Risk Intelligence</CardTitle>
                </div>
                <CardDescription>Treaty violations, ISDS triggers, and compliance monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Legal</Badge>
                  <Badge variant="outline">Compliance</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Geo-Temporal Map */}
          <Link href="/geo-map">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-indigo-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Map className="h-6 w-6 text-indigo-600" />
                  <CardTitle>Geo-Temporal Risk Map</CardTitle>
                </div>
                <CardDescription>Time-based geographic risk analysis and forecasting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Temporal</Badge>
                  <Badge variant="outline">Forecasting</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Risk Heatmap */}
          <Link href="/risk-heatmap">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  <CardTitle>ESG Risk Heatmap</CardTitle>
                </div>
                <CardDescription>Environmental, social, and governance risk visualization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">ESG</Badge>
                  <Badge variant="outline">Visualization</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Regulatory Insights */}
          <Link href="/insights">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-teal-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-6 w-6 text-teal-600" />
                  <CardTitle>Regulatory Insights</CardTitle>
                </div>
                <CardDescription>Deep analysis and insights from regulatory data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Analytics</Badge>
                  <Badge variant="outline">Insights</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Compare Mode */}
          <Link href="/compare-mode">
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-cyan-500">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <GitCompare className="h-6 w-6 text-cyan-600" />
                  <CardTitle>Compare Mode</CardTitle>
                </div>
                <CardDescription>Side-by-side comparison of regulatory environments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Comparison</Badge>
                  <Badge variant="outline">Analysis</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">RHIS PRISM</h3>
            <p className="text-gray-400 mb-4">Advanced regulatory intelligence and risk monitoring platform</p>
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
  )
}
