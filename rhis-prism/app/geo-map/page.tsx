"use client"

import { GeoTemporalRiskMap } from "@/components/geo-temporal-risk-map"

export default function GeoMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">GeoTemporal Risk Map</h1>
          <p className="text-purple-200">Interactive risk mapping with temporal analysis and facility monitoring</p>
        </div>
        <GeoTemporalRiskMap />
      </div>
    </div>
  )
}
