// 🛑 DO NOT MODIFY – MOCK DATA FOR VECTOR SEARCH & HEATMAP DEMO ONLY 🛑
// This dataset is created solely for testing the Regulatory Horizon Intelligence Scanning (RHIS) tool
// developed for ArcelorMittal. It contains mock geopolitical risk entries simulating real-world conditions.

export interface GlobalPoliticalProfile {
  id: string
  fullName: string
  currentPosition: string
  politicalParty: string
  country: string
  region: string
  riskLevel: "low" | "medium" | "high" | "critical"
  riskScore: number
  politicalStance: string
  coreIssues: string[]
  potentialImpacts: string[]
  recentStatements: {
    date: string
    statement: string
    source: string
    impact: "low" | "medium" | "high"
  }[]
  keyRisks: {
    landAcquisition: number
    environmentalRegulation: number
    socialUnrest: number
    policyShifts: number
  }
  politicalAlliances: string[]
  publicSentiment: string
  monitoringSignals: string[]
  lastUpdated: string
}

export interface RHISEntry {
  country: string
  issue: string
  state: string
  impact: string
  category: string
  political_situation: string
  person_to_watch: string
  action_required: string
  source: string
  date: string
}

export interface RHISPoliticianEntry {
  politician_name: string
  state: string
  issue: string
  impact: string
  category: string
  action_required: string[]
  source: string
  date: string
}

// Mock RHIS entries based on the provided dataset structure
export const rhisEntries: RHISEntry[] = [
  {
    country: "India",
    issue: "New Land Ownership Bill",
    state: "Andhra Pradesh",
    impact: "High risk of land acquisition disruption",
    category: "Regulatory, Social",
    political_situation: "YSR Party activist Cheeli Singaiah was killed. Deep political tension rising.",
    person_to_watch: "Pawan Kalyan (Janasena Party) — vocal opposition leader",
    action_required: "Monitor Andhra Pradesh closely, delay land acquisition, engage local leadership.",
    source: "Andhra Pradesh Legislative Assembly, July 2025",
    date: "2025-07-10",
  },
  {
    country: "Mexico",
    issue: "Federal Bill on Lithium Nationalization",
    state: "Sonora",
    impact: "Risk of foreign company asset seizure and new extraction restrictions",
    category: "Regulatory, Economic",
    political_situation: "Government faces backlash from private mining sector; nationalist rhetoric rising.",
    person_to_watch: "President Claudia Sheinbaum — continuing AMLO's nationalization agenda",
    action_required: "Audit all lithium holdings in Sonora, prepare legal contingency framework.",
    source: "Mexican Congress, June 2025",
    date: "2025-06-28",
  },
  {
    country: "Brazil",
    issue: "Constitutional Amendment on Indigenous Land Demarcation",
    state: "Minas Gerais",
    impact: "Threat of mining delays due to Indigenous land claims and legal disputes",
    category: "Social, Environmental, Legal",
    political_situation: "Protests erupt in Belo Horizonte. Indigenous groups clash with federal police.",
    person_to_watch: "Senator Damares Alves — pushing constitutional reform",
    action_required: "Suspend new land acquisitions; open dialogue with Indigenous organizations.",
    source: "Brazilian Senate Records, July 2025",
    date: "2025-07-05",
  },
  {
    country: "Canada",
    issue: "Ontario Mining Royalty Reform Bill",
    state: "Ontario",
    impact: "Increase in extraction costs, reduced margin for iron ore exports",
    category: "Economic, Regulatory",
    political_situation: "Mining unions rally against new tax; political friction with provincial government.",
    person_to_watch: "Doug Ford — Premier of Ontario; expected to backtrack under pressure",
    action_required: "Engage with Ontario Mining Association; submit formal industry brief.",
    source: "Ontario Provincial Parliament, July 2025",
    date: "2025-07-02",
  },
]

