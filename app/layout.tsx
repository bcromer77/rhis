// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PRISM | See the Risks Others Miss",
  description:
    "Markets don't move on data. They move on surprises. PRISM helps you spot tomorrow's regulatory shocks, activist campaigns, and geopolitical jolts before they become headlines.",
  keywords:
    "regulatory intelligence, ESG activism, geopolitical risk, financial foresight, horizon scanning, risk monitoring",
  authors: [{ name: "PRISM Intelligence — The Behavioural Risk Lens" }],
  openGraph: {
    title: "PRISM | See the Risks Others Miss",
    description:
      "Spot tomorrow's shocks — from regulatory surprises to activist campaigns — before they hit the markets.",
    url: "https://rhis-new.vercel.app",
    siteName: "PRISM Intelligence",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PRISM Intelligence — Crisis Radar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRISM | See the Risks Others Miss",
    description:
      "Advanced regulatory and horizon intelligence system: ESG, geopolitics, activism — live and ahead of the curve.",
    creator: "@prism_intel",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {/* Apify-style Navigation */}
        <nav className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
                  <span className="text-xl font-bold text-gray-900">PRISM</span>
                </Link>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    Crisis Radar
                  </Link>
                  <Link
                    href="/case-studies"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-gray-900 text-white hover:bg-gray-800 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="min-h-screen bg-white">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
                  <span className="text-xl font-bold text-gray-900">PRISM</span>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Advanced regulatory intelligence and risk monitoring platform for financial markets.
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Product
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                      Crisis Radar
                    </Link>
                  </li>
                  <li>
                    <Link href="/case-studies" className="text-sm text-gray-600 hover:text-gray-900">
                      Case Studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Company
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  Connect
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="mailto:hello@prism-intel.com" className="text-sm text-gray-600 hover:text-gray-900">
                      hello@prism-intel.com
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/company/prism-intel" className="text-sm text-gray-600 hover:text-gray-900">
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 border-t border-gray-200 pt-8">
              <p className="text-sm text-gray-600">
                © 2025 PRISM Intelligence. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
