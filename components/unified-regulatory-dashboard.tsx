"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VectorSearch } from "@/components/vector-search";
import { AlertTriangle, Search, TrendingUp, Globe, Users } from "lucide-react";

interface UnifiedRegulatoryDashboardProps {
  initialView?: "split" | "full";
}

export default function UnifiedRegulatoryDashboard({
  initialView = "split",
}: UnifiedRegulatoryDashboardProps) {
  const [viewMode, setViewMode] = useState<"split" | "full">(initialView);
  const [activeTab, setActiveTab] = useState("search");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Unified Regulatory Intelligence Dashboard
              </h1>
              <p className="text-slate-600">
                Comprehensive risk monitoring and analysis platform
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "split" ? "default" : "outline"}
                onClick={() => setViewMode("split")}
                size="sm"
              >
                Split View
              </Button>
              <Button
                variant={viewMode === "full" ? "default" : "outline"}
                onClick={() => setViewMode("full")}
                size="sm"
              >
                Full View
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-lg font-bold text-slate-800">23</div>
                  <div className="text-sm text-slate-600">High Risk Alerts</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="text-lg font-bold text-slate-800">847</div>
                  <div className="text-sm text-slate-600">Active Regulations</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-lg font-bold text-slate-800">156</div>
                  <div className="text-sm text-slate-600">Political Profiles</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <div>
                  <div className="text-lg font-bold text-slate-800">12</div>
                  <div className="text-sm text-slate-600">Countries Monitored</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {viewMode === "split" ? (
          <Card className="h-[800px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Vector Search & Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <VectorSearch />
            </CardContent>
          </Card>
        ) : (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="search" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Vector Search
              </TabsTrigger>
            </TabsList>
            <TabsContent value="search" className="mt-6">
              <VectorSearch />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
