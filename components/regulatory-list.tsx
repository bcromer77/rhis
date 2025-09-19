"use client"
import { RegulatoryCard } from "./regulatory-card"

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

interface RegulatoryListProps {
  insights: RegulatoryInsight[]
}

export function RegulatoryList({ insights }: RegulatoryListProps) {
  return (
    <div className="regulatory-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, index) => (
        <RegulatoryCard key={index} insight={insight} index={index} />
      ))}
    </div>
  )
}
