import Link from "next/link";

export default function HomePage() {
  const demoQueries = ["Lithium", "Nvidia", "Taiwan", "Sarepta Therapeutics"];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">PRISM Horizon</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          The reaction engine for global signals. From headlines to horizon scanning,
          discover risks, opportunities, and overlooked plays.
        </p>

        {/* Quick Start Demo Chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {demoQueries.map((q) => (
            <Link
              key={q}
              href={`/horizon?q=${encodeURIComponent(q)}`}
              className="px-4 py-2 rounded-full bg-white text-blue-600 font-medium shadow hover:bg-blue-50 transition"
            >
              {q}
            </Link>
          ))}
        </div>
      </div>

      {/* Grid of Features */}
      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Tile
          href="/dashboard"
          title="Unified Dashboard"
          desc="Comprehensive regulatory monitoring and risk assessment"
          tags={["Real-time", "Multi-source"]}
        />

        <Tile
          href="/horizon"
          title="Vector Search"
          desc="AI-powered semantic search across regulatory signals and headlines"
          tags={["Semantic", "AI-Powered", "Live Demo"]}
        />

        <Tile
          href="/political-risk-heatmap"
          title="Political Risk Heatmap"
          desc="Geographic visualization of political and regulatory risks"
          tags={["Geographic", "Risk Analysis"]}
        />

        <Tile
          href="/global-political-signals"
          title="Global Political Signals"
          desc="Worldwide political intelligence and trend analysis"
          tags={["Global", "Intelligence"]}
        />

        <Tile
          href="/legal-risks"
          title="Legal Risk Intelligence"
          desc="Treaty violations, ISDS triggers, and compliance monitoring"
          tags={["Legal", "Compliance"]}
        />

        <Tile
          href="/indigenous-news"
          title="Indigenous Broadcasting News"
          desc="Community alerts, FPIC violations, and live grievance tracking"
          tags={["FPIC Risk", "Instability", "Live Feed"]}
        />

        <Tile
          href="/regulatory-insights"
          title="Regulatory Insights"
          desc="Deep analysis and insights from regulatory data"
          tags={["Analytics", "Insights"]}
        />

        <Tile
          href="/compare-mode"
          title="Compare Mode"
          desc="Side-by-side comparison of regulatory environments"
          tags={["Comparison", "Analysis"]}
        />
      </div>
    </main>
  );
}

function Tile({
  href,
  title,
  desc,
  tags,
}: {
  href: string;
  title: string;
  desc: string;
  tags: string[];
}) {
  return (
    <Link
      href={href}
      className="block p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600 mb-3">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

