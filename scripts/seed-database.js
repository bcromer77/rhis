// Run this script to seed your MongoDB with sample regulatory documents
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"

const sampleDocuments = [
  {
    title: "New Environmental Impact Assessment Requirements for Coal Mining",
    content:
      "The Ministry of Environment has introduced stricter environmental impact assessment requirements for coal mining operations. All new mining permits must include comprehensive water resource impact studies and biodiversity assessments. The new regulations require mining companies to submit detailed environmental management plans before operations can commence.",
    country: "india",
    sector: "coal",
    topic: "Environmental",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-15"),
    source: "Ministry of Environment, Forest and Climate Change",
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
      "Provincial government is considering a 15% increase in gold mining royalty rates to fund infrastructure development. The proposal includes graduated rates based on production volume and market prices. Mining companies have 60 days to submit feedback on the proposed changes.",
    country: "canada",
    sector: "gold",
    topic: "Taxation",
    region: "Provincial",
    riskLevel: "medium",
    publishedDate: new Date("2024-01-20"),
    source: "Ontario Ministry of Northern Development",
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
      "New mandatory consultation process for mining permits on traditional territories. All mining companies must engage with Indigenous communities through formal consultation protocols before permit approval. The framework includes revenue-sharing agreements and environmental protection measures.",
    country: "canada",
    sector: "uranium",
    topic: "Indigenous Rights",
    region: "Federal",
    riskLevel: "high",
    publishedDate: new Date("2024-01-25"),
    source: "Crown-Indigenous Relations and Northern Affairs Canada",
    metadata: {
      documentType: "framework",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-02-15"),
    },
  },
  {
    title: "Silver Export Licensing Streamlined Process",
    content:
      "Mexico introduces streamlined export licensing for silver mining companies. The new digital platform reduces processing time from 30 days to 5 days. Companies can now submit applications online with automated compliance checking.",
    country: "mexico",
    sector: "silver",
    topic: "Export",
    region: "Federal",
    riskLevel: "low",
    publishedDate: new Date("2024-01-30"),
    source: "Secretaría de Economía",
    metadata: {
      documentType: "procedure",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-02-01"),
    },
  },
  {
    title: "Mining Safety Protocol Updates for Copper Operations",
    content:
      "Updated safety protocols for copper mining operations include mandatory safety training every 6 months, enhanced ventilation requirements, and new emergency response procedures. All copper mines must comply within 90 days.",
    country: "mexico",
    sector: "copper",
    topic: "Safety",
    region: "Federal",
    riskLevel: "medium",
    publishedDate: new Date("2024-02-05"),
    source: "Secretaría del Trabajo y Previsión Social",
    metadata: {
      documentType: "protocol",
      jurisdiction: "federal",
      status: "active",
      effectiveDate: new Date("2024-05-05"),
    },
  },
]

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db("rhisprism")
    const collection = db.collection("regulatory_documents")

    // Clear existing documents
    await collection.deleteMany({})
    console.log("Cleared existing documents")

    // Insert sample documents
    const result = await collection.insertMany(sampleDocuments)
    console.log(`Inserted ${result.insertedCount} documents`)

    // Create text search index
    await collection.createIndex({
      title: "text",
      content: "text",
      topic: "text",
    })
    console.log("Created text search index")

    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
