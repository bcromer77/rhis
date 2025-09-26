export interface PoliticalActivistRisk {
  id: string;
  title: string;
  category: "Political" | "Activist" | "Community" | "Regulatory";
  riskLevel: "low" | "medium" | "high" | "critical";
  riskType:
    | "Political Instability"
    | "Activist Movement"
    | "Community Resistance"
    | "Policy Opposition"
    | "Electoral Risk";
  impact: string;
  date: string;
  location: string;
  state: string;
  keyFigures: string[];
  sentiment: "Supportive" | "Neutral" | "Negative" | "Hostile";
  description: string;
  citation: string;
  coordinates?: [number, number];
  affectedOperations: string[];
  mitigationStrategies?: string[];
  probabilityScore: number; // 1-10 scale
  impactScore: number; // 1-10 scale
  overallRiskScore: number; // calculated from probability * impact
}

export const politicalActivistRisks: PoliticalActivistRisk[] = [
  {
    id: "pa-001",
    title: "Pawan Kalyan's Influence and Land Acquisition Resistance",
    category: "Political",
    riskLevel: "high",
    riskType: "Policy Opposition",
    impact:
      "Pawan Kalyan has been actively opposing land grabbing in Andhra Pradesh, focusing on land rights and environmental issues. His stance could delay land acquisition for industrial projects and create significant operational challenges for ArcelorMittal.",
    date: "2025-03-20",
    location: "Andhra Pradesh",
    state: "Andhra Pradesh",
    keyFigures: ["Pawan Kalyan", "Jana Sena Party Leadership", "Land Rights Activists"],
    sentiment: "Negative",
    description:
      "Pawan Kalyan has been actively opposing land grabbing in Andhra Pradesh, focusing on land rights and environmental issues. His stance could delay land acquisition for industrial projects.",
    citation: "Jana Sena Party Press Statements, 2025",
    coordinates: [15.9129, 79.74],
    affectedOperations: ["Land Acquisition", "Steel Manufacturing", "Mining Operations", "Infrastructure Development"],
    mitigationStrategies: [
      "Enhanced Community Engagement",
      "Transparent Land Acquisition Process",
      "Fair Compensation Packages",
      "Environmental Impact Mitigation",
    ],
    probabilityScore: 8,
    impactScore: 8,
    overallRiskScore: 64,
  },
  {
    id: "pa-002",
    title: "Opposition to Uranium Mining in Nallamala Forest",
    category: "Political",
    riskLevel: "critical",
    riskType: "Policy Opposition",
    impact:
      "Pawan Kalyan's opposition to uranium mining in the Nallamala forest could prevent future mining operations in sensitive areas and set precedent for opposing other mining activities in Andhra Pradesh.",
    date: "2025-03-18",
    location: "Andhra Pradesh",
    state: "Andhra Pradesh",
    keyFigures: ["Pawan Kalyan", "Environmental Activists", "Tribal Communities"],
    sentiment: "Negative",
    description:
      "Pawan Kalyan's opposition to uranium mining in the Nallamala forest could prevent future mining operations in sensitive areas.",
    citation: "Pawan Kalyan Speech on Mining, 2025",
    coordinates: [15.9129, 79.74],
    affectedOperations: ["Mining Operations", "Environmental Clearances", "Forest Land Acquisition"],
    mitigationStrategies: [
      "Environmental Conservation Programs",
      "Alternative Site Identification",
      "Stakeholder Consultation",
      "Sustainable Mining Practices",
    ],
    probabilityScore: 9,
    impactScore: 8,
    overallRiskScore: 72,
  },
  {
    id: "pa-003",
    title: "Public Resistance and Protests Against Industrial Projects",
    category: "Political",
    riskLevel: "high",
    riskType: "Community Resistance",
    impact:
      "Pawan Kalyan's growing political influence and public support could lead to organized resistance against large-scale industrial projects, impacting ArcelorMittal's mining operations through protests, legal challenges, and policy pressure.",
    date: "2025-03-15",
    location: "Andhra Pradesh",
    state: "Andhra Pradesh",
    keyFigures: ["Pawan Kalyan", "Jana Sena Party Supporters", "Local Community Leaders"],
    sentiment: "Negative",
    description:
      "Pawan Kalyan's growing political influence and public support could lead to organized resistance against large-scale industrial projects, impacting ArcelorMittal's mining operations.",
    citation: "Jana Sena Party Supporter Movements, 2025",
    coordinates: [15.9129, 79.74],
    affectedOperations: ["Steel Production", "Mining Operations", "Public Relations", "Operational Continuity"],
    mitigationStrategies: [
      "Community Benefit Programs",
      "Local Employment Initiatives",
      "Political Dialogue",
      "Corporate Social Responsibility Enhancement",
    ],
    probabilityScore: 8,
    impactScore: 7,
    overallRiskScore: 56,
  },
  {
    id: "pa-004",
    title: "Tribal Rights Activist Movement in Jharkhand",
    category: "Activist",
    riskLevel: "critical",
    riskType: "Community Resistance",
    impact: "Potential operational shutdowns and legal challenges to mining permits in tribal areas",
    date: "2025-03-12",
    location: "Jharkhand",
    state: "Jharkhand",
    keyFigures: ["Dayamani Barla", "Jharkhand Janadhikar Mahasabha", "Adivasi Rights Groups"],
    sentiment: "Hostile",
    description:
      "Intensified tribal rights activism opposing mining operations in Jharkhand, with organized protests and legal challenges to land acquisition and mining permits.",
    citation: "Tribal Rights Coalition Press Conference (Session Date: 2025-03-12)",
    coordinates: [23.6102, 85.2799],
    affectedOperations: ["Iron Ore Mining", "Coal Mining", "Land Acquisition"],
    mitigationStrategies: [
      "Tribal Consultation Protocols",
      "Revenue Sharing Agreements",
      "Cultural Preservation Programs",
    ],
    probabilityScore: 9,
    impactScore: 8,
    overallRiskScore: 72,
  },
  {
    id: "pa-005",
    title: "Environmental Activist Coalition in Odisha",
    category: "Activist",
    riskLevel: "high",
    riskType: "Activist Movement",
    impact: "Increased environmental compliance costs and potential project delays due to activist pressure",
    date: "2025-03-10",
    location: "Odisha",
    state: "Odisha",
    keyFigures: ["Prafulla Samantara", "Green Peace India", "Local Environmental Groups"],
    sentiment: "Negative",
    description:
      "Environmental activist coalition organizing against steel plant expansions, citing air pollution and water contamination concerns in coastal Odisha.",
    citation: "Environmental Coalition Public Statement (Session Date: 2025-03-10)",
    coordinates: [20.9517, 85.0985],
    affectedOperations: ["Steel Plant Operations", "Waste Management", "Water Usage"],
    mitigationStrategies: [
      "Enhanced Environmental Monitoring",
      "Community Health Programs",
      "Green Technology Adoption",
    ],
    probabilityScore: 7,
    impactScore: 6,
    overallRiskScore: 42,
  },
  {
    id: "pa-006",
    title: "Political Opposition to Mining in Chhattisgarh",
    category: "Political",
    riskLevel: "medium",
    riskType: "Electoral Risk",
    impact: "Potential policy changes affecting mining operations depending on electoral outcomes",
    date: "2025-03-08",
    location: "Chhattisgarh",
    state: "Chhattisgarh",
    keyFigures: ["Opposition Party Leaders", "Local MLAs", "Mining Policy Critics"],
    sentiment: "Negative",
    description:
      "Growing political opposition to mining expansion in Chhattisgarh, with opposition parties promising stricter mining regulations if elected.",
    citation: "Opposition Party Election Manifesto (Session Date: 2025-03-08)",
    coordinates: [21.2787, 81.8661],
    affectedOperations: ["Coal Mining", "Iron Ore Extraction", "Transportation"],
    mitigationStrategies: ["Political Stakeholder Engagement", "CSR Investment Increase", "Local Development Projects"],
    probabilityScore: 6,
    impactScore: 5,
    overallRiskScore: 30,
  },
  {
    id: "pa-007",
    title: "Farmer Protests Against Land Acquisition in Gujarat",
    category: "Community",
    riskLevel: "high",
    riskType: "Community Resistance",
    impact: "Delays in land acquisition for steel plant expansion and increased compensation costs",
    date: "2025-03-05",
    location: "Gujarat",
    state: "Gujarat",
    keyFigures: ["Farmer Union Leaders", "Land Rights Activists", "Local Sarpanches"],
    sentiment: "Hostile",
    description:
      "Organized farmer protests against land acquisition for steel plant expansion, demanding higher compensation and alternative livelihood arrangements.",
    citation: "Farmer Union Press Release (Session Date: 2025-03-05)",
    coordinates: [23.0225, 72.5714],
    affectedOperations: ["Plant Expansion", "Land Acquisition", "Infrastructure Development"],
    mitigationStrategies: [
      "Fair Compensation Packages",
      "Alternative Livelihood Programs",
      "Agricultural Development Support",
    ],
    probabilityScore: 7,
    impactScore: 6,
    overallRiskScore: 42,
  },
  {
    id: "pa-008",
    title: "Labor Union Political Mobilization in West Bengal",
    category: "Political",
    riskLevel: "medium",
    riskType: "Policy Opposition",
    impact: "Potential labor strikes and political pressure for increased worker benefits and job security",
    date: "2025-03-02",
    location: "West Bengal",
    state: "West Bengal",
    keyFigures: ["CITU Leaders", "AITUC Representatives", "Political Labor Leaders"],
    sentiment: "Negative",
    description:
      "Labor unions gaining political support for demands regarding job security, wage increases, and worker safety in steel and mining operations.",
    citation: "Labor Union Political Rally (Session Date: 2025-03-02)",
    coordinates: [22.9868, 87.855],
    affectedOperations: ["Steel Production", "Labor Relations", "Operational Continuity"],
    mitigationStrategies: ["Labor Dialogue Enhancement", "Worker Benefit Programs", "Safety Investment"],
    probabilityScore: 5,
    impactScore: 6,
    overallRiskScore: 30,
  },
];

