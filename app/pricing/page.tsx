"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check, ArrowRight, Zap, Building2, Users } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            See Where Your Risk Lies
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Choose the plan that fits your risk intelligence needs — from
            individual analysts to enterprise funds.
          </p>
        </div>
      </header>

      {/* Pricing Cards */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Analyst Tier */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Analyst</CardTitle>
              <p className="mt-2 text-4xl font-bold">Free</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> 50 searches/month
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Crisis Card previews
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Basic regulatory signals
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Tier */}
          <Card className="overflow-hidden hover:shadow-lg border-2 border-blue-500">
            <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
              Most Popular
            </div>
            <CardHeader className="text-center pb-8 pt-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Pro</CardTitle>
              <p className="mt-2 text-4xl font-bold">$299</p>
              <p className="text-slate-600">per month</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Unlimited searches
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Custom dashboards
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Real-time alerts
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Export to CSV/Slack
                </li>
              </ul>
              <Button className="w-full">
                Start Pro Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Enterprise Tier */}
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="text-center pb-8">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <p className="mt-2 text-4xl font-bold">Custom</p>
              <p className="text-slate-600">pricing</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6 text-slate-700">
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Dedicated API access
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Custom signal sources
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> White-glove onboarding
                </li>
                <li className="flex gap-2 items-center">
                  <Check className="h-5 w-5 text-green-600" /> Compliance integration
                </li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <Card className="bg-slate-900 text-white">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">
                Ready to See Where Your Risk Lies?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                RHIS surfaces signals before they become headlines. No advice,
                just the difference between foresight and hindsight.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    Try the Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/case-studies">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-800"
                  >
                    View Case Studies
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