// New RHIS politician entries for testing
export const rhisPoliticianEntries: RHISPoliticianEntry[] = [
  {
    politician_name: "Ajit Kumar Bhuyan",
    state: "Assam",
    issue: "Tribal land rights and environmental concerns over solar project in Karbi Anglong",
    impact:
      "Potential risk to mining operations due to tribal protests and legal challenges against land acquisition without proper consultations and environmental assessments",
    category: "Social, Environmental, Regulatory",
    action_required: [
      "Engage with local tribal leaders and community representatives to address concerns",
      "Conduct thorough Environmental Impact Assessments (EIAs) and obtain necessary approvals",
      "Ensure compliance with the Sixth Schedule of the Indian Constitution regarding tribal land rights",
    ],
    source:
      "Statements by MP Ajit Kumar Bhuyan in Rajya Sabha and public protests reported in media (hubnetwork.in, NorthEast Now, assamtimes.org, The AIDEM)",
    date: "2025-03-11",
  },
  {
    politician_name: "Raja Ram Singh",
    state: "Uttar Pradesh",
    issue: "Illegal sand mining and environmental degradation in Gonda district",
    impact:
      "Environmental damage and potential legal repercussions affecting mining operations due to unauthorized extraction and transportation of minerals",
    category: "Environmental, Regulatory",
    action_required: [
      "Collaborate with environmental authorities to monitor and prevent illegal mining activities",
      "Implement stricter compliance measures and regular audits",
      "Engage with local communities to promote sustainable mining practices",
    ],
    source: "Petition filed by Raja Ram Singh and subsequent National Green Tribunal (NGT) proceedings",
    date: "2024-08-02",
  },
  {
    politician_name: "Senator Damares Alves",
    state: "Minas Gerais",
    issue: "Supreme Court ruling against Indigenous land demarcation restrictions",
    impact:
      "Increased legal exposure for mining companies operating in disputed Indigenous territories; projects may face suspension or revocation",
    category: "Environmental, Legal, Social",
    action_required: [
      "Halt exploratory activity on contested lands until legal clarity is restored",
      "Engage Indigenous associations for early conflict resolution",
      "Coordinate with Brazilian Bar Association on land rights interpretation",
    ],
    source: "Brazilian Supreme Court ruling transcript, July 2025; Senator Alves' televised opposition remarks",
    date: "2025-07-04",
  },
  {
    politician_name: "Deputy Reginaldo Lopes",
    state: "Minas Gerais",
    issue: "Mass protests against iron ore expansion near river basins",
    impact:
      "High operational disruption risk; water pollution allegations spark federal probe into Vale and other operators",
    category: "Environmental, Social, Regulatory",
    action_required: [
      "Activate local risk intelligence teams for real-time protest monitoring",
      "Engage with Brazil's environmental regulator (IBAMA) for audit mitigation",
      "Review emergency evacuation and community engagement protocols",
    ],
    source: "Brazilian Chamber of Deputies speech, July 2025; São Paulo newswire",
    date: "2025-07-07",
  },
  {
    politician_name: "Doug Ford",
    state: "Ontario",
    issue: "Mining Royalty Reform Bill raises extraction levies by 18%",
    impact: "Erosion of export profit margins for steel and iron producers; potential investor pullout",
    category: "Economic, Regulatory",
    action_required: [
      "Coordinate with Ontario Mining Association for advocacy brief",
      "Model cost inflation impact on midstream AM/NS operations",
      "Lobby via federal-provincial industry roundtables",
    ],
    source: "Ontario Provincial Parliament Hansard, June 2025",
    date: "2025-06-21",
  },
  {
    politician_name: "Jagmeet Singh",
    state: "British Columbia",
    issue: "Indigenous group files lawsuit blocking access to copper and gold deposits",
    impact: "Legal injunction halts exploratory mining in key zones near Skeena River; precedent-setting case",
    category: "Legal, Environmental, Social",
    action_required: [
      "Monitor federal court proceedings closely",
      "Initiate Indigenous relations protocol review",
      "Prepare legal support framework with provincial stakeholders",
    ],
    source: "Canadian House of Commons debate transcript, July 2025",
    date: "2025-07-10",
  },
  // New Mexico entries
  {
    politician_name: "Claudia Sheinbaum",
    state: "National",
    issue: "Revival of Mexican pharmaceutical industry via production-based procurement policy",
    impact:
      "Foreign pharmaceutical companies without domestic facilities may lose access to government tenders; generic market expansion expected",
    category: "Economic, Regulatory, Industrial Policy",
    action_required: [
      "Assess AM/NS exposure to pharmaceutical sector reforms",
      "Monitor Ministry of Health procurement criteria for localization incentives",
      "Evaluate supply chain shifts toward national inputs amid import reduction goals",
    ],
    source: "Presidential Address with IMSS Bienestar Director Alejandro, July 2025",
    date: "2025-07-10",
  },
  {
    politician_name: "Claudia Sheinbaum",
    state: "National / Binational (U.S. & Mexico)",
    issue: "México Canta cultural program to counter violent narratives in youth media",
    impact:
      "Government narrative shift may influence regulation of music/media and impact youth engagement initiatives",
    category: "Social, Cultural, Media Policy",
    action_required: [
      "Track cultural regulation changes influencing media and broadcasting sectors",
      "Engage with Secretaría de Cultura on non-violent content promotion for youth",
      "Monitor impact on corporate social responsibility programs aligned with anti-violence themes",
    ],
    source: "México Canta Phase II announcement, July 2025",
    date: "2025-07-10",
  },
  {
    politician_name: "Claudia Sheinbaum",
    state: "Tamaulipas",
    issue: "Environmental and legal investigation into NGI gas explosions and fatal burns",
    impact:
      "NGI and similar corporations may face cross-border liability and regulatory scrutiny from ACEA and French diplomatic channels",
    category: "Environmental, Legal, Corporate Risk",
    action_required: [
      "Monitor ACEA actions and Environment Secretariat enforcement timelines",
      "Track outcomes of stalled local investigations",
      "Assess diplomatic escalations involving foreign energy firms",
    ],
    source: "Presidential briefing on NGI incident involving Talía, July 2025",
    date: "2025-07-10",
  },
  {
    politician_name: "Claudia Sheinbaum",
    state: "México-Puebla and México-Querétaro Corridors",
    issue: "Highway robbery surge including extortion, kidnappings, and National Guard collusion",
    impact: "Severe logistics disruptions and increased cost of freight movement for industrial operators",
    category: "Security, Transport, Economic Risk",
    action_required: [
      "Reassess cargo movement risk through central corridors",
      "Evaluate insurance coverage against extortion and robbery",
      "Track deployment of Operation Balam and guard accountability protocols",
    ],
    source: "Response to Judit Sánchez Reyes, July 2025",
    date: "2025-07-10",
  },
  {
    politician_name: "Claudia Sheinbaum",
    state: "Southern Border (Tapachula, Villahermosa)",
    issue: "Rejection of U.S. detention centers and rollout of 'México te Abraza' migrant support",
    impact: "Escalation in diplomatic tension with U.S.; redirection of consular and border protection resources",
    category: "Foreign Policy, Migration, Social",
    action_required: [
      "Monitor deployment and funding of repatriation programs",
      "Analyze impact on labor migration and remittance corridors",
      "Track U.S.-Mexico negotiations over border infrastructure",
    ],
    source: "Remarks to Elia Cruz of La Hoguera, July 2025",
    date: "2025-07-10",
  },
  {
    politician_name: "Claudia Sheinbaum",
    state: "Michoacán and Oaxaca",
    issue: "Reform of community radio licensing for Indigenous broadcasters",
    impact:
      "Expanded Indigenous broadcasting access; shift in media ownership regulations; reduction of bureaucratic entry barriers",
    category: "Cultural, Regulatory, Social",
    action_required: [
      "Track publication of regulations clarifying Article 183 funding mechanisms",
      "Engage with local Indigenous broadcasters for licensing readiness",
      "Monitor potential decentralization of media power and its effect on rural narrative control",
    ],
    source: "Presidential comments during Cabinet Q&A on Telecommunications Law, July 2025",
    date: "2025-07-10",
  },
]

