// lib/political-activist-data.ts

// Define the type for risks
export type PoliticalActivistRisk = {
  id: string;
  state: string;
  riskType: string;
  overallRiskScore: number;
  description: string;
  figuresInvolved?: string[];
  mitigationStrategies?: string[];
};

// Example dataset of risks
export const politicalActivistRisks: PoliticalActivistRisk[] = [
  {
    id: "1",
    state: "Andhra Pradesh",
    riskType: "Policy Opposition",
    overallRiskScore: 72,
    description: "Farmer activist groups opposing new land acquisition policy.",
    figuresInvolved: ["Pawan Kalyan"],
    mitigationStrategies: ["Stakeholder engagement", "Policy amendments"],
  },
  {
    id: "2",
    state: "Jharkhand",
    riskType: "Activist Movement",
    overallRiskScore: 85,
    description: "Tribal rights groups protesting mining expansion.",
    figuresInvolved: ["Dayamani Barla"],
    mitigationStrategies: ["CSR initiatives", "Inclusive negotiations"],
  },
  {
    id: "3",
    state: "Odisha",
    riskType: "Grassroots Resistance",
    overallRiskScore: 64,
    description: "Local resistance against industrial corridor expansion.",
    figuresInvolved: [],
    mitigationStrategies: ["Awareness campaigns", "Alternative development models"],
  },
  // Add more entries as needed
];

// ---- Analysis Functions ----

// Overall risk distribution
export const getPoliticalActivistRiskStats = () => {
  const totalRisks = politicalActivistRisks.length;
  const highRisk = politicalActivistRisks.filter(r => r.overallRiskScore > 70).length;
  const mediumRisk = politicalActivistRisks.filter(r => r.overallRiskScore > 50 && r.overallRiskScore <= 70).length;
  const lowRisk = politicalActivistRisks.filter(r => r.overallRiskScore <= 50).length;

  return {
    totalRisks,
    highRisk,
    mediumRisk,
    lowRisk,
  };
};

// Distribution of risks by type
export const getRiskTypeDistribution = () => {
  return politicalActivistRisks.reduce((acc, risk) => {
    if (!acc[risk.riskType]) {
      acc[risk.riskType] = 0;
    }
    acc[risk.riskType]++;
    return acc;
  }, {} as Record<string, number>);
};

// State-wise risk analysis (demo-safe, no averageScore)
export const getStateRiskAnalysis = () => {
  const stateRisks = politicalActivistRisks.reduce(
    (acc, risk) => {
      if (!acc[risk.state]) {
        acc[risk.state] = {
          risks: [],
          totalScore: 0,
          highestRisk: 0,
          riskCount: 0,
        };
      }
      acc[risk.state].risks.push(risk);
      acc[risk.state].totalScore += risk.overallRiskScore;
      acc[risk.state].highestRisk = Math.max(
        acc[risk.state].highestRisk,
        risk.overallRiskScore
      );
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
      }
    >
  );

  return stateRisks;
};

// Key figures involved across risks
export const getKeyFiguresAnalysis = () => {
  const figuresMap: Record<string, number> = {};

  politicalActivistRisks.forEach(risk => {
    risk.figuresInvolved?.forEach(figure => {
      if (!figuresMap[figure]) {
        figuresMap[figure] = 0;
      }
      figuresMap[figure]++;
    });
  });

  return figuresMap;
};
