// app/case-studies/page.tsx
import Link from "next/link";

const caseStudies = [
  {
    title: "Taiwan Semiconductor Crisis",
    subtitle: "How PRISM predicted the chip shortage 6 months early",
    category: "Geopolitical Intelligence",
    industry: "Technology",
    impact: "Critical",
    borderColor: "border-l-red-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    tags: ["Supply Chain", "Geopolitics", "Real-time"],
    metrics: {
      "Early Warning": "6 months",
      "Market Impact": "$2.1B saved",
      "Accuracy": "94%"
    },
    preview: "PRISM's geopolitical radar detected escalating Taiwan tensions and cross-strait military exercises, triggering semiconductor supply chain alerts before mainstream media coverage.",
    fullStory: "Our clients received actionable intelligence on potential TSMC production disruptions, allowing them to diversify suppliers and hedge positions ahead of the crisis.",
    testimonial: {
      quote: "PRISM gave us the edge we needed. While competitors scrambled, we were already positioned.",
      author: "Sarah Chen",
      title: "Chief Risk Officer, Global Tech Fund"
    }
  },
  {
    title: "ESG Activism Campaign Impact",
    subtitle: "Predicting shareholder revolts and regulatory responses",
    category: "ESG & Activism Monitoring", 
    industry: "Energy",
    impact: "Warning",
    borderColor: "border-l-green-500",
    bgColor: "bg-green-50", 
    iconColor: "text-green-600",
    tags: ["ESG Analysis", "Activism", "Compliance"],
    metrics: {
      "Campaign Detection": "3 weeks early",
      "Portfolio Protection": "$850M",
      "Success Rate": "89%"
    },
    preview: "PRISM identified coordinated ESG activism targeting major oil companies, tracking social media sentiment and regulatory filing patterns.",
    fullStory: "By monitoring indigenous rights groups, environmental lawyers, and regulatory communications, PRISM predicted which energy companies would face coordinated shareholder campaigns.",
    testimonial: {
      quote: "The ESG intelligence was game-changing. We repositioned our entire energy portfolio based on PRISM's early warnings.",
      author: "Marcus Rodriguez", 
      title: "Portfolio Manager, Sustainable Capital"
    }
  },
  {
    title: "Regulatory Shock Prevention",
    subtitle: "EU trade policy changes detected 4 months ahead",
    category: "Legal Risk Intelligence",
    industry: "Agriculture", 
    impact: "Opportunity",
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600", 
    tags: ["Legal", "Trade Policy", "AI-Powered"],
    metrics: {
      "Regulatory Lead Time": "4 months",
      "Trade Volume Impact": "€1.2B",
      "Client ROI": "340%"
    },
    preview: "PRISM's legal intelligence tracked EU parliamentary discussions and lobbying activities to predict grain import policy changes.",
    fullStory: "Our semantic analysis of regulatory documents, combined with political sentiment tracking, identified policy shifts that would impact Ukrainian grain exports months before official announcements.",
    testimonial: {
      quote: "PRISM's regulatory intelligence turned policy uncertainty into competitive advantage.",
      author: "Elena Kowalski",
      title: "Head of Strategy, AgriTrade Europe"
    }
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Real Intelligence,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Real Results
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            See how leading financial institutions use PRISM to stay ahead of regulatory shocks, 
            ESG campaigns, and geopolitical crises.
          </p>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-1">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className={`border-l-4 ${study.borderColor} bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden`}
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`h-12 w-12 rounded ${study.bgColor} flex items-center justify-center mr-4`}>
                      <svg className={`h-6 w-6 ${study.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-600">{study.category}</h4>
                      <p className="text-xs text-gray-500">{study.industry} • {study.impact}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                    study.impact === 'Critical' 
                      ? 'bg-red-100 text-red-800'
                      : study.impact === 'Warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {study.impact}
                  </span>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Story */}
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {study.title}
                    </h2>
                    <h3 className="text-lg text-gray-600 mb-4">
                      {study.subtitle}
                    </h3>
                    
                    <p className="text-gray-700 mb-4">
                      {study.preview}
                    </p>
                    
                    <p className="text-gray-600 mb-6">
                      {study.fullStory}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {study.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="border-l-4 border-l-gray-200 pl-4 py-2">
                      <blockquote className="text-gray-700 italic mb-2">
                        "{study.testimonial.quote}"
                      </blockquote>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">{study.testimonial.author}</span>
                        <span className="mx-1">•</span>
                        <span>{study.testimonial.title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="lg:col-span-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Results</h4>
                    <div className="space-y-4">
                      {Object.entries(study.metrics).map(([metric, value], metricIndex) => (
                        <div key={metricIndex} className="border rounded-lg p-4 bg-gray-50">
                          <div className="text-2xl font-bold text-gray-900">{value}</div>
                          <div className="text-sm text-gray-600">{metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="rounded-lg bg-gray-50 px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to get ahead of the next crisis?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join leading financial institutions who rely on PRISM for regulatory intelligence, 
              ESG monitoring, and geopolitical risk assessment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Start free trial
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Request demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
