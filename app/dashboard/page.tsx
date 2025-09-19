<<<<<<< HEAD
import UnifiedRegulatoryDashboard from "@/components/unified-regulatory-dashboard"

export default function DashboardPage() {
  return <UnifiedRegulatoryDashboard />
}
=======
"use client";

import dynamic from "next/dynamic";

// Dynamically import the component to disable SSR
const IndigenousVectorSearchBar = dynamic(
  () => import("@/components/mock/IndigenousVectorSearchBar"),
  { ssr: false }
);

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

>>>>>>> origin/main
