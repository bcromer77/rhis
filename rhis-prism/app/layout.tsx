<<<<<<< HEAD
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
=======
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "RHIS PRISM",
  description: "Real-time political and regulatory horizon scanning by RippleXn",
  icons: {
    icon: "/favicon.ico", // place favicon in public/favicon.ico
  },
>>>>>>> origin/main
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
=======
      <head />
>>>>>>> origin/main
      <body>{children}</body>
    </html>
  )
}
<<<<<<< HEAD
=======

>>>>>>> origin/main
