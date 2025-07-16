"use client"

import { EnhancedPoliticalRiskHeatmap } from "@/components/enhanced-political-risk-heatmap"

export default function PoliticalRiskHeatmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Enhanced Political Risk Heatmap</h1>
          <p className="text-gray-600">Advanced political risk analysis with activist monitoring</p>
        </div>
        <EnhancedPoliticalRiskHeatmap />
      </div>
    </div>
  )
}

