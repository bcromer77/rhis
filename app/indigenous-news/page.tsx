"use client"

import IndigenousBroadcastingDashboard from "@/components/indigenous-broadcasting-dashboard";

export default function GeoMapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Indigenous Broadcasting News</h1>
          <p className="text-purple-200">
            Real-time coverage of community grievances, FPIC issues, and regulatory risks
          </p>
        </div>
        <IndigenousBroadcastingDashboard />
      </div>
    </div>
  )
}

