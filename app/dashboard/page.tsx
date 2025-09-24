"use client";

import UnifiedRegulatoryDashboard from "@/components/unified-regulatory-dashboard";
import LegalVectorSearchBar from "@/components/mock/LegalVectorSearchBar";

export default function Page() {
  return (
    <div className="p-4">
      <LegalVectorSearchBar />
      <UnifiedRegulatoryDashboard />
    </div>
  );
}
