"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, User, TrendingUp, ExternalLink, FileText } from "lucide-react"

interface RegulatoryInsight {
  title: string
  category: "Economic" | "Environmental" | "Regulatory"
  description: string
  impact: string
  date: string
  politician: string
  sentiment: "Supportive" | "Neutral" | "Negative"
  citation: string
}

interface RegulatoryCardProps {
  insight: RegulatoryInsight
  index?: number
}

export function RegulatoryCard({ insight, index = 0 }: RegulatoryCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Economic":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Environmental":
        return "bg-green-100 text-green-800 border-green-200"
      case "Regulatory":
        return "bg-slate-100 text-slate-800 border-slate-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Supportive":
        return "bg-green-100 text-green-700"
      case "Neutral":
        return "bg-yellow-100 text-yellow-700"
      case "Negative":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "Supportive":
        return "👍"
      case "Neutral":
        return "➖"
      case "Negative":
        return "👎"
      default:
        return "❓"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <Card className="regulatory-card bg-white border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 leading-tight">{insight.title}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${getCategoryColor(insight.category)} font-medium`}>{insight.category}</Badge>
                <div className="flex items-center gap-1 text-sm text-slate-500">
                  <Calendar className="h-3 w-3" />
                  {new Date(insight.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-slate-600 text-sm leading-relaxed">{insight.description}</p>
          </div>

          {/* Impact */}
          <div className="mb-4 p-3 bg-slate-50 rounded-lg border-l-4 border-l-orange-400">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-slate-700">Impact Analysis</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{insight.impact}</p>
          </div>

          {/* Politician & Sentiment */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">{insight.politician}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">{getSentimentIcon(insight.sentiment)}</span>
              <Badge className={`${getSentimentColor(insight.sentiment)} text-xs font-medium`}>
                {insight.sentiment}
              </Badge>
            </div>
          </div>

          {/* Citation */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-slate-500" />
              <button className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center gap-1">
                {insight.citation}
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
