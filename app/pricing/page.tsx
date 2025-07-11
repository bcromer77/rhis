"use client"
import { PricingSection } from "@/components/pricing-section"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Enterprise Pricing</h1>
          <p className="text-purple-200">Choose the perfect plan for your risk intelligence needs</p>
        </div>
        <PricingSection />
      </div>
    </div>
  )
}
