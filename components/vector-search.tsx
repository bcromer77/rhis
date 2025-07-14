import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockLegalSignals = [
  {
    title: "USMCA Article 2.4 Breach: 30% Tariff on Minerals",
    source: "RHIS Legal Tracker | July 2025",
    riskLevel: "Red",
    tags: ["Treaty Violation", "ISDS", "Cross-Border Compliance"],
    summary: "Unilateral U.S. tariff violates USMCA obligations. Legal ops should prepare ISDS risk analysis and arbitration scenarios."
  },
  {
    title: "FPIC Gap: Sinaloa Rail Corridor Expansion",
    source: "FPIC Legal Radar | Q3 2025",
    riskLevel: "Red",
    tags: ["Indigenous Rights", "Infrastructure", "Litigation"],
    summary: "Rail rerouting triggered by tariffs shows no documented Free, Prior, and Informed Consent with local Indigenous authorities."
  },
  {
    title: "Quota Enforcement Template Set via H.R.1 Section 359k",
    source: "U.S. Congressional Record | 2025",
    riskLevel: "Yellow",
    tags: ["Quota Policy", "Customs", "Import Labeling"],
    summary: "Refined sugar quota controls establish a legal mechanism that may soon apply to mineral inputs."
  }
];

export function VectorSearch() {
  return (
    <div className="space-y-6">
      {mockLegalSignals.map((signal, idx) => (
        <Card key={idx} className="border shadow-sm rounded-xl">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-gray-900">{signal.title}</CardTitle>
                <CardDescription className="text-xs text-gray-500">{signal.source}</CardDescription>
              </div>
              <Badge variant="outline" className={\`text-xs \${signal.riskLevel === "Red" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}\`}>
                {signal.riskLevel}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-800 mb-2">{signal.summary}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {signal.tags.map((tag, i) => (
                <Badge key={i} className="text-xs bg-gray-100 text-gray-700">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
