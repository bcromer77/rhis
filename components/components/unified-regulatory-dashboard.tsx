"use client";

import LegalVectorSearchBar from "@/components/mock/LegalVectorSearchBar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VectorSearch } from "@/components/vector-search";
import { Search } from "lucide-react";

export function UnifiedRegulatoryDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Regulatory Intelligence Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LegalVectorSearchBar />
          <VectorSearch />
        </CardContent>
      </Card>
    </div>
  );
}

