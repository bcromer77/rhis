import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RHIS PRISM",
  description: "Real-time political and regulatory horizon scanning by RippleXn",
  icons: {
    icon: "/favicon.ico", // place favicon in public/favicon.ico
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  )
}

