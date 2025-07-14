"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, FileText, Clock, ExternalLink } from "lucide-react"

const mockLegalSignals = [
  {
    title: "USMCA Article 2.4 Breach: 30% Tariff on Minerals",
    source: "RHIS Legal Tracker | July 2025",
    riskLevel: "Red",
    tags: ["Treaty Violation", "ISDS", "Cross-Border Compliance"],
    summary:
      "New U.S. tariffs conflict with USMCA obligations. Legal operations must evaluate investor-state dispute viability.",
  },
  {
    title: "Sinaloa Rail Bypass: No Documented FPIC",
    source: "RHIS FPIC Heatmap | Q3 2025",
    riskLevel: "Red",
    tags: ["FPIC", "Environmental Law", "Litigation Exposure"],
    summary:
      "Infrastructure rerouting to avoid tariff zones lacks Free, Prior and Informed Consent. High litigation sensitivity.",
  },
  {
    title: "Quota Enforcement Doctrine Established via H.R.1 §359k",
    source: "U.S. House Legislation | Section 359k",
    riskLevel: "Yellow",
    tags: ["Quota Law", "Labeling Enforcement", "Trade Template"],
    summary:
      "Quota reallocation and purity enforcement under U.S. sugar law sets legal precedent for industrial inputs like ores.",
  },
]

export default function LegalRiskCards() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Legal Risk Vector Intelligence</h2>
        <Badge variant="outline" className="text-sm">
          <Clock className="h-4 w-4 mr-1" />
          Live Monitoring
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockLegalSignals.map((signal, index) => (
          <Card
            key={index}
            className={`h-full border-l-4 ${
              signal.riskLevel === "Red" ? "border-l-red-500 bg-red-50/50" : "border-l-yellow-500 bg-yellow-50/50"
            } hover:shadow-lg transition-shadow`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className={`h-5 w-5 ${signal.riskLevel === "Red" ? "text-red-600" : "text-yellow-600"}`} />
                  <Badge
                    className={`${
                      signal.riskLevel === "Red"
                        ? "bg-red-100 text-red-700 border-red-200"
                        : "bg-yellow-100 text-yellow-700 border-yellow-200"
                    }`}
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {signal.riskLevel} Risk
                  </Badge>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
              <CardTitle className="text-lg leading-tight text-gray-900">{signal.title}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{signal.source}</span>
              </div>

              <p className="text-sm text-gray-800 leading-relaxed">{signal.summary}</p>

              <div className="flex flex-wrap gap-2">
                {signal.tags.map((tag, tagIndex) => (
                  <Badge
                    key={tagIndex}
                    variant="outline"
                    className="text-xs bg-gray-100 text-gray-700 border-gray-200 rounded-full"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="pt-2 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Legal Operations Priority</span>
                  <span className={`font-medium ${signal.riskLevel === "Red" ? "text-red-600" : "text-yellow-600"}`}>
                    {signal.riskLevel === "Red" ? "Immediate Action" : "Monitor Closely"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
