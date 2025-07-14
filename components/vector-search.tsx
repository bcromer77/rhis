"use client";

import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const mockLegalSignals = [
  {
    title: "USMCA Article 2.4 Breach: 30% Tariff on Minerals",
    source: "RHIS Legal Tracker | July 2025",
    riskLevel: "Red",
    tags: ["Treaty Violation", "ISDS", "Cross-Border Compliance"],
    summary: "Unilateral U.S. tariff violates USMCA terms. Potential for investor-state arbitration and state-to-state dispute resolution.",
  },
  {
    title: "Sinaloa Rail Bypass: Indigenous Consultation Absent",
    source: "FPIC Legal Signal | RHIS Monitoring",
    riskLevel: "Red",
    tags: ["FPIC", "Infrastructure", "Environmental Compliance"],
    summary: "No documented Free, Prior and Informed Consent in rail expansion zones tied to tariff-avoidant trade routes.",
  },
  {
    title: "Quota Enforcement Model: Refined Sugar Becomes Template",
    source: "H.R.1 Section 359k | U.S. House 2025",
    riskLevel: "Yellow",
    tags: ["Labeling Law", "Customs Enforcement", "Trade Quota"],
    summary: "Legal mechanism for reallocating tariff-rate quotas now active. May be adapted to steelmaking inputs.",
  }
];

export function VectorSearch() {
  return (
    <div className="space-y-6">
      {mockLegalSignals.map((signal, idx) => (
        <Card key={idx} className="border shadow-sm rounded-xl">
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">{signal.title}</h3>
            <div className="text-sm text-gray-500">{signal.source}</div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-2">
              {signal.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded-full border"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-700">{signal.summary}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

