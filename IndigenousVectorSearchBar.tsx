"use client";
import React, { useState } from "react";
import IndigenousVectorSearchBar from "../../components/IndigenousVectorSearchBar"; // Adjust path as needed

// Define risk types
type RiskType =
  | "Legal"
  | "Environmental"
  | "Consultation"
  | "Community担保
  | "Community Relations"
  | "Reputational"
  | "Operational"
  | "Privacy"
  | "Land Rights"
  | "Health";

// Define risk colors with strict typing
const riskColors: Record<RiskType, string> = {
  Legal: "bg-red-100 text-red-700 border-red-300",
  Environmental: "bg-green-100 text-green-700 border-green-300",
  Consultation: "bg-blue-100 text-blue-700 border-blue-300",
  "Community Relations": "bg-yellow-100 text-yellow-700 border-yellow-300",
  Reputational: "bg-purple-100 text-purple-700 border-purple-300",
  Operational: "bg-orange-100 text-orange-700 border-orange-300",
  Privacy: "bg-gray-100 text-gray-700 border-gray-300",
  "Land Rights": "bg-teal-100 text-teal-700 border-teal-300",
  Health: "bg-pink-100 text-pink-700 border-pink-300",
};

// Mock issues data
const issuesData = [
  {
    headline: "Sample Issue",
    station: "RHIS Monitoring",
    date: "2025-07-15",
    details: "Sample issue details.",
    legalFlags: ["Legal", "Consultation"],
    risk: ["Environmental"],
    issueType: ["Legal", "Environmental"],
    region: "Sinaloa",
    country: "Mexico",
    predictiveAlert: "70% ± 7% likelihood of issue escalation.",
  },
];

const IndigenousBroadcastingPage = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("All");

  // Example rendering of results with tags
  const renderResults = (results: any[]) => {
    return results.map((result, idx) => (
      <div key={idx} className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
        <h3>{result.headline}</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {result.issueType.map((r: string, i: number) => (
            <span
              key={i}
              className={`px-2 py-1 rounded border text-xs font-semibold ${
                riskColors[r as RiskType] || "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {r}
            </span>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Indigenous Broadcasting Dashboard
      </h1>
      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="">All Regions</option>
        <option value="Sinaloa">Sinaloa</option>
        <option value="EU">EU</option>
        <option value="Global">Global</option>
      </select>
      <select
        value={selectedTab}
        onChange={(e) => setSelectedTab(e.target.value)}
        className="p-2 border border-gray-300 rounded-lg"
      >
        <option value="All">All Issues</option>
        <option value="Legal">Legal</option>
        <option value="Environmental">Environmental</option>
        <option value="Consultation">Consultation</option>
      </select>
      <IndigenousVectorSearchBar
        issuesData={issuesData}
        selectedRegion={selectedRegion}
        selectedTab={selectedTab}
      />
      {renderResults(issuesData)}
    </div>
  );
};

export default IndigenousBroadcastingPage;
