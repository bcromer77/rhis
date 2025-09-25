"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Calendar, Building, TrendingUp, ExternalLink, Globe, DollarSign } from "lucide-react"

interface CrisisCardProps {
  _id: string
  company: string
  signal: string
  description?: string
  why_traders_care?: string
  country?: string
  commodity?: string[]
  tickers?: string[]
  severity?: string
  sentiment?: number
  who_loses?: string
  who_wins?: string
  source?: string
  date?: string
  _score?: number
  index?: number
}

export default function CrisisCard({ 
  company,
  signal,
  description,
  why_traders_care,
  country,
  commodity,
  tickers,
  severity,
  sentiment,
  who_loses,
  who_wins,
  source,
  date,
  index = 0
}: CrisisCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-100 text-red-800 border-red-200"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "OPPORTUNITY":
        return "bg-green-100 text-green-800 border-green-200"
      case "INFO":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSentimentIcon = (sentiment: number) => {
    if (sentiment > 0.3) return "📈"
    if (sentiment < -0.3) return "📉"
    return "➖"
  }

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.3) return "bg-green-100 text-green-700"
    if (sentiment < -0.3) return "bg-red-100 text-red-700"
    return "bg-yellow-100 text-yellow-700"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      <Card className="crisis-card bg-white border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 leading-tight">{signal}</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Building className="h-3 w-3" />
                  {company}
                </div>
                {date && (
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(date).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-4">
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </div>
          )}

          {/* Why Traders Care */}
          {why_traders_care && (
            <div className="mb-4 p-3 bg-slate-50 rounded-lg border-l-4 border-l-blue-400">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">Market Impact</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{why_traders_care}</p>
            </div>
          )}

          {/* Metadata Row */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {country && (
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <Globe className="h-3 w-3" />
                  {country}
                </div>
              )}
              {tickers && tickers.length > 0 && (
                <div className="flex items-center gap-1 text-xs text-slate-600">
                  <DollarSign className="h-3 w-3" />
                  {tickers.join(", ")}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {typeof sentiment === "number" && (
                <div className="flex items-center gap-1">
                  <span className="text-sm">{getSentimentIcon(sentiment)}</span>
                  <Badge className={`${getSentimentColor(sentiment)} text-xs font-medium`}>
                    {sentiment > 0 ? "Positive" : sentiment < 0 ? "Negative" : "Neutral"}
                  </Badge>
                </div>
              )}
              {severity && (
                <Badge className={`${getSeverityColor(severity)} text-xs font-medium`}>
                  {severity}
                </Badge>
              )}
            </div>
          </div>

          {/* Winners & Losers */}
          {(who_wins || who_loses) && (
            <div className="mb-4 space-y-2">
              {who_wins && (
                <div className="text-xs">
                  <span className="text-green-600 font-medium">✅ Winners: </span>
                  <span className="text-slate-600">{who_wins}</span>
                </div>
              )}
              {who_loses && (
                <div className="text-xs">
                  <span className="text-red-600 font-medium">❌ Losers: </span>
                  <span className="text-slate-600">{who_loses}</span>
                </div>
              )}
            </div>
          )}

          {/* Commodities */}
          {commodity && commodity.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {commodity.map((item, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Source */}
          <div className="pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">
                {source || "PRISM Intelligence"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
