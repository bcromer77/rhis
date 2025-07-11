export interface HeatmapInsight {
  title: string
  location: string
  category: string
  riskLevel: "low" | "medium" | "high"
  impact: string
  politician: string
  date: string
  source: string
}

export const enhancedHeatmapData: HeatmapInsight[] = [
  {
    title: "New Environmental Impact Assessment Requirements for Coal Mining",
    location: "India",
    category: "Environmental",
    riskLevel: "high",
    impact:
      "Stricter environmental impact assessment requirements for coal mining operations mandate comprehensive biodiversity studies, water quality assessments, and community consultation processes.",
    politician: "Pawan Kalyan",
    date: "2024-01-15",
    source: "Ministry of Environment, Forest and Climate Change",
  },
  {
    title: "Gold Mining Royalty Rate Adjustment Proposal",
    location: "Canada",
    category: "Economic",
    riskLevel: "medium",
    impact:
      "Provincial government considering 15% increase in gold mining royalty rates to fund infrastructure development with new taxation frameworks.",
    politician: "Doug Ford",
    date: "2024-01-20",
    source: "Ontario Ministry of Northern Development",
  },
  {
    title: "Indigenous Land Rights Consultation Framework for Mining",
    location: "Canada",
    category: "Regulatory",
    riskLevel: "high",
    impact:
      "New mandatory consultation process for mining permits on traditional territories requiring free, prior, and informed consent from Indigenous communities.",
    politician: "Jagmeet Singh",
    date: "2024-01-25",
    source: "Crown-Indigenous Relations and Northern Affairs Canada",
  },
  {
    title: "Carbon Emissions Reduction Targets for Steel Industry",
    location: "European Union",
    category: "Environmental",
    riskLevel: "high",
    impact:
      "New carbon emissions reduction targets for steel production facilities requiring 40% reduction by 2030 or face significant carbon tax penalties.",
    politician: "European Commission",
    date: "2024-02-01",
    source: "European Commission",
  },
  {
    title: "Land Acquisition Protests in Andhra Pradesh Mining Regions",
    location: "India",
    category: "Regulatory",
    riskLevel: "high",
    impact:
      "Protests against forced land acquisition for mining projects demanding fair compensation and environmental protection measures.",
    politician: "Pawan Kalyan",
    date: "2024-02-10",
    source: "Jana Sena Party Press Release",
  },
  {
    title: "Brazil Amazon Mining Restrictions",
    location: "Brazil",
    category: "Environmental",
    riskLevel: "high",
    impact:
      "Stricter mining restrictions in Amazon regions with mandatory reforestation and indigenous consultation requirements.",
    politician: "Marina Silva",
    date: "2024-02-15",
    source: "Brazilian Environmental Ministry",
  },
  {
    title: "Mexico Green Energy Transition Excludes Mining",
    location: "Mexico",
    category: "Economic",
    riskLevel: "medium",
    impact:
      "Mining excluded from Mexico's top 100 priority projects, focusing instead on renewable energy and sustainable development.",
    politician: "Claudia Sheinbaum",
    date: "2024-02-20",
    source: "Mexican Presidency",
  },
  {
    title: "Steel Industry Carbon Tax Reform",
    location: "Global",
    category: "Environmental",
    riskLevel: "high",
    impact:
      "Demands for immediate implementation of carbon border adjustments for steel imports, targeting high-emission producers globally.",
    politician: "Greta Thunberg",
    date: "2024-02-25",
    source: "Fridays for Future International",
  },
]

export function getRiskStatistics() {
  const total = enhancedHeatmapData.length
  const riskCounts = enhancedHeatmapData.reduce(
    (acc, item) => {
      acc[item.riskLevel]++
      return acc
    },
    { low: 0, medium: 0, high: 0 },
  )

  return {
    total,
    low: riskCounts.low,
    medium: riskCounts.medium,
    high: riskCounts.high,
    lowPercentage: Math.round((riskCounts.low / total) * 100),
    mediumPercentage: Math.round((riskCounts.medium / total) * 100),
    highPercentage: Math.round((riskCounts.high / total) * 100),
  }
}

export function getCategoryRiskDistribution() {
  const categoryTotals = enhancedHeatmapData.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return categoryTotals
}
