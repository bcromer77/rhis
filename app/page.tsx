import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Unified Dashboard */}
        <Link href="/dashboard" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Unified Dashboard</h2>
          <p className="text-sm text-gray-600">
            Comprehensive regulatory monitoring and risk assessment
          </p>
          <div className="mt-2 text-xs text-blue-600">Real-time · Multi-source</div>
        </Link>

        {/* Vector Search */}
        <Link href="/vector-search" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Vector Search</h2>
          <p className="text-sm text-gray-600">
            AI-powered semantic search across regulatory documents
          </p>
          <div className="mt-2 text-xs text-blue-600">Semantic · AI-Powered</div>
        </Link>

        {/* Political Risk Heatmap */}
        <Link href="/political-risk-heatmap" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Political Risk Heatmap</h2>
          <p className="text-sm text-gray-600">
            Geographic visualization of political and regulatory risks
          </p>
          <div className="mt-2 text-xs text-blue-600">Geographic · Risk Analysis</div>
        </Link>

        {/* Global Political Signals */}
        <Link href="/global-political-signals" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Global Political Signals</h2>
          <p className="text-sm text-gray-600">
            Worldwide political intelligence and trend analysis
          </p>
          <div className="mt-2 text-xs text-blue-600">Global · Intelligence</div>
        </Link>

        {/* Legal Risk Intelligence */}
        <Link href="/legal-risks" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Legal Risk Intelligence</h2>
          <p className="text-sm text-gray-600">
            Treaty violations, ISDS triggers, and compliance monitoring
          </p>
          <div className="mt-2 text-xs text-blue-600">Legal · Compliance</div>
        </Link>

        {/* Indigenous Broadcasting News */}
        <Link href="/indigenous-news" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Indigenous Broadcasting News</h2>
          <p className="text-sm text-gray-600">
            Community alerts, FPIC violations, and live grievance tracking
          </p>
          <div className="mt-2 text-xs text-blue-600">FPIC Risk · Electoral Instability · Live Feed</div>
        </Link>

        {/* Regulatory Insights */}
        <Link href="/regulatory-insights" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Regulatory Insights</h2>
          <p className="text-sm text-gray-600">
            Deep analysis and insights from regulatory data
          </p>
          <div className="mt-2 text-xs text-blue-600">Analytics · Insights</div>
        </Link>

        {/* Compare Mode */}
        <Link href="/compare-mode" className="block p-6 rounded-lg border bg-white hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Compare Mode</h2>
          <p className="text-sm text-gray-600">
            Side-by-side comparison of regulatory environments
          </p>
          <div className="mt-2 text-xs text-blue-600">Comparison · Analysis</div>
        </Link>
      </div>
    </main>
  );
}
