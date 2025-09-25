// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PRISM | Regulatory & Horizon Intelligence System',
  description: 'Advanced regulatory intelligence and risk monitoring platform for financial markets',
  keywords: 'regulatory intelligence, risk monitoring, financial markets, ESG, geopolitical risk',
  authors: [{ name: 'PRISM Intelligence' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
