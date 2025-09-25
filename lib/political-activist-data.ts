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

// … keep your long `politicalActivistRisks` dataset as is …

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
  const stateRisks = politicalActivistRisks.reduce(
    (acc, risk) => {
      if (!acc[risk.state]) {
        acc[risk.state] = {
          risks: [],
          totalScore: 0,
          highestRisk: 0,
          riskCount: 0,
          averageScore: 0, // ✅ added
        };
      }
      acc[risk.state].risks.push(risk);
      acc[risk.state].totalScore += risk.overallRiskScore;
      acc[risk.state].highestRisk = Math.max(acc[risk.state].highestRisk, risk.overallRiskScore);
      acc[risk.state].riskCount++;
      return acc;
    },
    {} as Record<
      string,
      {
        risks: PoliticalActivistRisk[];
        totalScore: number;
        highestRisk: number;
        riskCount: number;
        averageScore: number; // ✅ typed
      }
    >
  );

  // Calculate average risk score per state
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
