export interface GlobalPoliticalProfile {
  id: string
  name: string
  position: string
  country: string
  region: string
  riskLevel: "Low" | "Medium" | "High" | "Critical"
  influenceScore: number
  recentStatement: string
  lastActivity: string
  keyIssues: string[]
  trendingScore: number
  lastUpdated: string
}

export const globalPoliticalProfiles: GlobalPoliticalProfile[] = [
  {
    id: "1",
    name: "Pawan Kalyan",
    position: "Deputy Chief Minister & Actor-Politician",
    country: "India",
    region: "Asia",
    riskLevel: "High",
    influenceScore: 85,
    recentStatement:
      "We must protect our natural resources from corporate exploitation and ensure sustainable development for future generations.",
    lastActivity: "2 days ago",
    keyIssues: ["Environmental Protection", "Land Rights", "Corporate Accountability", "Sustainable Development"],
    trendingScore: 92,
    lastUpdated: "Dec 15, 2024",
  },
  {
    id: "2",
    name: "Greta Thunberg",
    position: "Climate Activist",
    country: "Sweden",
    region: "Europe",
    riskLevel: "Critical",
    influenceScore: 95,
    recentStatement:
      "The climate crisis demands immediate action. We cannot allow corporate interests to override our planet's future.",
    lastActivity: "1 day ago",
    keyIssues: ["Climate Change", "Corporate Responsibility", "Youth Activism", "Environmental Justice"],
    trendingScore: 98,
    lastUpdated: "Dec 16, 2024",
  },
  {
    id: "3",
    name: "Alexandria Ocasio-Cortez",
    position: "U.S. Representative",
    country: "United States",
    region: "North America",
    riskLevel: "High",
    influenceScore: 88,
    recentStatement:
      "Green New Deal policies are essential for transitioning to renewable energy and creating sustainable jobs.",
    lastActivity: "3 hours ago",
    keyIssues: ["Green New Deal", "Environmental Justice", "Corporate Regulation", "Climate Policy"],
    trendingScore: 89,
    lastUpdated: "Dec 16, 2024",
  },
  {
    id: "4",
    name: "Vandana Shiva",
    position: "Environmental Activist & Author",
    country: "India",
    region: "Asia",
    riskLevel: "Medium",
    influenceScore: 78,
    recentStatement:
      "Biodiversity and seed sovereignty are fundamental rights that must be protected from corporate monopolization.",
    lastActivity: "1 week ago",
    keyIssues: ["Biodiversity", "Seed Sovereignty", "Sustainable Agriculture", "Corporate Monopolies"],
    trendingScore: 72,
    lastUpdated: "Dec 10, 2024",
  },
  {
    id: "5",
    name: "Berta Cáceres",
    position: "Indigenous Rights Activist (Legacy)",
    country: "Honduras",
    region: "Central America",
    riskLevel: "Critical",
    influenceScore: 90,
    recentStatement: "Our rivers are sacred. We will defend them with our lives against destructive dam projects.",
    lastActivity: "Legacy impact",
    keyIssues: ["Indigenous Rights", "Water Protection", "Anti-Dam Activism", "Environmental Justice"],
    trendingScore: 85,
    lastUpdated: "Dec 1, 2024",
  },
  {
    id: "6",
    name: "Marina Silva",
    position: "Former Environment Minister",
    country: "Brazil",
    region: "South America",
    riskLevel: "High",
    influenceScore: 82,
    recentStatement:
      "The Amazon rainforest is not just Brazil's heritage, but the world's lung that must be preserved.",
    lastActivity: "5 days ago",
    keyIssues: ["Amazon Protection", "Deforestation", "Climate Policy", "Sustainable Development"],
    trendingScore: 79,
    lastUpdated: "Dec 12, 2024",
  },
  {
    id: "7",
    name: "David Suzuki",
    position: "Environmental Scientist & Activist",
    country: "Canada",
    region: "North America",
    riskLevel: "Medium",
    influenceScore: 75,
    recentStatement:
      "Science clearly shows that continued fossil fuel expansion is incompatible with climate stability.",
    lastActivity: "4 days ago",
    keyIssues: ["Climate Science", "Fossil Fuel Opposition", "Environmental Education", "Policy Reform"],
    trendingScore: 68,
    lastUpdated: "Dec 13, 2024",
  },
  {
    id: "8",
    name: "Naomi Klein",
    position: "Author & Anti-Globalization Activist",
    country: "Canada",
    region: "North America",
    riskLevel: "High",
    influenceScore: 84,
    recentStatement:
      "Climate change is not just an environmental issue, it's about economic justice and corporate power.",
    lastActivity: "2 days ago",
    keyIssues: ["Climate Justice", "Anti-Globalization", "Corporate Power", "Economic Reform"],
    trendingScore: 87,
    lastUpdated: "Dec 15, 2024",
  },
  {
    id: "9",
    name: "Wangari Maathai",
    position: "Nobel Laureate (Legacy)",
    country: "Kenya",
    region: "Africa",
    riskLevel: "Medium",
    influenceScore: 88,
    recentStatement: "When we plant trees, we plant the seeds of peace and hope for future generations.",
    lastActivity: "Legacy impact",
    keyIssues: ["Reforestation", "Women's Rights", "Environmental Conservation", "Peace Building"],
    trendingScore: 75,
    lastUpdated: "Dec 1, 2024",
  },
  {
    id: "10",
    name: "Bill McKibben",
    position: "Climate Activist & Author",
    country: "United States",
    region: "North America",
    riskLevel: "High",
    influenceScore: 80,
    recentStatement:
      "The fossil fuel industry's influence on politics must end if we're to address the climate crisis effectively.",
    lastActivity: "1 day ago",
    keyIssues: ["Climate Activism", "Fossil Fuel Divestment", "Political Reform", "Environmental Advocacy"],
    trendingScore: 83,
    lastUpdated: "Dec 16, 2024",
  },
]