// Enhanced risk calculation functions
export const calculateOverallRisk = (probability: number, impact: number): number => {
  return probability * impact;
};

export const getRiskLevelFromScore = (score: number): "low" | "medium" | "high" | "critical" => {
  if (score >= 60) return "critical";
  if (score >= 40) return "high";
  if (score >= 20) return "medium";
  return "low";
};

// Risk statistics for political and activist risks
export const getPoliticalActivistRiskStats = () => {
  const stats = politicalActivistRisks.reduce(
    (acc, risk) => {
      acc[risk.riskLevel]++;
      acc.total++;
      acc.totalRiskScore += risk.overallRiskScore;
      return acc;
    },
    { low: 0, medium: 0, high: 0, critical: 0, total: 0, totalRiskScore: 0 }
  );

  return {
    ...stats,
    averageRiskScore: Math.round(stats.totalRiskScore / stats.total),
    lowPercentage: Math.round((stats.low / stats.total) * 100),
    mediumPercentage: Math.round((stats.medium / stats.total) * 100),
    highPercentage: Math.round((stats.high / stats.total) * 100),
    criticalPercentage: Math.round((stats.critical / stats.total) * 100),
  };
};

// Risk type distribution
export const getRiskTypeDistribution = () => {
  const distribution = politicalActivistRisks.reduce(
    (acc, risk) => {
      if (!acc[risk.riskType]) {
        acc[risk.riskType] = { low: 0, medium: 0, high: 0, critical: 0, total: 0 };
      }
      acc[risk.riskType][risk.riskLevel]++;
      acc[risk.riskType].total++;
      return acc;
    },
    {} as Record<string, { low: number; medium: number; high: number; critical: number; total: number }>
  );

  return distribution;
};

