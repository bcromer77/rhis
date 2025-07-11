"use client"

import { CompareModePanel } from "@/components/compare-mode-panel"
import { Button } from "@/components/ui/button"
import { ArrowLeft, GitCompare } from "lucide-react"
import Link from "next/link"

export default function CompareModePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 flex items-center gap-3">
              <GitCompare className="h-8 w-8 text-blue-600" />
              Compare Mode
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Side-by-side comparison of geopolitical risks across Brazil, Canada, and Mexico
            </p>
          </div>
        </div>

        {/* Compare Mode Panel */}
        <CompareModePanel />
      </div>
    </div>
  )
}
