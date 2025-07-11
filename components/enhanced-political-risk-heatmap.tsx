"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, Users, Globe, Activity, Shield } from "lucide-react"

interface PoliticalRiskData {
  country: string
  riskScore: number
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  keyFactors: string[]
  recentEvents: string[]
  activists: {
    name: string
    influence: number
    recentActivity: string
    riskLevel: "Low" | "Medium" | "High"
  }[]
}

export function EnhancedPoliticalRiskHeatmap() {
  const [selectedCountry, setSelectedCountry] = useState<string>("India")
  const [riskData, setRiskData] = useState<PoliticalRiskData[]>([])

  useEffect(() => {
    // Mock data with Pawan Kalyan and other activists
    const mockData: PoliticalRiskData[] = [
      {
        country: "India",
        riskScore: 75,
        riskLevel: "High",
        keyFactors: ["Political fragmentation", "Regional tensions", "Economic inequality"],
        recentEvents: [
          "Andhra Pradesh political realignment",
          "Jana Sena Party coalition discussions",
          "Agricultural policy protests",
        ],
        activists: [
          {
            name: "Pawan Kalyan",
            influence: 85,
            recentActivity: "Leading Jana Sena Party political campaigns and social justice initiatives",
            riskLevel: "High",
          },
          {
            name: "Medha Patkar",
            influence: 70,
            recentActivity: "Environmental activism and dam displacement protests",
            riskLevel: "Medium",
          },
          {
            name: "Aruna Roy",
            influence: 65,
            recentActivity: "Right to Information advocacy and transparency campaigns",
            riskLevel: "Medium",
          },
        ],
      },
      {
        country: "United States",
        riskScore: 60,
        riskLevel: "Medium",
        keyFactors: ["Political polarization", "Electoral disputes", "Social unrest"],
        recentEvents: [
          "Congressional gridlock on key legislation",
          "State-level voting rights disputes",
          "Climate policy debates",
        ],
        activists: [
          {
            name: "Greta Thunberg",
            influence: 90,
            recentActivity: "Climate change advocacy and youth mobilization",
            riskLevel: "High",
          },
          {
            name: "Black Lives Matter Leaders",
            influence: 80,
            recentActivity: "Social justice campaigns and police reform advocacy",
            riskLevel: "High",
          },
        ],
      },
      {
        country: "Brazil",
        riskScore: 80,
        riskLevel: "High",
        keyFactors: ["Amazon deforestation", "Indigenous rights", "Political corruption"],
        recentEvents: [
          "Supreme Court environmental rulings",
          "Indigenous land rights protests",
          "Anti-corruption investigations",
        ],
        activists: [
          {
            name: "Raoni Metuktire",
            influence: 75,
            recentActivity: "Indigenous rights advocacy and Amazon protection",
            riskLevel: "High",
          },
        ],
      },
    ]
    setRiskData(mockData)
  }, [])

  const selectedData = riskData.find((data) => data.country === selectedCountry)

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Critical":
        return "bg-red-600"
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Country Selection */}
      <Card className="bg-white border-slate-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-slate-800 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Political Risk Analysis
          </CardTitle>
          <CardDescription className="text-slate-600">
            Select a country to view detailed political risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 flex-wrap">
            {riskData.map((data) => (
              <Button
                key={data.country}
                variant={selectedCountry === data.country ? "default" : "outline"}
                onClick={() => setSelectedCountry(data.country)}
                className={
                  selectedCountry === data.country
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100"
                }
              >
                {data.country}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedData && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white border-slate-200">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="activists" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Key Activists
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Recent Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Risk Score Card */}
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    {selectedData.country} Risk Assessment
                  </span>
                  <Badge className={getRiskColor(selectedData.riskLevel)}>{selectedData.riskLevel} Risk</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-slate-600 mb-2">
                      <span>Risk Score</span>
                      <span>{selectedData.riskScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${getRiskColor(selectedData.riskLevel)}`}
                        style={{ width: `${selectedData.riskScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-800 font-semibold mb-2">Key Risk Factors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedData.keyFactors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-slate-600 border-slate-300">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activists" className="space-y-4">
            <div className="grid gap-4">
              {selectedData.activists.map((activist, index) => (
                <Card key={index} className="bg-white border-slate-200 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-slate-800 flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          {activist.name}
                        </CardTitle>
                        <CardDescription className="text-slate-600">
                          Influence Score: {activist.influence}/100
                        </CardDescription>
                      </div>
                      <Badge className={getRiskColor(activist.riskLevel)}>{activist.riskLevel} Impact</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 mb-3">{activist.recentActivity}</p>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: `${activist.influence}%` }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card className="bg-white border-slate-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800 flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Political Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedData.recentEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-slate-700">{event}</p>
                        <p className="text-sm text-slate-500 mt-1">
                          Impact Assessment: Monitoring for business implications
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
