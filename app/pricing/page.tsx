// app/pricing/page.tsx
import Link from "next/link";

const pricingTiers = [
  {
    name: "Research",
    subtitle: "For individual analysts and researchers",
    price: "Free",
    period: "",
    borderColor: "border-l-blue-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    popular: false,
    features: [
      "5 crisis radar searches per day",
      "Basic geopolitical intelligence",
      "Email alerts (weekly digest)",
      "Community access",
      "Standard support"
    ],
    limitations: [
      "No ESG activism monitoring",
      "No regulatory deep-dive analysis", 
      "No API access",
      "No custom alerts"
    ],
    cta: "Get started",
    ctaStyle: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  },
  {
    name: "Professional",
    subtitle: "For investment teams and risk managers",
    price: "$299",
    period: "/month",
    borderColor: "border-l-green-500", 
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    popular: true,
    features: [
      "Unlimited crisis radar searches",
      "Full ESG & activism monitoring",
      "Real-time regulatory intelligence",
      "Advanced market impact analysis",
      "Custom alert configuration",
      "API access (1000 calls/month)",
      "Priority support",
      "Weekly analyst briefings"
    ],
    limitations: [],
    cta: "Start free trial",
    ctaStyle: "bg-gray-900 text-white hover:bg-gray-800"
  },
  {
    name: "Enterprise", 
    subtitle: "For institutions and large portfolios",
    price: "Custom",
    period: "",
    borderColor: "border-l-orange-500",
    bgColor: "bg-orange-50", 
    iconColor: "text-orange-600",
    popular: false,
    features: [
      "Everything in Professional",
      "Unlimited API access",
      "Custom data integrations",
      "Dedicated account manager",
      "Custom risk models",
      "White-label solutions",
      "SLA guarantees",
      "On-premise deployment options"
    ],
    limitations: [],
    cta: "Contact sales",
    ctaStyle: "bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
  }
];

const faqs = [
  {
    question: "How accurate is PRISM's intelligence?",
    answer: "PRISM maintains a 94% accuracy rate for geopolitical predictions and 89% for ESG activism campaigns, based on 18 months of verified outcomes."
  },
  {
    question: "What data sources does PRISM use?",
    answer: "We aggregate regulatory filings, social media sentiment, news feeds, parliamentary records, and proprietary political intelligence networks across 50+ countries."
  },
  {
    question: "Can I integrate PRISM with my existing systems?",
    answer: "Yes, PRISM offers REST APIs, webhooks, and direct integrations with major portfolio management and risk systems like Bloomberg, Refinitiv, and custom platforms."
  },
  {
    question: "How quickly do I receive alerts?",
    answer: "Critical alerts are delivered within 15 minutes of detection. Standard intelligence updates are sent in real-time or according to your configured schedule."
  }
];

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple pricing,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              powerful intelligence
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Choose the plan that fits your intelligence needs. All plans include our core crisis radar technology.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative border-l-4 ${tier.borderColor} bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
                tier.popular ? 'ring-2 ring-gray-900' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gray-900 px-4 py-1 text-xs font-medium text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className={`h-12 w-12 rounded ${tier.bgColor} flex items-center justify-center mr-4`}>
                    <svg className={`h-6 w-6 ${tier.iconColor}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                    <p className="text-sm text-gray-600">{tier.subtitle}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 ml-1">{tier.period}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">What's included:</h4>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.limitations.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Not included:</h4>
                      <ul className="space-y-3">
                        {tier.limitations.map((limitation, limitIndex) => (
                          <li key={limitIndex} className="flex items-start">
                            <svg className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href={tier.name === 'Enterprise' ? '/contact' : '/signup'}
                  className={`w-full inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold shadow-sm transition-colors ${tier.ctaStyle}`}
                >
                  {tier.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about PRISM Intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-l-4 border-l-blue-500 bg-white rounded-lg shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="rounded-lg bg-gray-50 px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to stay ahead of the next crisis?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join leading financial institutions who rely on PRISM for regulatory intelligence and risk monitoring.
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
                Talk to sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
