k"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from "lucide-react"
import IndigenousVectorSearchBar from "@/components/IndigenousVectorSearchBar"

export default function UnifiedRegulatoryDashboard() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Vector Search & Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <IndigenousVectorSearchBar />
        </CardContent>
      </Card>
    </div>
  )
}