export const globalPoliticalProfiles: GlobalPoliticalProfile[] = [
  {
    id: "pk-001",
    fullName: "Pawan Kalyan",
    currentPosition: "Jana Sena Party Chief & Actor",
    politicalParty: "Jana Sena Party",
    country: "India",
    region: "Andhra Pradesh",
    riskLevel: "high",
    riskScore: 85,
    politicalStance:
      "Pawan Kalyan advocates for social justice, land rights, and environmental protection. He has been vocal against land grabbing and supports farmers' rights. His political stance combines populist appeal with environmental consciousness, making him a significant figure in Andhra Pradesh politics.",
    coreIssues: [
      "Land Rights Protection",
      "Environmental Conservation",
      "Farmers' Welfare",
      "Anti-Corruption",
      "Social Justice",
      "Youth Employment",
    ],
    potentialImpacts: [
      "Could mobilize large-scale protests against industrial land acquisition",
      "May influence policy changes regarding environmental clearances",
      "Potential to create regulatory hurdles for mining operations",
      "Could impact public sentiment against large corporations",
      "May lead to increased scrutiny of corporate social responsibility",
    ],
    recentStatements: [
      {
        date: "2024-12-15",
        statement:
          "We will not allow our sacred lands to be exploited by corporate greed. The people of Andhra Pradesh deserve better.",
        source: "Jana Sena Party Press Conference",
        impact: "high",
      },
      {
        date: "2024-12-10",
        statement:
          "Environmental protection is not negotiable. We must preserve our forests and water bodies for future generations.",
        source: "Twitter/X Post",
        impact: "medium",
      },
      {
        date: "2024-12-05",
        statement:
          "Farmers are the backbone of our economy. Any policy that threatens their livelihood will be opposed.",
        source: "Public Rally in Vijayawada",
        impact: "high",
      },
    ],
    keyRisks: {
      landAcquisition: 9,
      environmentalRegulation: 8,
      socialUnrest: 8,
      policyShifts: 7,
    },
    politicalAlliances: [
      "BJP (Previous Alliance)",
      "Independent Political Stance",
      "Farmer Organizations",
      "Environmental Groups",
    ],
    publicSentiment:
      "High approval rating among youth and farmers. Strong social media presence with significant influence in Andhra Pradesh and Telangana.",
    monitoringSignals: [
      "Social media activity and statements",
      "Public rally attendance and messaging",
      "Coalition building with other parties",
      "Policy position papers and manifestos",
      "Media interviews and press conferences",
    ],
    lastUpdated: "2024-12-15",
  },
  {
    id: "cs-001",
    fullName: "Claudia Sheinbaum",
    currentPosition: "President of Mexico",
    politicalParty: "MORENA",
    country: "Mexico",
    region: "North America",
    riskLevel: "critical",
    riskScore: 92,
    politicalStance:
      "Claudia Sheinbaum continues AMLO's nationalist agenda, particularly focusing on resource sovereignty, pharmaceutical industry revival, cultural programs, and comprehensive policy reforms across multiple sectors. She advocates for state control over strategic industries and has shown willingness to challenge foreign companies across various sectors.",
    coreIssues: [
      "Lithium Nationalization",
      "Pharmaceutical Sovereignty",
      "Cultural Policy Reform",
      "Environmental Corporate Accountability",
      "Transport Security",
      "Migration Diplomacy",
      "Indigenous Broadcasting Rights",
    ],
    potentialImpacts: [
      "Risk of asset seizure for foreign companies across multiple sectors",
      "Increased regulatory restrictions on pharmaceutical and mining operations",
      "Potential renegotiation of existing industrial contracts",
      "Higher compliance costs due to environmental investigations",
      "Logistics disruptions due to transport security issues",
      "Diplomatic tensions affecting cross-border business operations",
    ],
    recentStatements: [
      {
        date: "2025-07-10",
        statement:
          "Mexico's pharmaceutical industry must be revived through production-based procurement policies that prioritize domestic facilities.",
        source: "Presidential Address with IMSS Bienestar Director",
        impact: "high",
      },
      {
        date: "2025-07-10",
        statement: "We will counter violent narratives in youth media through our México Canta cultural program.",
        source: "México Canta Phase II Announcement",
        impact: "medium",
      },
      {
        date: "2025-07-10",
        statement:
          "Corporate accountability for environmental disasters like the NGI gas explosions will be pursued through all legal channels.",
        source: "Presidential Briefing on NGI Incident",
        impact: "high",
      },
    ],
    keyRisks: {
      landAcquisition: 7,
      environmentalRegulation: 8,
      socialUnrest: 7,
      policyShifts: 10,
    },
    politicalAlliances: ["MORENA Party", "Labor Unions", "Nationalist Groups", "Environmental Organizations"],
    publicSentiment:
      "Strong support among nationalist voters and labor unions. Popular for comprehensive policy reforms while maintaining focus on sovereignty and cultural identity.",
    monitoringSignals: [
      "Presidential decrees and policy announcements",
      "Congressional voting patterns on industrial legislation",
      "International trade negotiations",
      "Environmental enforcement actions",
      "Cultural and media policy statements",
      "Migration and border policy developments",
    ],
    lastUpdated: "2025-07-10",
  },
  {
    id: "da-001",
    fullName: "Damares Alves",
    currentPosition: "Brazilian Senator",
    politicalParty: "Republicanos",
    country: "Brazil",
    region: "South America",
    riskLevel: "high",
    riskScore: 78,
    politicalStance:
      "Damares Alves advocates for constitutional reform regarding Indigenous land demarcation. She supports development-friendly policies while claiming to balance Indigenous rights with economic growth needs.",
    coreIssues: [
      "Indigenous Land Reform",
      "Constitutional Amendment",
      "Mining Development",
      "Agricultural Expansion",
      "Religious Freedom",
      "Traditional Values",
    ],
    potentialImpacts: [
      "Potential changes to Indigenous land protection laws",
      "Increased access to previously restricted mining areas",
      "Legal challenges to existing Indigenous territories",
      "Regulatory changes affecting environmental compliance",
      "Political tensions with Indigenous communities",
    ],
    recentStatements: [
      {
        date: "2025-07-04",
        statement:
          "The Supreme Court ruling against Indigenous land demarcation restrictions threatens Brazil's economic development and sovereignty.",
        source: "Televised Opposition Remarks",
        impact: "high",
      },
      {
        date: "2024-12-07",
        statement: "We must balance Indigenous rights with the needs of Brazilian development and progress.",
        source: "Congressional Committee Hearing",
        impact: "medium",
      },
    ],
    keyRisks: {
      landAcquisition: 8,
      environmentalRegulation: 6,
      socialUnrest: 8,
      policyShifts: 9,
    },
    politicalAlliances: [
      "Republicanos Party",
      "Agricultural Lobby",
      "Mining Industry Groups",
      "Conservative Coalition",
    ],
    publicSentiment:
      "Support from agricultural and mining sectors. Controversial among Indigenous rights advocates and environmental groups.",
    monitoringSignals: [
      "Senate voting patterns on Indigenous issues",
      "Committee participation and statements",
      "Meetings with industry representatives",
      "Media interviews and public appearances",
      "Coalition building activities",
    ],
    lastUpdated: "2025-07-04",
  },
  {
    id: "rl-001",
    fullName: "Reginaldo Lopes",
    currentPosition: "Federal Deputy",
    politicalParty: "Partido dos Trabalhadores (PT)",
    country: "Brazil",
    region: "Minas Gerais",
    riskLevel: "high",
    riskScore: 80,
    politicalStance:
      "Progressive deputy focused on environmental protection and mining regulation. Advocates for stricter oversight of mining companies and protection of water resources in Minas Gerais.",
    coreIssues: [
      "Environmental Protection",
      "Mining Regulation",
      "Water Resource Conservation",
      "Community Rights",
      "Corporate Accountability",
    ],
    potentialImpacts: [
      "Operational disruptions through organized protests against mining expansion",
      "Federal investigations triggered by environmental advocacy",
      "Stricter regulatory controls on mining sector operations",
      "Community mobilization against industrial projects",
    ],
    recentStatements: [
      {
        date: "2025-07-07",
        statement:
          "Mass protests against iron ore expansion near river basins are necessary to protect our water resources from corporate pollution.",
        source: "Brazilian Chamber of Deputies Speech",
        impact: "high",
      },
      {
        date: "2025-07-05",
        statement: "Federal probe into Vale and other operators is essential to address water pollution allegations.",
        source: "Environmental Committee Meeting",
        impact: "high",
      },
    ],
    keyRisks: {
      landAcquisition: 7,
      environmentalRegulation: 9,
      socialUnrest: 8,
      policyShifts: 8,
    },
    politicalAlliances: ["Workers' Party", "Progressive Coalition", "Environmental Organizations"],
    publicSentiment: "Popular among environmental activists and communities affected by mining operations",
    monitoringSignals: [
      "Chamber of Deputies environmental speeches",
      "Protest organization activities",
      "IBAMA coordination efforts",
      "Community engagement initiatives",
      "Media campaigns against mining expansion",
    ],
    lastUpdated: "2025-07-07",
  },
  {
    id: "df-001",
    fullName: "Doug Ford",
    currentPosition: "Premier of Ontario",
    politicalParty: "Progressive Conservative Party of Ontario",
    country: "Canada",
    region: "North America",
    riskLevel: "medium",
    riskScore: 72,
    politicalStance:
      "Doug Ford balances pro-business policies with political pragmatism. He supports mining industry development but faces pressure from unions and environmental groups regarding royalty reforms and taxation.",
    coreIssues: [
      "Mining Royalty Reform",
      "Provincial Taxation",
      "Economic Development",
      "Industry Relations",
      "Job Creation",
      "Resource Development",
    ],
    potentialImpacts: [
      "18% increase in extraction levies affecting profit margins",
      "Potential policy reversals under political pressure",
      "Regulatory adjustments affecting operational costs",
      "Labor relations challenges with mining unions",
      "Investment uncertainty due to policy changes",
    ],
    recentStatements: [
      {
        date: "2025-06-21",
        statement:
          "The Mining Royalty Reform Bill with 18% levy increase is necessary to balance industry growth with provincial revenue needs.",
        source: "Ontario Provincial Parliament Hansard",
        impact: "high",
      },
      {
        date: "2024-12-05",
        statement:
          "We're committed to working with industry and unions to find balanced solutions for Ontario's mining future.",
        source: "Provincial Parliament Question Period",
        impact: "low",
      },
    ],
    keyRisks: {
      landAcquisition: 4,
      environmentalRegulation: 6,
      socialUnrest: 7,
      policyShifts: 8,
    },
    politicalAlliances: [
      "Progressive Conservative Party",
      "Business Organizations",
      "Ontario Mining Association",
      "Chamber of Commerce",
    ],
    publicSentiment:
      "Mixed support from business community and unions. Faces pressure from both sides on mining taxation issues.",
    monitoringSignals: [
      "Provincial policy announcements",
      "Legislative voting patterns",
      "Industry consultation meetings",
      "Union negotiations and statements",
      "Media interviews and press conferences",
    ],
    lastUpdated: "2025-06-21",
  },
  {
    id: "js-001",
    fullName: "Jagmeet Singh",
    currentPosition: "Leader of the NDP (Federal)",
    politicalParty: "New Democratic Party (NDP)",
    country: "Canada",
    region: "British Columbia",
    riskLevel: "high",
    riskScore: 79,
    politicalStance:
      "Progressive leader who strongly supports Indigenous rights and environmental protection. Advocates for Indigenous consent in resource development and stricter environmental regulations.",
    coreIssues: [
      "Indigenous Rights",
      "Environmental Justice",
      "Social Equity",
      "Corporate Accountability",
      "Climate Action",
    ],
    potentialImpacts: [
      "Legal injunctions halting mining projects through Indigenous lawsuit support",
      "Precedent-setting cases affecting future resource development",
      "Federal policy influence on Indigenous consultation requirements",
      "Investment deterrence in British Columbia mining sector",
    ],
    recentStatements: [
      {
        date: "2025-07-10",
        statement:
          "Indigenous groups filing lawsuits to block mining access near Skeena River represent legitimate concerns about environmental protection and Indigenous rights.",
        source: "House of Commons Debate Transcript",
        impact: "high",
      },
      {
        date: "2025-07-08",
        statement:
          "Stronger Indigenous consultation requirements in resource development are essential for reconciliation.",
        source: "Indigenous Rights Conference",
        impact: "high",
      },
    ],
    keyRisks: {
      landAcquisition: 9,
      environmentalRegulation: 8,
      socialUnrest: 7,
      policyShifts: 8,
    },
    politicalAlliances: ["Progressive Coalition", "Indigenous Rights Groups", "Environmental Organizations"],
    publicSentiment:
      "Strong support among Indigenous communities and environmental activists, viewed as principled advocate for social justice",
    monitoringSignals: [
      "House of Commons speeches on Indigenous rights",
      "Support for Indigenous legal challenges",
      "Environmental policy positions",
      "Federal-provincial relations on resource development",
      "Coalition building with Indigenous groups",
    ],
    lastUpdated: "2025-07-10",
  },
  {
    id: "akb-001",
    fullName: "Ajit Kumar Bhuyan",
    currentPosition: "Member of Parliament (Rajya Sabha)",
    politicalParty: "Independent",
    country: "India",
    region: "Assam",
    riskLevel: "high",
    riskScore: 82,
    politicalStance:
      "Ajit Kumar Bhuyan is a strong advocate for tribal land rights and environmental protection in Assam. He has been vocal about the need for proper consultation with tribal communities before any land acquisition and emphasizes compliance with constitutional provisions for tribal areas.",
    coreIssues: [
      "Tribal Land Rights",
      "Environmental Protection",
      "Constitutional Compliance",
      "Community Consultation",
      "Sustainable Development",
      "Indigenous Rights",
    ],
    potentialImpacts: [
      "Could mobilize tribal communities against land acquisition projects",
      "May influence environmental clearance processes",
      "Potential to create legal challenges for mining operations",
      "Could impact public sentiment in Northeast India",
      "May lead to stricter compliance requirements for tribal areas",
    ],
    recentStatements: [
      {
        date: "2025-03-11",
        statement:
          "Tribal land rights cannot be compromised for development projects. Proper consultation and environmental assessments are mandatory.",
        source: "Rajya Sabha Parliamentary Session",
        impact: "high",
      },
      {
        date: "2025-03-05",
        statement:
          "The Sixth Schedule of the Constitution must be respected in all development activities in tribal areas.",
        source: "Press Conference in Guwahati",
        impact: "medium",
      },
    ],
    keyRisks: {
      landAcquisition: 9,
      environmentalRegulation: 8,
      socialUnrest: 8,
      policyShifts: 7,
    },
    politicalAlliances: [
      "Tribal Organizations",
      "Environmental Groups",
      "Northeast Political Parties",
      "Indigenous Rights Activists",
    ],
    publicSentiment:
      "Strong support among tribal communities in Assam and Northeast India. Respected voice on constitutional and environmental issues.",
    monitoringSignals: [
      "Parliamentary speeches and questions",
      "Tribal community meetings and rallies",
      "Environmental activism and protests",
      "Media statements on land rights",
      "Legal interventions and petitions",
    ],
    lastUpdated: "2025-03-11",
  },
  {
    id: "rrs-001",
    fullName: "Raja Ram Singh",
    currentPosition: "Environmental Activist & Legal Petitioner",
    politicalParty: "Independent Activist",
    country: "India",
    region: "Uttar Pradesh",
    riskLevel: "medium",
    riskScore: 74,
    politicalStance:
      "Raja Ram Singh is an environmental activist focused on combating illegal mining activities in Uttar Pradesh. He has been instrumental in filing petitions against unauthorized mining operations and advocates for sustainable mining practices and environmental protection.",
    coreIssues: [
      "Illegal Mining Prevention",
      "Environmental Protection",
      "Legal Compliance",
      "Sustainable Mining",
      "Community Welfare",
      "Regulatory Enforcement",
    ],
    potentialImpacts: [
      "Could lead to increased scrutiny of mining operations",
      "May result in stricter environmental compliance requirements",
      "Potential for legal challenges against non-compliant companies",
      "Could influence regulatory enforcement in mining sector",
      "May impact public perception of mining industry",
    ],
    recentStatements: [
      {
        date: "2024-08-02",
        statement:
          "Illegal sand mining is destroying our environment and must be stopped through strict legal action and community awareness.",
        source: "National Green Tribunal Petition Filing",
        impact: "high",
      },
      {
        date: "2024-07-28",
        statement:
          "Mining companies must follow all environmental regulations and engage with local communities for sustainable development.",
        source: "Environmental Awareness Rally in Gonda",
        impact: "medium",
      },
    ],
    keyRisks: {
      landAcquisition: 6,
      environmentalRegulation: 9,
      socialUnrest: 6,
      policyShifts: 7,
    },
    politicalAlliances: [
      "Environmental Organizations",
      "Legal Rights Groups",
      "Community Organizations",
      "Anti-Corruption Activists",
    ],
    publicSentiment:
      "Respected among environmental activists and local communities. Known for persistent legal advocacy against illegal mining.",
    monitoringSignals: [
      "Legal petitions and court proceedings",
      "Environmental activism and campaigns",
      "Community organizing and awareness programs",
      "Media interviews on mining issues",
      "Collaboration with environmental authorities",
    ],
    lastUpdated: "2024-08-02",
  },
]

