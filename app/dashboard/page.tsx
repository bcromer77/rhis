"use client";

import React, { useState } from "react";
import IndigenousVectorSearchBar from "@/components/mock/IndigenousVectorSearchBar";

export default function DashboardPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-4xl font-bold">PRISM Search</h1>
        <p className="text-lg">AI-powered legal, regulatory, ESG, and Indigenous vector insights</p>
      </header>

      <IndigenousVectorSearchBar
        issuesData={[]} // Replace with MongoDB or API feed later
        selectedRegion={selectedRegion}
        selectedTab={selectedTab}
      />
    </div>
  );
}

