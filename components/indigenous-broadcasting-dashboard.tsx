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
      "Broadcast emphasizes lack of structured consultation with tribal panchayats over a proposed deep-water port linked to export corridors. Station describes state tone as aggressive toward traditional landholding systems.",
    sentiment: "Negative",
    consultPeriod: "Not Initiated",
    legalFlags: ["FPIC Risk", "Electoral Instability"],
    risk: ["Consultation", "Political", "Reputational"],
    action:
      "Engage tribal legal advisors. Review Andhra Pradesh Land Transfer laws. Flag upcoming elections for strategic adjustment."
  },
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "La Voz de los Pueblos",
    date: "2025-07-12",
    headline: "Wind Farm Expansion: No Indigenous Input",
    details:
      "Station reports new wind turbine installations without consultation with Mayo and Yoreme communities. Legal commentary aired live warns of constitutional breaches under Article 2 of Mexican law.",
    sentiment: "Negative",
    consultPeriod: "Violated",
    legalFlags: ["Constitutional Breach", "High Court Watch"],
    risk: ["Legal", "Environmental", "ESG"],
    action:
      "Document Article 2 precedents. Activate local counsel in Sinaloa. Prepare impact mitigation response."
  }
];

const riskColors: Record<string, string> = {
  Legal: "bg-red-100 text-red-700 border-red-300",
  Environmental: "bg-green-100 text-green-700 border-green-300",
  Consultation: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Community: "bg-blue-100 text-blue-700 border-blue-300",
  Political: "bg-orange-100 text-orange-700 border-orange-300",
  Reputational: "bg-purple-100 text-purple-700 border-purple-300",
  ESG: "bg-indigo-100 text-indigo-700 border-indigo-300"
};

export default function IndigenousBroadcastingDashboard() {
  const [country, setCountry] = useState("");
  const [filtered, setFiltered] = useState(issuesData);

  const handleFilter = () => {
    let data = issuesData;
    if (country) data = data.filter((i) => i.country === country);
    setFiltered(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8">
      <h1 className="text-3xl font-bold mb-4">Indigenous Broadcasting Dashboard</h1>
      <div className="flex gap-4 mb-6">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Countries</option>
          <option value="India">India</option>
          <option value="Mexico">Mexico</option>
        </select>
        <button
          onClick={handleFilter}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {filtered.map((issue, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-6 border-l-4 border-blue-500">
            <div className="mb-2 text-sm text-gray-500">
              {issue.station} · {issue.region}, {issue.country}
            </div>
            <h2 className="text-xl font-semibold mb-2">{issue.headline}</h2>
            <div className="mb-2 text-gray-700">{issue.details}</div>
            <div className="text-sm mb-2">
              <strong>Sentiment:</strong> {issue.sentiment}
            </div>
            <div className="text-sm mb-2">
              <strong>Consultation Period:</strong> {issue.consultPeriod}
            </div>
            <div className="text-sm mb-2">
              <strong>Legal Flags:</strong> {issue.legalFlags.join(", ")}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {issue.risk.map((r, i) => (
                <span
                  key={i}
                  className={`px-2 py-1 text-xs font-semibold rounded border ${
                    riskColors[r] || "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  {r}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <strong>Recommended Action:</strong> {issue.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

