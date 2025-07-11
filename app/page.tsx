"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Globe, TrendingUp, Shield, Users, Map, DollarSign, BarChart3 } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">RHIS PRISM</h1>
          <p className="text-xl text-purple-200 mb-8">
            Regulatory & Health Intelligence System - Political Risk Intelligence & Strategic Monitoring
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            Advanced Risk Intelligence Platform
          </Badge>
        </div>

        {/* Country & Sector Selection */}
        <Card className="mb-8 bg-white/10 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">Select Your Focus Area</CardTitle>
            <CardDescription className="text-purple-200">
              Choose a country and sector to access Vector Search
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Country</label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-purple-500/30"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country} value={country} className="text-black">
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Sector</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/20 text-white border border-purple-500/30"
                >
                  <option value="">Select Sector</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector} className="text-black">
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Button
              onClick={handleVectorSearch}
              disabled={!selectedCountry || !selectedSector}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Search className="mr-2 h-4 w-4" />
              Access Vector Search Dashboard
            </Button>
          </CardContent>
        </Card>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/political-risk-heatmap")}
          >
            <CardHeader>
              <Shield className="h-8 w-8 text-purple-400 mb-2" />
              <CardTitle className="text-white">Political Risk Heatmap</CardTitle>
              <CardDescription className="text-purple-200">
                Enhanced political risk analysis with activist monitoring
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/global-signals")}
          >
            <CardHeader>
              <Users className="h-8 w-8 text-green-400 mb-2" />
              <CardTitle className="text-white">Ecology Voices</CardTitle>
              <CardDescription className="text-purple-200">
                Global political profiles and activist intelligence
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/geo-map")}
          >
            <CardHeader>
              <Map className="h-8 w-8 text-blue-400 mb-2" />
              <CardTitle className="text-white">GeoTemporal Map</CardTitle>
              <CardDescription className="text-purple-200">
                Interactive risk mapping with temporal analysis
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/pricing")}
          >
            <CardHeader>
              <DollarSign className="h-8 w-8 text-yellow-400 mb-2" />
              <CardTitle className="text-white">Pricing</CardTitle>
              <CardDescription className="text-purple-200">Enterprise subscription plans and features</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/heatmap")}
          >
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-red-400 mb-2" />
              <CardTitle className="text-white">Regulatory Heatmap</CardTitle>
              <CardDescription className="text-purple-200">Real-time regulatory change monitoring</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/insights")}
          >
            <CardHeader>
              <Globe className="h-8 w-8 text-cyan-400 mb-2" />
              <CardTitle className="text-white">Global Insights</CardTitle>
              <CardDescription className="text-purple-200">Comprehensive regulatory intelligence</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/unified-dashboard")}
          >
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-orange-400 mb-2" />
              <CardTitle className="text-white">Unified Dashboard</CardTitle>
              <CardDescription className="text-purple-200">Complete risk intelligence overview</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:bg-white/20 transition-all cursor-pointer"
            onClick={() => router.push("/risk-heatmap")}
          >
            <CardHeader>
              <Shield className="h-8 w-8 text-pink-400 mb-2" />
              <CardTitle className="text-white">Risk Analysis</CardTitle>
              <CardDescription className="text-purple-200">Advanced risk assessment tools</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-200">
          <p>© 2024 RHIS PRISM - Advanced Political Risk Intelligence Platform</p>
        </div>
      </div>
    </div>
  )
}
