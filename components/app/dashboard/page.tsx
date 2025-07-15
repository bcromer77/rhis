"use client";

import { UnifiedRegulatoryDashboard } from "@/components/unified-regulatory-dashboard";
import LegalVectorSearchBar from "@/components/mock/LegalVectorSearchBar";

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 border-b border-slate-200 bg-white">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Unified Legal Dashboard</h1>
        <p className="text-slate-600">Vector search powered by legal intelligence mock data for compliance teams</p>
      </div>

      <div className="p-6">
        <LegalVectorSearchBar />
      </div>

      <div className="p-6">
        <UnifiedRegulatoryDashboard />
      </div>
    </div>
  );
}

