import QuotaPrecedentSignal from "@/components/quota-precedent-signal"
import LegalRiskCards from "@/components/legal-risk-cards"

export default function LegalRisksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legal Risk Intelligence Dashboard</h1>
          <p className="text-gray-600">
            Forensic legal signal intelligence for treaty risk, tariff litigation, and cross-border compliance
            monitoring
          </p>
        </div>

        {/* Quota Precedent Signal - Top of page */}
        <div className="mb-8">
          <QuotaPrecedentSignal />
        </div>

        {/* Legal Risk Vector Intelligence */}
        <LegalRiskCards />
      </div>
    </div>
  )
}