// Global risk analysis functions
export const getGlobalRiskStatistics = () => {
  const stats = globalPoliticalProfiles.reduce(
    (acc, profile) => {
      acc[profile.riskLevel.toLowerCase()]++
      acc.total++
      acc.totalRiskScore += profile.influenceScore
      return acc
    },
    { low: 0, medium: 0, high: 0, critical: 0, total: 0, totalRiskScore: 0 },
  )

  return {
    ...stats,
    averageRiskScore: Math.round(stats.totalRiskScore / stats.total),
    lowPercentage: Math.round((stats.low / stats.total) * 100),
    mediumPercentage: Math.round((stats.medium / stats.total) * 100),
    highPercentage: Math.round((stats.high / stats.total) * 100),
    criticalPercentage: Math.round((stats.critical / stats.total) * 100),
  }
}

// Country-wise risk analysis
export const getCountryRiskAnalysis = () => {
  const countryRisks = globalPoliticalProfiles.reduce(
    (acc, profile) => {
      if (!acc[profile.country]) {
        acc[profile.country] = {
          profiles: [],
          totalScore: 0,
          highestRisk: 0,
          profileCount: 0,
          averageScore: 0,
        }
      }
      acc[profile.country].profiles.push(profile)
      acc[profile.country].totalScore += profile.influenceScore
      acc[profile.country].highestRisk = Math.max(acc[profile.country].highestRisk, profile.influenceScore)
      acc[profile.country].profileCount++
      return acc
    },
    {} as Record<
      string,
      {
        profiles: GlobalPoliticalProfile[]
        totalScore: number
        highestRisk: number
        profileCount: number
        averageScore: number
      }
    >,
  )

  // Calculate average risk score per country
  Object.keys(countryRisks).forEach((country) => {
    countryRisks[country].averageScore = Math.round(
      countryRisks[country].totalScore / countryRisks[country].profileCount,
    )
  })

  return countryRisks
}

// Risk category analysis
export const getRiskCategoryAnalysis = () => {
  const categoryTotals = globalPoliticalProfiles.reduce(
    (acc, profile) => {
      acc.landAcquisition += profile.keyIssues.includes("Land Rights") ? 1 : 0
      acc.environmentalRegulation +=
        profile.keyIssues.includes("Environmental Protection") ||
        profile.keyIssues.includes("Climate Change") ||
        profile.keyIssues.includes("Deforestation")
          ? 1
          : 0
      acc.socialUnrest +=
        profile.keyIssues.includes("Social Justice") ||
        profile.keyIssues.includes("Youth Empowerment") ||
        profile.keyIssues.includes("Women's Rights")
          ? 1
          : 0
      acc.policyShifts +=
        profile.keyIssues.includes("Policy Reform") || profile.keyIssues.includes("Corporate Regulation") ? 1 : 0
      return acc
    },
    { landAcquisition: 0, environmentalRegulation: 0, socialUnrest: 0, policyShifts: 0 },
  )

  const profileCount = globalPoliticalProfiles.length
  return {
    landAcquisition: Math.round(categoryTotals.landAcquisition / profileCount),
    environmentalRegulation: Math.round(categoryTotals.environmentalRegulation / profileCount),
    socialUnrest: Math.round(categoryTotals.socialUnrest / profileCount),
    policyShifts: Math.round(categoryTotals.policyShifts / profileCount),
  }
}

// Recent statements analysis
export const getRecentStatementsAnalysis = () => {
  const allStatements = globalPoliticalProfiles.map((profile) => ({
    date: profile.lastUpdated,
    statement: profile.recentStatement,
    profileName: profile.name,
    country: profile.country,
    profileId: profile.id,
  }))

  return allStatements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10) // Get 10 most recent statements
}
