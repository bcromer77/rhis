"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";

const issuesData = [
  {
    country: "India",
    region: "Andhra Pradesh",
    station: "AIR Visakhapatnam",
    date: "2025-07-13",
    headline: "Tribal Concerns Ignored in Port Expansion",
    details:
      "Broadcast emphasizes lack of structured consultation with tribal panchayats over a proposed deep-water port linked to export corridors. Station describes state tone as aggressive toward indigenous claims.",
    sentiment: "Negative",
    consultPeriod: "Not Initiated",
    legalFlags: ["FPIC Risk", "Electoral Instability"],
    risk: ["Consultation", "Political", "Reputational"],
    action:
      "Engage tribal legal advisors. Review Andhra Pradesh Land Transfer laws. Flag upcoming elections for strategic adjustment."
  },
  {
    country: "Canada",
    region: "Quebec",
    station: "CBC North",
    date: "2025-07-10",
    headline: "Hydro Project Criticized by Innu Leaders",
    details:
      "Broadcast features Innu Nation spokesperson raising alarm over lack of consultation on transmission lines. Legal opinion aired cites violation of duty to consult.",
    sentiment: "Negative",
    consultPeriod: "Ongoing",
    legalFlags: ["Duty to Consult", "Environmental Licensing"],
    risk: ["Legal", "Community", "Infrastructure"],
    action: "Trigger FPIC review. Engage Innu leadership council. Pause approvals."
  },
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "La Voz de los Pueblos",
    date: "2025-07-12",
    headline: "Wind Farm Expansion: No Indigenous Input",
    details:
      "Station reports new wind turbine installations without consultation with Mayo and Yoreme communities. Legal commentary aired live warns of constitutional breaches under Article 2.",
    sentiment: "Negative",
    consultPeriod: "Violated",
    legalFlags: ["Constitutional Breach", "High Court Watch"],
    risk: ["Legal", "Environmental", "ESG"],
    action: "Document Article 2 precedents. Activate local counsel in Sinaloa. Prepare impact mitigation response."
  }
];

export default function IndigenousBroadcastingDashboard() {
  const [selectedCountry, setSelectedCountry] = useState("");

  const filteredData = selectedCountry
    ? issuesData.filter((item) => item.country === selectedCountry)
    : issuesData;

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        {["All", "India", "Canada", "Mexico"].map((country) => (
          <button
            key={country}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedCountry === country || (country === "All" && !selectedCountry)
                ? "bg-white text-slate-900 shadow"
                : "bg-slate-800 text-slate-200"
            }`}
            onClick={() =>
              setSelectedCountry(country === "All" ? "" : country)
            }
          >
            {country}
          </button>
        ))}
      </div>

      {filteredData.map((issue, idx) => (
        <div
          key={idx}
          className="border border-purple-600 p-4 rounded-lg bg-slate-800 text-white space-y-2"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {issue.station} — {issue.region}, {issue.country}
            </h2>
            <span className="text-sm text-purple-300">{issue.date}</span>
          </div>
          <h3 className="text-xl font-bold text-purple-200">{issue.headline}</h3>
          <p className="text-slate-300">{issue.details}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">{issue.sentiment}</Badge>
            <Badge variant="outline">{issue.consultPeriod}</Badge>
            {issue.legalFlags.map((flag, i) => (
              <Badge key={i} className="bg-red-100 text-red-700 border-red-300">
                {flag}
              </Badge>
            ))}
            {issue.risk.map((r, i) => (
              <Badge key={i} className="bg-yellow-100 text-yellow-700 border-yellow-300">
                {r}
              </Badge>
            ))}
          </div>

          <div className="mt-2 text-sm text-purple-300">
            <strong>Action:</strong> {issue.action}
          </div>
        </div>
      ))}
    </div>
  );
}

