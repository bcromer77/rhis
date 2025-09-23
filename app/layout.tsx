import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRISM Dashboard",
  description: "Regulatory intelligence & signals pipeline",
  generator: "Next.js 15 + V0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