export function getGlobalRiskStatistics() {
  const total = globalPoliticalProfiles.length
  const riskCounts = globalPoliticalProfiles.reduce(
    (acc, profile) => {
      acc[profile.riskLevel]++
      return acc
    },
    { low: 0, medium: 0, high: 0, critical: 0 },
  )

  return {
    total,
    low: riskCounts.low,
    medium: riskCounts.medium,
    high: riskCounts.high,
    critical: riskCounts.critical,
    lowPercentage: Math.round((riskCounts.low / total) * 100),
    mediumPercentage: Math.round((riskCounts.medium / total) * 100),
    highPercentage: Math.round((riskCounts.high / total) * 100),
    criticalPercentage: Math.round((riskCounts.critical / total) * 100),
  }
}

export function getCountryRiskAnalysis() {
  const countryRisks = globalPoliticalProfiles.reduce(
    (acc, profile) => {
      if (!acc[profile.country]) {
        acc[profile.country] = { total: 0, avgRisk: 0, profiles: [] }
      }
      acc[profile.country].total++
      acc[profile.country].avgRisk += profile.riskScore
      acc[profile.country].profiles.push(profile)
      return acc
    },
    {} as Record<string, { total: number; avgRisk: number; profiles: GlobalPoliticalProfile[] }>,
  )

  Object.keys(countryRisks).forEach((country) => {
    countryRisks[country].avgRisk = Math.round(countryRisks[country].avgRisk / countryRisks[country].total)
  })

  return countryRisks
}

