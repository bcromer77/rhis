"use client";

import UnifiedRegulatoryDashboard from "@/components/unified-regulatory-dashboard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function UnifiedDashboardPage() {
  return (
    <div className="h-screen bg-slate-50">
      {/* Quick Navigation */}
      <div className="absolute top-4 left-4 z-10">
        <Button variant="ghost" size="sm" asChild>
          <a href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Main
          </a>
        </Button>
      </div>

      <UnifiedRegulatoryDashboard initialView="split" />
    </div>
  );
}