// State-wise risk analysis
export const getStateRiskAnalysis = () => {
  // explicitly type stateRisks as a dictionary with index signatures
  const stateRisks: {
    [key: string]: {
      risks: PoliticalActivistRisk[];
      totalScore: number;
      highestRisk: number;
      riskCount: number;
      averageScore: number; // ✅ always present now
    };
  } = {};

  politicalActivistRisks.forEach((risk) => {
    if (!stateRisks[risk.state]) {
      stateRisks[risk.state] = {
        risks: [],
        totalScore: 0,
        highestRisk: 0,
        riskCount: 0,
        averageScore: 0,
      };
    }
    stateRisks[risk.state].risks.push(risk);
    stateRisks[risk.state].totalScore += risk.overallRiskScore;
    stateRisks[risk.state].highestRisk = Math.max(
      stateRisks[risk.state].highestRisk,
      risk.overallRiskScore
    );
    stateRisks[risk.state].riskCount++;
  });

  // Calculate average risk score per state
  Object.keys(stateRisks).forEach((state) => {
    stateRisks[state].averageScore = Math.round(
      stateRisks[state].totalScore / stateRisks[state].riskCount
    );
  });

  return stateRisks;
};  // Calculate average risk score per state
  Object.keys(stateRisks).forEach((state) => {
    stateRisks[state].averageScore = Math.round(
      stateRisks[state].totalScore / stateRisks[state].riskCount
    );
  });

  return stateRisks;
};

// Key figures analysis
export const getKeyFiguresAnalysis = () => {
  const figuresMap = new Map<string, { risks: PoliticalActivistRisk[]; totalImpact: number }>();

  politicalActivistRisks.forEach((risk) => {
    risk.keyFigures.forEach((figure) => {
      if (!figuresMap.has(figure)) {
        figuresMap.set(figure, { risks: [], totalImpact: 0 });
      }
      figuresMap.get(figure)!.risks.push(risk);
      figuresMap.get(figure)!.totalImpact += risk.overallRiskScore;
    });
  });

  return Array.from(figuresMap.entries())
    .map(([figure, data]) => ({
      name: figure,
      riskCount: data.risks.length,
      totalImpact: data.totalImpact,
      averageImpact: Math.round(data.totalImpact / data.risks.length),
      risks: data.risks,
    }))
    .sort((a, b) => b.totalImpact - a.totalImpact);
};
