"use client"

import { EnhancedPoliticalRiskHeatmap } from "@/components/enhanced-political-risk-heatmap"

export default function PoliticalRiskHeatmapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Enhanced Political Risk Heatmap</h1>
          <p className="text-purple-200">Advanced political risk analysis with activist monitoring</p>
        </div>
        <EnhancedPoliticalRiskHeatmap />
      </div>
    </div>
  )
}
