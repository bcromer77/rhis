"use client"

import { Suspense } from "react"
import { UnifiedRegulatoryDashboard } from "@/components/unified-regulatory-dashboard"
import LegalVectorSearchBar from "@/components/mock/LegalVectorSearchBar"

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white">Loading dashboard...</div>
        </div>
      }
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <UnifiedRegulatoryDashboard />
        <div className="mt-10 px-6 max-w-4xl mx-auto">
          <LegalVectorSearchBar />
        </div>
      </div>
    </Suspense>
  )
}

