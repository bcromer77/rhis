import { RegulatoryHeatmap } from "@/components/regulatory-heatmap"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function HeatmapPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </a>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Global Regulatory Heatmap</h1>
              <p className="text-slate-600">
                Comprehensive view of mining regulations and risk levels across key jurisdictions
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <RegulatoryHeatmap />
      </div>

      <footer className="text-center text-sm mt-8 text-muted-foreground">
        RhisPrism™ — A RippleXn product. Built for those who shape the future.
      </footer>
    </div>
  )
}
