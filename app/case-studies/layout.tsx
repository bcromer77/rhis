import { ReactNode } from "react";

export const metadata = {
  title: "ESG Radar | RHIS – Turning CSR Reports Into Market Signals",
  description:
    "RHIS ESG Radar transforms overlooked ESG disclosures, CSR reports, and council minutes into actionable foresight. From water permits to labor councils, see risks and opportunities before they reshape markets.",
  openGraph: {
    title: "ESG Radar | RHIS",
    description:
      "From water usage and displacement to board votes and power permits — ESG Radar surfaces the signals that others miss.",
    url: "https://yourdomain.com/case-studies",
    siteName: "RHIS",
    images: [
      {
        url: "https://yourdomain.com/og-image-esg.png",
        width: 1200,
        height: 630,
        alt: "ESG Radar Dashboard – RHIS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ESG Radar | RHIS",
    description:
      "Turning boring ESG disclosures into foresight. Water. Power. Displacement. Governance. All signals, zero noise.",
    images: ["https://yourdomain.com/og-image-esg.png"],
  },
};

export default function CaseStudiesLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
