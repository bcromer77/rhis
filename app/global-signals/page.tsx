"use client"

import { GlobalPoliticalSignals } from "@/components/global-political-signals"

export default function GlobalSignalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Ecology Voices</h1>
          <p className="text-purple-200">Global political profiles and activist intelligence network</p>
        </div>
        <GlobalPoliticalSignals />
      </div>
    </div>
  )
}
