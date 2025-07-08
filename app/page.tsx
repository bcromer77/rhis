"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, Zap, Mountain, Pickaxe, TrendingUp } from "lucide-react"
import { VectorSearch } from "@/components/vector-search"
import { RegulatoryHeatmap } from "@/components/regulatory-heatmap"

const countries = [
  { id: "india", name: "India", flag: "🇮🇳", sectors: ["Coal", "Iron Ore", "Bauxite", "Copper"] },
  { id: "mexico", name: "Mexico", flag: "🇲🇽", sectors: ["Silver", "Gold", "Copper", "Zinc"] },
  { id: "canada", name: "Canada", flag: "🇨🇦", sectors: ["Gold", "Nickel", "Uranium", "Potash"] },
]

const mineralSectors = [
  { id: "coal", name: "Coal", icon: "⚫", risk: "high", regulations: 847 },
  { id: "gold", name: "Gold", icon: "🟡", risk: "medium", regulations: 623 },
  { id: "copper", name: "Copper", icon: "🟤", risk: "medium", regulations: 534 },
  { id: "iron", name: "Iron Ore", icon: "🔴", risk: "low", regulations: 412 },
  { id: "silver", name: "Silver", icon: "⚪", risk: "low", regulations: 298 },
  { id: "uranium", name: "Uranium", icon: "🟢", risk: "high", regulations: 156 },
]

export default function RhisPrismApp() {
  const [step, setStep] = useState<"welcome" | "country" | "sector" | "dashboard">("welcome")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"search" | "heatmap">("search")

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId)
    setStep("sector")
  }

  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId)
    setStep("dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <AnimatePresence mode="wait">
        {step === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="text-center max-w-2xl">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Mountain className="h-12 w-12 text-slate-700" />
                  <Pickaxe className="h-10 w-10 text-slate-600" />
                </div>
                <h1 className="text-5xl font-bold text-slate-800 mb-4">RhisPrism</h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Mineral regulatory intelligence with visual heatmaps
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { name: "Pulse", desc: "Live regulatory alerts", icon: Zap },
                    { name: "Signals", desc: "Policy trend tracking", icon: "📊" },
                    { name: "Vector", desc: "AI-powered search", icon: Search },
                    { name: "Heatmap", desc: "Visual intelligence", icon: TrendingUp },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                    >
                      <Card className="bg-white/50 border-slate-200 p-4 text-center">
                        <div className="text-2xl mb-2">
                          {typeof feature.icon === "string" ? (
                            feature.icon
                          ) : (
                            <feature.icon className="h-6 w-6 mx-auto" />
                          )}
                        </div>
                        <h3 className="font-semibold text-slate-800">{feature.name}</h3>
                        <p className="text-xs text-slate-600">{feature.desc}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    onClick={() => setStep("country")}
                    size="lg"
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  >
                    Start Intelligence Briefing
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg font-semibold rounded-full bg-transparent"
                  >
                    <a href="/heatmap">
                      View Global Heatmap
                      <TrendingUp className="h-5 w-5 ml-2" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {step === "country" && (
          <motion.div
            key="country"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-4xl w-full">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Choose Your Mining Region</h2>
                <p className="text-slate-600">Select a country to monitor mineral regulatory developments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {countries.map((country, i) => (
                  <motion.div
                    key={country.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => handleCountrySelect(country.id)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white border-slate-200 hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="text-6xl mb-4">{country.flag}</div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">{country.name}</h3>
                        <div className="space-y-2">
                          <p className="text-sm text-slate-600 mb-3">Key minerals:</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {country.sectors.map((sector) => (
                              <span
                                key={sector}
                                className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full"
                              >
                                {sector}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === "sector" && (
          <motion.div
            key="sector"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen flex items-center justify-center p-6"
          >
            <div className="max-w-5xl w-full">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">Select Mineral Sector</h2>
                <p className="text-slate-600">Choose your primary mineral focus for regulatory monitoring</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mineralSectors.map((sector, i) => (
                  <motion.div
                    key={sector.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleSectorSelect(sector.id)}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white border-slate-200 hover:shadow-md transition-all">
                      <CardContent className="p-6 text-center">
                        <div className="text-4xl mb-3">{sector.icon}</div>
                        <h3 className="font-bold text-slate-800 mb-2">{sector.name}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              sector.risk === "high"
                                ? "bg-red-100 text-red-700"
                                : sector.risk === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {sector.risk} risk
                          </span>
                          <span className="text-slate-600">{sector.regulations} regs</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === "dashboard" && <MineralDashboard country={selectedCountry!} sector={selectedSector!} />}
      </AnimatePresence>

      <footer className="text-center text-sm mt-8 text-muted-foreground">
        RhisPrism™ — A RippleXn product. Built for those who shape the future.
      </footer>
    </div>
  )
}

function MineralDashboard({ country, sector }: { country: string; sector: string }) {
  const [activeTab, setActiveTab] = useState<"search" | "heatmap">("search")

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Mineral Intelligence Dashboard</h1>
              <p className="text-slate-600">
                {countries.find((c) => c.id === country)?.name} • {sector.charAt(0).toUpperCase() + sector.slice(1)}{" "}
                Sector
              </p>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Change Selection
            </Button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2">
            <Button
              variant={activeTab === "search" ? "default" : "ghost"}
              onClick={() => setActiveTab("search")}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Vector Search
            </Button>
            <Button
              variant={activeTab === "heatmap" ? "default" : "ghost"}
              onClick={() => setActiveTab("heatmap")}
              className="flex items-center gap-2"
            >
              <TrendingUp className="h-4 w-4" />
              Regulatory Heatmap
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "search" && <VectorSearch country={country} sector={sector} />}
        {activeTab === "heatmap" && <RegulatoryHeatmap selectedCountry={country} selectedSector={sector} />}
      </div>
    </motion.div>
  )
}
