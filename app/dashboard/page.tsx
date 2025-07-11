"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowLeft, Filter, Download, Activity, TrendingUp, Search, Waves, Clock } from "lucide-react"

export default function RhisPrismDashboard() {
  const [activeModule, setActiveModule] = useState("pulse")
  const [activeZone, setActiveZone] = useState("all")

  const modules = [
    { key: "pulse", name: "Pulse", icon: Activity, color: "text-red-600" },
    { key: "signals", name: "Signals", icon: TrendingUp, color: "text-blue-600" },
    { key: "vector", name: "Vector", icon: Search, color: "text-green-600" },
    { key: "echo", name: "Echo", icon: Waves, color: "text-purple-600" },
  ]

  const zones = ["all", "india", "mexico", "canada"]

  // Sample data for the active module
  const getData = () => {
    switch (activeModule) {
      case "pulse":
        return [
          {
            id: 1,
            zone: "India",
            title: "Digital Personal Data Protection Bill - Amendment Discussion",
            risk: "high",
            time: "23 minutes ago",
            description: "Parliamentary committee discussing significant amendments to data localization requirements",
          },
          {
            id: 2,
            zone: "Canada",
            title: "Provincial Healthcare Digitization Framework",
            risk: "medium",
            time: "1 hour ago",
            description: "Ontario and BC announcing joint digital health infrastructure initiative",
          },
          {
            id: 3,
            zone: "Mexico",
            title: "Energy Sector Constitutional Reform Debate",
            risk: "low",
            time: "3 hours ago",
            description: "Senate committee reviewing proposed changes to Article 27 energy provisions",
          },
        ]
      case "signals":
        return [
          {
            id: 1,
            zone: "India",
            title: "Privacy Regulation Mentions",
            trend: "+18%",
            count: 847,
            description: "Significant increase in parliamentary discussions about data privacy",
          },
          {
            id: 2,
            zone: "Canada",
            title: "Healthcare Digitization Trends",
            trend: "+24%",
            count: 1203,
            description: "Provincial healthcare digitization gaining momentum across regions",
          },
        ]
      default:
        return []
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to zones
              </a>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-slate-800">Intelligence Dashboard</h1>
              <p className="text-sm text-slate-600">Real-time regulatory monitoring</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Module Navigation */}
        <div className="flex gap-2 mb-6">
          {modules.map((module) => (
            <Button
              key={module.key}
              variant={activeModule === module.key ? "default" : "ghost"}
              onClick={() => setActiveModule(module.key)}
              className="flex items-center gap-2"
            >
              <module.icon className={`h-4 w-4 ${activeModule === module.key ? "text-white" : module.color}`} />
              {module.name}
            </Button>
          ))}
        </div>

        {/* Zone Filter */}
        <div className="flex gap-2 mb-8">
          {zones.map((zone) => (
            <Button
              key={zone}
              variant={activeZone === zone ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveZone(zone)}
              className="capitalize"
            >
              {zone}
            </Button>
          ))}
        </div>

        {/* Data Display */}
        <div className="space-y-4">
          {getData().map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded">
                          {item.zone}
                        </span>
                        {"risk" in item && (
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              item.risk === "high"
                                ? "bg-red-100 text-red-700"
                                : item.risk === "medium"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                            }`}
                          >
                            {item.risk} risk
                          </span>
                        )}
                        {"trend" in item && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {item.trend}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      {"time" in item && (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <Clock className="h-3 w-3" />
                          {item.time}
                        </div>
                      )}
                      {"count" in item && (
                        <div className="text-lg font-semibold text-slate-800">{item.count.toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
