import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "RHIS | Regulatory Horizon Intelligence – See Signals Before They’re News",
  description:
    "RHIS helps investors, corporates, and risk managers detect regulatory, ESG, and geopolitical signals before they hit the headlines. From FDA dockets to council meetings, see where your risk lies — instantly.",
  openGraph: {
    title: "RHIS | Regulatory Horizon Intelligence – See Signals Before They’re News",
    description:
      "See who bleeds and who benefits before headlines hit. Regulatory, ESG and geopolitical signal intelligence for investors and corporates.",
    url: "https://rhis.vercel.app", // 🔑 update with your domain
    siteName: "RHIS",
    images: [
      {
        url: "/og-image-esg.png", // put an OG image in /public
        width: 1200,
        height: 630,
        alt: "RHIS Crisis Signals Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RHIS – Detect Signals Before They're News",
    description:
      "From FDA dockets to council permits, see regulatory and ESG signals before they move markets.",
    images: ["/og-image-esg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white">
      <body className="min-h-screen flex flex-col">
        {/* ✅ Global NavBar */}
        <NavBar />

        {/* ✅ Page Content */}
        <main className="flex-1">{children}</main>

        {/* ✅ Footer */}
        <footer className="py-6 text-center text-sm text-slate-500 border-t bg-slate-50">
          © {new Date().getFullYear()} RHIS — Regulatory Horizon Intelligence
          Signals.
        </footer>
      </body>
    </html>
  );
}
