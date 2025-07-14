// Database seeding script for RhisPrism regulatory data
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DATABASE_NAME = "rhisprism"

const sampleRegulations = [
  {
    title: "New Environmental Impact Assessment Requirements for Coal Mining",
    content:
      "The Ministry of Environment has introduced stricter environmental impact assessment requirements for coal mining operations. These new regulations mandate comprehensive biodiversity studies, water quality assessments, and community consultation processes before any mining permits are approved.",
    country: "india",
    sector: "coal",
    topic: "Environmental",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-15"),
    source: "Ministry of Environment, Forest and Climate Change",
    tags: [
      "environmental impact",
      "coal mining",
      "biodiversity",
      "water quality",
      "community consultation",
      "mining permits",
      "regulations",
      "compliance",
    ],
    metadata: {
      documentType: "regulation",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-03-01"),
    },
  },
  {
    title: "Gold Mining Royalty Rate Adjustment Proposal",
    content:
      "Provincial government is considering a 15% increase in gold mining royalty rates to fund infrastructure development. The proposal includes new taxation frameworks and revenue sharing agreements with local communities.",
    country: "canada",
    sector: "gold",
    topic: "Taxation",
    region: "Provincial",
    riskLevel: "medium",
    publishedDate: new Date("2024-01-20"),
    source: "Ontario Ministry of Northern Development",
    tags: [
      "gold mining",
      "royalty rates",
      "taxation",
      "infrastructure",
      "revenue sharing",
      "local communities",
      "financial impact",
    ],
    metadata: {
      documentType: "proposal",
      jurisdiction: "provincial",
      status: "under_review",
      effectiveDate: new Date("2024-06-01"),
    },
  },
  {
    title: "Indigenous Land Rights Consultation Framework for Mining",
    content:
      "New mandatory consultation process for mining permits on traditional territories. The framework requires free, prior, and informed consent from Indigenous communities and establishes benefit-sharing agreements.",
    country: "canada",
    sector: "uranium",
    topic: "Indigenous Rights",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-25"),
    source: "Crown-Indigenous Relations and Northern Affairs Canada",
    tags: [
      "indigenous rights",
      "land rights",
      "consultation",
      "traditional territories",
      "free prior informed consent",
      "benefit sharing",
      "mining permits",
    ],
    metadata: {
      documentType: "framework",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-02-15"),
    },
  },
]

const samplePoliticalProfiles = [
  {
    fullName: "Pawan Kalyan",
    country: "India",
    region: "Andhra Pradesh",
    politicalParty: "Jana Sena Party (JSP)",
    currentPosition: "Deputy Chief Minister of Andhra Pradesh",
    politicalAlliances: ["BJP", "TDP"],
    coreIssues: [
      "Land Grabbing & Land Rights",
      "Environmental Concerns",
      "Rural Development",
      "Education & Healthcare",
      "Economic Policy Reform",
    ],
    politicalStance:
      "Actively opposes illegal land acquisition and environmentally damaging activities such as uranium mining in the Nallamala Forest. Advocates for rural development and challenges policies damaging to local communities.",
    publicSentiment:
      "Popular among local communities, especially in areas dealing with land rights, employment, and economic disparity",
    riskLevel: "critical",
    riskScore: 85,
    coordinates: [15.9129, 79.74],
    lastUpdated: new Date("2025-03-20"),
    keyRisks: {
      landAcquisition: 9,
      environmentalRegulation: 8,
      socialUnrest: 8,
      policyShifts: 7,
    },
    potentialImpacts: [
      "Land Acquisition Delays: Strong stance could delay land acquisition for industrial projects in Andhra Pradesh",
      "Environmental Regulations: Opposition to mining could lead to stricter regulations, increasing compliance costs",
      "Protests and Social Unrest: Potential to mobilize communities against industrial developments",
      "Policy Shifts: Risk of more restrictive policies if Pawan Kalyan gains more influence in government",
    ],
    monitoringSignals: [
      "Public statements on land acquisition",
      "Environmental policy positions",
      "Community mobilization activities",
      "Alliance changes with BJP/TDP",
      "Legislative proposals and voting patterns",
    ],
    recentStatements: [
      {
        date: "2025-03-20",
        statement: "Opposition to land grabbing practices in Andhra Pradesh",
        impact: "high",
        source: "Jana Sena Party Press Conference",
      },
      {
        date: "2025-03-18",
        statement: "Call to halt uranium mining in Nallamala Forest",
        impact: "high",
        source: "Environmental Rally Speech",
      },
    ],
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(DATABASE_NAME)

    // Clear existing data
    await db.collection("regulatory_documents").deleteMany({})
    await db.collection("political_profiles").deleteMany({})

    // Insert sample data
    await db.collection("regulatory_documents").insertMany(sampleRegulations)
    await db.collection("political_profiles").insertMany(samplePoliticalProfiles)

    console.log("Database seeded successfully")
    console.log(`Inserted ${sampleRegulations.length} regulatory documents`)
    console.log(`Inserted ${samplePoliticalProfiles.length} political profiles`)
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
