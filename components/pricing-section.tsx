"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Shield, Globe, TrendingUp, Users, Zap, Crown } from "lucide-react"

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with risk intelligence",
      icon: Shield,
      price: {
        monthly: 299,
        annual: 2990,
      },
      features: [
        "Up to 5 users",
        "Basic risk monitoring",
        "Standard reporting",
        "Email support",
        "10 facility monitoring",
        "Basic API access",
        "Monthly risk assessments",
      ],
      popular: false,
      color: "border-purple-500/20",
    },
    {
      name: "Professional",
      description: "Advanced features for growing organizations",
      icon: TrendingUp,
      price: {
        monthly: 799,
        annual: 7990,
      },
      features: [
        "Up to 25 users",
        "Advanced risk analytics",
        "Real-time monitoring",
        "Priority support",
        "50 facility monitoring",
        "Full API access",
        "Weekly risk assessments",
        "Custom dashboards",
        "Political risk alerts",
        "Regulatory compliance tracking",
      ],
      popular: true,
      color: "border-purple-500",
    },
    {
      name: "Enterprise",
      description: "Complete solution for large-scale operations",
      icon: Crown,
      price: {
        monthly: 1999,
        annual: 19990,
      },
      features: [
        "Unlimited users",
        "AI-powered predictions",
        "Global risk coverage",
        "Dedicated support",
        "Unlimited facility monitoring",
        "White-label options",
        "Daily risk assessments",
        "Advanced integrations",
        "Custom risk models",
        "Geospatial analysis",
        "Executive briefings",
        "SLA guarantees",
      ],
      popular: false,
      color: "border-yellow-500/50",
    },
  ]

  const additionalFeatures = [
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Monitor risks across 195+ countries with localized intelligence",
    },
    {
      icon: Zap,
      title: "Real-time Alerts",
      description: "Instant notifications for critical risk events and regulatory changes",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 access to risk intelligence experts and analysts",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with SOC 2 compliance and data encryption",
    },
  ]

  return (
    <div className="space-y-12">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-purple-500/20">
          <div className="flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly" ? "bg-purple-600 text-white" : "text-purple-200 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "annual" ? "bg-purple-600 text-white" : "text-purple-200 hover:text-white"
              }`}
            >
              Annual
              <Badge className="ml-2 bg-green-600 text-xs">Save 17%</Badge>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <Card
            key={plan.name}
            className={`bg-white/10 backdrop-blur-sm border-2 ${plan.color} relative ${
              plan.popular ? "scale-105 shadow-2xl" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-4 py-1">
                  <Star className="h-3 w-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-8">
              <div className="mx-auto mb-4 p-3 bg-white/10 rounded-full w-fit">
                <plan.icon className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
              <CardDescription className="text-purple-200 mt-2">{plan.description}</CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">
                    ${billingCycle === "monthly" ? plan.price.monthly : Math.floor(plan.price.annual / 12)}
                  </span>
                  <span className="text-purple-200 ml-2">/month</span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-sm text-purple-300 mt-1">Billed annually (${plan.price.annual})</p>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-purple-100 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-white/20 hover:bg-white/30 text-white border border-purple-500/30"
                }`}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Features */}
      <div className="mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose RHIS PRISM?</h2>
          <p className="text-purple-200 text-lg">
            Advanced features that set us apart from traditional risk management solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalFeatures.map((feature, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-purple-500/20 text-center">
              <CardContent className="p-6">
                <div className="mx-auto mb-4 p-3 bg-purple-600/20 rounded-full w-fit">
                  <feature.icon className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-purple-200 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border-purple-500/20">
        <CardContent className="text-center py-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-purple-200 text-lg mb-8 max-w-2xl mx-auto">
            Join leading organizations worldwide who trust RHIS PRISM for their critical risk intelligence needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3">Start Free Trial</Button>
            <Button
              variant="outline"
              className="border-purple-500/30 text-purple-200 hover:bg-white/10 px-8 py-3 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-purple-300 text-sm mt-4">No credit card required • 14-day free trial • Cancel anytime</p>
        </CardContent>
      </Card>
    </div>
  )
}
