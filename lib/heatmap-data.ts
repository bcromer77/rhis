import { mockInsights } from "./mock-insights"

export interface HeatmapInsight {
  title: string
  category: "Economic" | "Environmental" | "Regulatory"
  riskLevel: "low" | "medium" | "high"
  impact: string
  location: string
  sentiment: "Supportive" | "Neutral" | "Negative"
  date: string
  politician: string
  citation: string
  coordinates?: [number, number] // [latitude, longitude]
}

// Function to calculate risk level based on sentiment and category
function calculateRiskLevel(
  sentiment: "Supportive" | "Neutral" | "Negative",
  category: "Economic" | "Environmental" | "Regulatory",
): "low" | "medium" | "high" {
  // Environmental regulations tend to be higher risk due to compliance costs
  if (category === "Environmental") {
    if (sentiment === "Negative") return "high"
    if (sentiment === "Neutral") return "high"
    return "medium"
  }

  // Regulatory changes can be medium to high risk
  if (category === "Regulatory") {
    if (sentiment === "Negative") return "high"
    if (sentiment === "Neutral") return "medium"
    return "low"
  }

  // Economic policies - supportive ones are opportunities (low risk)
  if (category === "Economic") {
    if (sentiment === "Supportive") return "low"
    if (sentiment === "Neutral") return "medium"
    return "high"
  }

  return "medium"
}

// Transform regulatory insights into heatmap data
export const heatmapData: HeatmapInsight[] = mockInsights.map((insight) => ({
  title: insight.title,
  category: insight.category,
  riskLevel: calculateRiskLevel(insight.sentiment, insight.category),
  impact: insight.impact,
  location: "India", // All insights are India-focused for ArcelorMittal
  sentiment: insight.sentiment,
  date: insight.date,
  politician: insight.politician,
  citation: insight.citation,
  coordinates: [20.5937, 78.9629], // Center of India coordinates
}))

// Additional heatmap data with specific locations for ArcelorMittal operations
export const enhancedHeatmapData: HeatmapInsight[] = [
  {
    title: "Indian Railways Infrastructure Expansion",
    category: "Economic",
    riskLevel: "low",
    impact: "Enhanced supply chain efficiency for steel transportation",
    location: "Pan-India",
    sentiment: "Supportive",
    date: "2025-03-18",
    politician: "Pratap C. Sarangi",
    citation: "Transcript from Demands for Grants under the Ministry of Railways for 2025-26",
    coordinates: [20.5937, 78.9629],
  },
  {
    title: "Environmental Compliance and New Regulations",
    category: "Environmental",
    riskLevel: "high",
    impact: "Increased operational costs due to new environmental regulations",
    location: "Jharkhand",
    sentiment: "Neutral",
    date: "2025-03-08",
    politician: "Dr. Bhupender Yadav",
    citation: "Environment Committee Proceedings",
    coordinates: [23.6102, 85.2799],
  },
  {
    title: "Steel Export Incentives Package",
    category: "Economic",
    riskLevel: "low",
    impact: "Boost to steel exports and international competitiveness",
    location: "Odisha",
    sentiment: "Supportive",
    date: "2025-03-15",
    politician: "Shri Piyush Goyal",
    citation: "Ministry of Commerce and Industry Budget Session",
    coordinates: [20.9517, 85.0985],
  },
  {
    title: "Mining Lease Renewal Delays",
    category: "Regulatory",
    riskLevel: "high",
    impact: "Potential disruption to iron ore supply chain",
    location: "Chhattisgarh",
    sentiment: "Negative",
    date: "2025-03-02",
    politician: "Dr. Sangeeta Balwant",
    citation: "Parliamentary Question Hour on Mining Affairs",
    coordinates: [21.2787, 81.8661],
  },
  {
    title: "Port Infrastructure Development",
    category: "Economic",
    riskLevel: "low",
    impact: "Reduced logistics costs for steel exports",
    location: "West Bengal",
    sentiment: "Supportive",
    date: "2025-03-05",
    politician: "Shri Sarbananda Sonowal",
    citation: "Ministry of Ports, Shipping and Waterways Budget Discussion",
    coordinates: [22.9868, 87.855],
  },
  {
    title: "Carbon Emission Standards",
    category: "Environmental",
    riskLevel: "high",
    impact: "Required investment in cleaner technologies",
    location: "Gujarat",
    sentiment: "Neutral",
    date: "2025-03-08",
    politician: "Dr. Bhupender Yadav",
    citation: "Environment Committee Proceedings",
    coordinates: [23.0225, 72.5714],
  },
]

// Risk level statistics
export const getRiskStatistics = () => {
  const stats = enhancedHeatmapData.reduce(
    (acc, item) => {
      acc[item.riskLevel]++
      acc.total++
      return acc
    },
    { low: 0, medium: 0, high: 0, total: 0 },
  )

  return {
    ...stats,
    lowPercentage: Math.round((stats.low / stats.total) * 100),
    mediumPercentage: Math.round((stats.medium / stats.total) * 100),
    highPercentage: Math.round((stats.high / stats.total) * 100),
  }
}

// Category-wise risk distribution
export const getCategoryRiskDistribution = () => {
  const distribution = enhancedHeatmapData.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { low: 0, medium: 0, high: 0, total: 0 }
      }
      acc[item.category][item.riskLevel]++
      acc[item.category].total++
      return acc
    },
    {} as Record<string, { low: number; medium: number; high: number; total: number }>,
  )

  return distribution
}
