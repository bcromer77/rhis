"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Scale, Clock } from "lucide-react"

export default function QuotaPrecedentSignal() {
  return (
    <Card className="w-full border-l-4 border-l-amber-500 bg-gradient-to-r from-amber-50 to-orange-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Scale className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-amber-900">Legal Precedent Alert</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="h-4 w-4 text-amber-600" />
                <span className="text-sm text-amber-700">Active Monitoring</span>
              </div>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            High Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-white/60 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-2">H.R.1 §359k: Quota Enforcement Doctrine Established</h3>
            <p className="text-sm text-amber-800 mb-3">
              U.S. House legislation establishes precedent for quota reallocation and purity enforcement under sugar law
              framework. This creates legal template applicable to industrial inputs including mineral ores and steel
              components.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                Quota Law
              </Badge>
              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                Enforcement Template
              </Badge>
              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                Industrial Precedent
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-3 bg-white/40 rounded-lg">
              <div className="font-semibold text-amber-900">Legal Impact</div>
              <div className="text-amber-700">Template for mineral quotas</div>
            </div>
            <div className="text-center p-3 bg-white/40 rounded-lg">
              <div className="font-semibold text-amber-900">Enforcement Risk</div>
              <div className="text-amber-700">Purity standards precedent</div>
            </div>
            <div className="text-center p-3 bg-white/40 rounded-lg">
              <div className="font-semibold text-amber-900">Timeline</div>
              <div className="text-amber-700">Immediate application</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
