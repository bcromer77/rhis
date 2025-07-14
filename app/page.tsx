"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, TrendingUp, Shield, Users, Map, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedSector, setSelectedSector] = useState("")

  const countries = ["United States", "India", "China", "Brazil", "Nigeria", "Germany", "Japan"]
  const sectors = ["Technology", "Healthcare", "Energy", "Finance", "Manufacturing", "Agriculture"]

  const handleVectorSearch = () => {
    if (selectedCountry && selectedSector) {
      router.push(
        `/dashboard?country=${encodeURIComponent(selectedCountry)}&sector=${encodeURIComponent(selectedSector)}`,
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-4">RHIS PRISM</h1>
          <p className="text-xl text-slate-600 mb-8">
            Regulatory & Health Intelligence System - Political Risk Intelligence & Strategic Monitoring
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2 bg-blue-100 text-blue-800">
            Advanced Risk Intelligence Platform
          </Badge>
        </div>

        {/* Country & Sector Selection */}
        <Card className="mb-8 bg-white border-slate-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-slate-800">Select Your Focus Area</CardTitle>
            <CardDescription className="text-slate-600">
              Choose a country and sector to access Vector Search
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white text-slate-800 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sector</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white text-slate-800 border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select Sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              onClick={handleVectorSearch}
              disabled={!selectedCountry || !selectedSector}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Search className="mr-2 h-4 w-4" />
              Access Vector Search Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/political-risk-heatmap")}
          >
            <CardHeader>
              <Shield className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-slate-800">Political Risk Heatmap</CardTitle>
              <CardDescription className="text-slate-600">
                Enhanced political risk analysis with activist monitoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/global-signals")}
          >
            <CardHeader>
              <Users className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle className="text-slate-800">Ecology Voices</CardTitle>
              <CardDescription className="text-slate-600">
                Global political profiles and activist intelligence
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/geo-map")}
          >
            <CardHeader>
              <Map className="h-8 w-8 text-cyan-600 mb-2" />
              <CardTitle className="text-slate-800">GeoTemporal Map</CardTitle>
              <CardDescription className="text-slate-600">
                Interactive risk mapping with temporal analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/heatmap")}
          >
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle className="text-slate-800">Regulatory Heatmap</CardTitle>
              <CardDescription className="text-slate-600">Real-time regulatory change monitoring</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/insights")}
          >
            <CardHeader>
              <Globe className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle className="text-slate-800">Global Insights</CardTitle>
              <CardDescription className="text-slate-600">Comprehensive regulatory intelligence</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/unified-dashboard")}
          >
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle className="text-slate-800">Unified Dashboard</CardTitle>
              <CardDescription className="text-slate-600">Complete risk intelligence overview</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105"
            onClick={() => router.push("/risk-heatmap")}
          >
            <CardHeader>
              <Shield className="h-8 w-8 text-pink-600 mb-2" />
              <CardTitle className="text-slate-800">Risk Analysis</CardTitle>
              <CardDescription className="text-slate-600">Advanced risk assessment tools</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-600">
          <p>© 2024 RHIS PRISM - Advanced Political Risk Intelligence Platform</p>
        </div>
      </div>
    </div>
  )
}
