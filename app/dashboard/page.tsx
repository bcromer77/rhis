"use client"
import { Suspense } from "react"
import { useState } from "react"
import { VectorSearch } from "@/components/vector-search"

function DashboardContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Vector Search Dashboard</h1>
          <p className="text-purple-200">AI-powered regulatory and political risk intelligence</p>
        </div>
        <VectorSearch />
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"search" | "heatmap">("search")

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white">Loading dashboard...</div>
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
