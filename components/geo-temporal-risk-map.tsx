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
    details: "Broadcast emphasizes lack of structured consultation with tribal panchayats over a proposed deep-water port linked to export corridors. Station describes state tone as 'anti-mining' and signals likely electoral backlash.",
    sentiment: "Negative",
    consultPeriod: "Not Initiated",
    legalFlags: ["FPIC Risk", "Electoral Instability"],
    risk: ["Consultation", "Political", "Reputational"],
    action: "Engage tribal legal advisors. Review Andhra Pradesh Land Transfer laws. Flag upcoming elections for strategic adjustment."
  },
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "La Voz de los Pueblos",
    date: "2025-07-12",
    headline: "Wind Farm Expansion: No Indigenous Input",
    details: "Station reports new wind turbine installations without consultation with Mayo and Yoreme communities. Legal commentary aired live warns of constitutional breaches under Article 2 of Mexican law.",
    sentiment: "Negative",
    consultPeriod: "Violated",
    legalFlags: ["Constitutional Breach", "High Court Watch"],
    risk: ["Legal", "Environmental", "ESG"],
    action: "Document Article 2 precedents. Activate local counsel in Sinaloa. Prepare impact mitigation response."
  },
  {
    country: "Canada",
    region: "British Columbia",
    station: "CFTK Indigenous Hour",
    date: "2025-07-11",
    headline: "FPIC Process Underway for LNG Expansion",
    details: "Live interviews with Wet'suwet'en representatives confirm initial FPIC sessions have begun for the LNG corridor. Sentiment mixed, but leaders emphasize ‘monitoring legal compliance.’",
    sentiment: "Mixed",
    consultPeriod: "Underway",
    legalFlags: ["FPIC Initiated", "Monitoring Required"],
    risk: ["Legal", "Consultation"],
    action: "Track ongoing sessions. Dispatch liaison team. Prepare affidavit templates for legal audit trail."
  },
  {
    country: "India",
    region: "Jharkhand",
    station: "Radio Adivasi Jharkhand",
    date: "2025-07-10",
    headline: "Steel Plant Permit Under PIL Threat",
    details: "Broadcaster discusses challenge filed in High Court over lack of consultation under Forest Rights Act. Legal experts cite multiple violations of 2006 Act and SC guidelines.",
    sentiment: "Negative",
    consultPeriod: "Violated",
    legalFlags: ["PIL Alert", "FRA Breach"],
    risk: ["Legal", "Regulatory", "Reputational"],
    action: "Confirm legal representation. Assess FRA procedural history. Map tribal consultation sessions."
  }
];

const riskColors = {
  "Legal": "bg-red-100 text-red-700 border-red-300",
  "Environmental": "bg-green-100 text-green-700 border-green-300",
  "Consultation": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Political": "bg-pink-100 text-pink-700 border-pink-300",
  "Reputational": "bg-purple-100 text-purple-700 border-purple-300",
  "ESG": "bg-indigo-100 text-indigo-700 border-indigo-300",
  "Regulatory": "bg-blue-100 text-blue-700 border-blue-300"
};

export default function GeoTemporalRiskMap() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [filtered, setFiltered] = useState(issuesData);

  const handleFilter = () => {
    let data = issuesData;
    if (country) data = data.filter(i => i.country === country);
    if (region) data = data.filter(i => i.region.toLowerCase().includes(region.toLowerCase()));
    setFiltered(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-8 pb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">Indigenous Broadcasting Legal Intelligence</h1>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          Surface regulatory sentiment, FPIC breaches, and legal red flags from Indigenous radio networks across high-risk regions.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-gray-700"
        >
          <option value="">All Countries</option>
          <option value="India">India</option>
          <option value="Mexico">Mexico</option>
          <option value="Canada">Canada</option>
        </select>
        <input
          value={region}
          onChange={e => setRegion(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 text-gray-700"
          placeholder="Filter by region"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-medium"
        >
          Filter
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((issue, idx) => (
          <div key={idx} className="bg-white shadow rounded-lg p-5 border-l-4 border-blue-500 space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">{issue.headline}</h2>
            <div className="text-sm text-gray-500">
              {issue.station} &middot; {issue.region}, {issue.country} — {issue.date}
            </div>
            <p className="text-sm text-gray-700">{issue.details}</p>
            <div className="flex flex-wrap gap-2">
              {issue.risk.map((r, i) => (
                <Badge key={i} variant="outline" className={`${riskColors[r]} px-2 py-1 text-xs font-semibold`}>
                  {r}
                </Badge>
              ))}
            </div>
            <p className="text-sm"><span className="font-semibold">Sentiment:</span> {issue.sentiment}</p>
            <p className="text-sm"><span className="font-semibold">Consultation Status:</span> {issue.consultPeriod}</p>
            <p className="text-sm"><span className="font-semibold">Legal Flags:</span> {issue.legalFlags.join(", ")}</p>
            <p className="text-sm"><span className="font-semibold">Action:</span> {issue.action}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
