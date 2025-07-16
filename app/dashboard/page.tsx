"use client";

import IndigenousVectorSearchBar from "@/components/mock/IndigenousVectorSearchBar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <IndigenousVectorSearchBar
          issuesData={[]}
          selectedRegion=""
          selectedTab="All"
        />
      </div>
    </div>
  );
}

