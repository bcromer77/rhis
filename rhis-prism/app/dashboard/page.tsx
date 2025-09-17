import IndigenousVectorSearchBar from "@/components/IndigenousVectorSearchBar"
import UnifiedRegulatoryDashboard from "@/components/unified-regulatory-dashboard"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Unified Dashboard Shell (keeps the pretty cards layout) */}
        <UnifiedRegulatoryDashboard />

        {/* Custom Search Section */}
        <div className="mt-12 p-6 bg-white shadow-sm rounded-lg border">
          <h1 className="text-2xl font-bold mb-4">
            Regulatory Intelligence Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Search across official transcripts and X chatter for regulatory
            signals in Mexico.
          </p>
          <IndigenousVectorSearchBar />
        </div>
      </div>
    </main>
  )
}