export function getRiskCategoryAnalysis() {
  const totalProfiles = globalPoliticalProfiles.length
  const categoryTotals = globalPoliticalProfiles.reduce(
    (acc, profile) => {
      acc.landAcquisition += profile.keyRisks.landAcquisition
      acc.environmentalRegulation += profile.keyRisks.environmentalRegulation
      acc.socialUnrest += profile.keyRisks.socialUnrest
      acc.policyShifts += profile.keyRisks.policyShifts
      return acc
    },
    { landAcquisition: 0, environmentalRegulation: 0, socialUnrest: 0, policyShifts: 0 },
  )

  return {
    landAcquisition: Math.round(categoryTotals.landAcquisition / totalProfiles),
    environmentalRegulation: Math.round(categoryTotals.environmentalRegulation / totalProfiles),
    socialUnrest: Math.round(categoryTotals.socialUnrest / totalProfiles),
    policyShifts: Math.round(categoryTotals.policyShifts / totalProfiles),
  }
}

export function getRecentStatementsAnalysis() {
  const allStatements = globalPoliticalProfiles.flatMap((profile) =>
    profile.recentStatements.map((statement) => ({
      ...statement,
      profileId: profile.id,
      profileName: profile.fullName,
      country: profile.country,
    })),
  )

  return allStatements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Vector search simulation function for RHIS entries
export function searchRHISEntries(query: string): (RHISEntry | RHISPoliticianEntry)[] {
  const searchTerms = query.toLowerCase().split(" ")
  const allEntries = [
    ...rhisEntries,
    ...rhisPoliticianEntries.map((entry) => ({
      country: entry.politician_name.includes("Claudia Sheinbaum")
        ? "Mexico"
        : entry.politician_name.includes("Damares Alves") || entry.politician_name.includes("Reginaldo Lopes")
          ? "Brazil"
          : entry.politician_name.includes("Doug Ford") || entry.politician_name.includes("Jagmeet Singh")
            ? "Canada"
            : "India",
      issue: entry.issue,
      state: entry.state,
      impact: entry.impact,
      category: entry.category,
      political_situation: `${entry.politician_name} involvement in ${entry.issue}`,
      person_to_watch: entry.politician_name,
      action_required: Array.isArray(entry.action_required) ? entry.action_required.join("; ") : entry.action_required,
      source: entry.source,
      date: entry.date,
    })),
  ]

  return allEntries.filter((entry) => {
    const searchableText =
      `${entry.country} ${entry.issue} ${entry.state} ${entry.impact} ${entry.category} ${entry.political_situation} ${entry.person_to_watch}`.toLowerCase()

    return searchTerms.some((term) => searchableText.includes(term))
  })
}
