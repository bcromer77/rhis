// scripts/seed_signals.js
import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config({ path: ".env" });

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI not set in .env");

const seedDocs = [
  // --- Sarepta ---
  {
    company: "Sarepta Therapeutics",
    title: "FDA Clinical Hold",
    signal: "FDA halts SRP-9001 gene therapy trial",
    severity: "CRITICAL",
    description: "FDA places clinical hold on Sarepta's SRP-9001 DMD trial. Stock drops 30% pre-market.",
    why_traders_care: "Direct stock hit, biotech regulatory overhang.",
    source: "FDA Docket 2025-134",
    country: "USA",
    commodity: [],
    tags: ["biotech", "FDA", "clinical trial"],
    tickers: ["SRPT"],
    sentiment: -0.89,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Micron ---
  {
    company: "Micron",
    title: "Taiwan Fab Water Emergency",
    signal: "Water rationing restricts Micron Taiwan fabs",
    severity: "CRITICAL",
    description: "Water shortages threaten Micron DRAM production; Q2 flagged risk.",
    why_traders_care: "DRAM/AI supply squeeze risk.",
    source: "Earnings transcript, Sept 2025",
    country: "Taiwan",
    commodity: ["Water"],
    tags: ["semiconductors", "Taiwan", "supply chain"],
    tickers: ["MU", "TSM"],
    sentiment: -0.71,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Meta ---
  {
    company: "Meta",
    title: "Data Center Veto",
    signal: "Tribal council vetoes $800M NM facility",
    severity: "CRITICAL",
    description: "Ute Mountain Council blocks water allocations under Colorado Compact.",
    why_traders_care: "Force majeure precedent for cloud infra.",
    source: "Council Record, Sept 2025",
    country: "USA",
    commodity: ["Water"],
    tags: ["cloud", "indigenous rights"],
    tickers: ["META"],
    sentiment: -0.82,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- De Beers ---
  {
    company: "De Beers",
    title: "Ownership Battle",
    signal: "Botswana vs Angola clash over control",
    severity: "WARNING",
    description: "Resource nationalism escalates over diamond assets.",
    why_traders_care: "Delays permits, raises ESG/legal costs.",
    source: "Reuters, Sept 2025",
    country: "Botswana / Angola",
    commodity: ["Diamonds"],
    tags: ["nationalisation", "ESG"],
    tickers: ["AAL.L"],
    sentiment: -0.45,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- MongoDB ---
  {
    company: "MongoDB",
    title: "EU Data Sovereignty Risk",
    signal: "New EU localization rules debated",
    severity: "WARNING",
    description: "EU Commission weighs restricting US cloud platforms.",
    why_traders_care: "Could hinder Atlas growth, add compliance cost.",
    source: "EU Consultation, Sept 2025",
    country: "EU",
    commodity: [],
    tags: ["compliance", "EU"],
    tickers: ["MDB"],
    sentiment: -0.33,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Chemaf ---
  {
    company: "Chemaf (DRC)",
    title: "Cobalt Operations Collapse",
    signal: "Shutdown threat unless investors secured",
    severity: "CRITICAL",
    description: "DRC cobalt giant warns of closure, spiking EV supply risk.",
    why_traders_care: "Global EV chain fragility, bullish cobalt.",
    source: "Bloomberg, Sept 2025",
    country: "DRC",
    commodity: ["Cobalt"],
    tags: ["EV", "geopolitics", "DRC"],
    tickers: ["TSLA", "GM", "RIVN"],
    sentiment: -0.91,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Caspian pipeline ---
  {
    company: "CPC",
    title: "Caspian Pipeline Drone Strike",
    signal: "Office at Novorossiysk damaged",
    severity: "CRITICAL",
    description: "Kazakh crude exports threatened after drone strike incident.",
    why_traders_care: "Raises war-risk premia, bullish tanker rates.",
    source: "Black Sea local reports, Sept 2025",
    country: "Russia / Kazakhstan",
    commodity: ["Crude Oil"],
    tags: ["pipeline", "Black Sea"],
    tickers: ["BP", "SHEL", "TRMD"],
    sentiment: -0.78,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Freeport McMoRan ---
  {
    company: "Freeport McMoRan",
    title: "Grasberg Force Majeure",
    signal: "Copper shipments delayed",
    severity: "CRITICAL",
    description: "Force majeure declared on major Indonesian mine.",
    why_traders_care: "Bullish copper prices; negative for smelters.",
    source: "Company statement, Sept 2025",
    country: "Indonesia",
    commodity: ["Copper"],
    tags: ["commodities", "copper"],
    tickers: ["FCX", "RIO"],
    sentiment: -0.66,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- OpenAI ---
  {
    company: "OpenAI",
    title: "Texas Stargate Water Strain",
    signal: "Hyperscale AI infra hits local water",
    severity: "CRITICAL",
    description: "$500B facility strains Abilene TX water supply.",
    why_traders_care: "ESG activism, infra permitting at risk.",
    source: "Texas Council Minutes",
    country: "USA",
    commodity: ["Water"],
    tags: ["AI infra", "Texas"],
    sentiment: -0.79,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Nike x Kim ---
  {
    company: "Nike",
    title: "Kim Kardashian Collab Hype",
    signal: "120M+ IG impressions ahead of launch",
    severity: "OPPORTUNITY",
    description: "Social media buzz drives huge sentiment upside.",
    why_traders_care: "Bullish Q3 sales outlook.",
    source: "Instagram/X, Sept 2025",
    country: "Global",
    tags: ["influencer", "sneakers"],
    tickers: ["NKE"],
    sentiment: 0.72,
    _mlBucket: "opportunities",
    _mlWind: "tailwinds",
  },
  {
    company: "Nike",
    title: "ESG Boycott Risk",
    signal: "#JustStopIt trends",
    severity: "CRITICAL",
    description: "NGOs claim shoe supply chain abuses.",
    why_traders_care: "Brand/revenue damage.",
    source: "Greenpeace, Sept 2025",
    country: "Global",
    tags: ["boycott", "ESG"],
    tickers: ["NKE"],
    sentiment: -0.85,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- ArcelorMittal (regulatory dashboard) ---
  {
    company: "ArcelorMittal",
    title: "Brazil Supreme Court Indigenous Case",
    signal: "Licensing dispute over Minas Gerais mine",
    severity: "CRITICAL",
    description: "FPIC violation claims challenge ore expansion permits.",
    why_traders_care: "Could revoke permits, ESG precedent.",
    source: "Brazil SC Court File, Sept 2025",
    country: "Brazil",
    commodity: ["Iron Ore"],
    tags: ["indigenous rights", "Brazil"],
    tickers: ["MT"],
    sentiment: -0.83,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "ArcelorMittal",
    title: "India Nationalisation Pressure",
    signal: "Politicians call to seize steel assets",
    severity: "WARNING",
    description: "Populist push for nationalisation of foreign steel plants.",
    why_traders_care: "Sovereign risk, foreign capital flight.",
    source: "Indian Parliament Records",
    country: "India",
    commodity: ["Steel"],
    tags: ["nationalisation", "India"],
    tickers: ["MT"],
    sentiment: -0.72,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "ArcelorMittal",
    title: "Canada Indigenous Consultation Dispute",
    signal: "Ontario First Nations contest permits",
    severity: "WARNING",
    description: "Claims lack of consultation on Ontario steel facility.",
    why_traders_care: "Litigation risk, costly delay.",
    source: "Ontario Tribunal Filing",
    country: "Canada",
    commodity: ["Steel"],
    tags: ["Canada", "indigenous rights"],
    tickers: ["MT"],
    sentiment: -0.51,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "ArcelorMittal",
    title: "EU CBAM Tariffs",
    signal: "Carbon border tariffs bite exports",
    severity: "CRITICAL",
    description: "CBAM duties imposed on India/Brazil steel flows.",
    why_traders_care: "Margin compression, ESG cost increase.",
    source: "EU Trade Bulletin",
    country: "EU",
    commodity: ["Steel", "CO2"],
    tags: ["CBAM", "ESG"],
    tickers: ["MT"],
    sentiment: -0.64,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Telangana political risk ---
  {
    company: "ArcelorMittal / Vedanta (Telangana)",
    title: "Telangana Populist Opposition Risk",
    signal: "New politician threatens chaos for miners",
    severity: "CRITICAL",
    description: "Opposition vows to block licenses, citing indigenous abuse.",
    why_traders_care: "Creates sovereign/political instability risk.",
    source: "Telangana Assembly Speech, Sept 2025",
    country: "India / Telangana",
    commodity: ["Iron Ore", "Coal"],
    tags: ["political", "mining", "Telangana"],
    tickers: ["MT", "VEDL.NS"],
    sentiment: -0.77,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },

  // --- Boeing deep dive ---
  {
    company: "Boeing",
    title: "FAA Oversight Enhanced",
    signal: "737/787 production scrutiny",
    severity: "CRITICAL",
    description: "FAA steps up oversight on safety/manufacturing lapses.",
    why_traders_care: "Margin squeeze, compliance overhang, stock risk.",
    source: "FAA Bulletins, Sept 2025",
    country: "USA",
    commodity: ["Aerospace"],
    tags: ["FAA", "safety"],
    tickers: ["BA"],
    sentiment: -0.85,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "Boeing",
    title: "China Certification Delay",
    signal: "CAAC slows approvals",
    severity: "WARNING",
    description: "China delays Boeing approvals amid US–China tensions.",
    why_traders_care: "Loses China sales, Airbus gains.",
    source: "CAAC Communications",
    country: "China",
    commodity: ["Aerospace"],
    tags: ["China", "certification"],
    tickers: ["BA", "AIR.PA"],
    sentiment: -0.68,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "Boeing",
    title: "Supply Chain Fragility",
    signal: "Titanium shortages + composites",
    severity: "WARNING",
    description: "Russian titanium sanctions strain input security.",
    why_traders_care: "Delivery delays ripple; Airbus benefits.",
    source: "IATA Reports",
    country: "Global",
    commodity: ["Titanium"],
    tags: ["supply chain", "materials"],
    tickers: ["BA", "ATI"],
    sentiment: -0.49,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "Boeing",
    title: "Litigation Exposure",
    signal: "Crash families + airlines litigation",
    severity: "CRITICAL",
    description: "Global lawsuits mount across jurisdictions.",
    why_traders_care: "Multi‑billion settlements, rating downgrades risk.",
    source: "Court Filings, Sept 2025",
    country: "Global",
    commodity: [],
    tags: ["litigation", "Boeing", "aviation"],
    tickers: ["BA"],
    sentiment: -0.81,
    _mlBucket: "risks",
    _mlWind: "headwinds",
  },
  {
    company: "Boeing",
    title: "Defense Contract Offset",
    signal: "Pentagon/NATO boost military orders",
    severity: "OPPORTUNITY",
    description: "Defense procurement strengthens amid geopolitical tension.",
    why_traders_care: "Commercial losses cushioned by defense tailwinds.",
    source: "Pentagon Procurement, Sept 2025",
    country: "USA / NATO",
    commodity: ["Defense"],
    tags: ["military", "NATO"],
    tickers: ["BA", "LMT"],
    sentiment: 0.42,
    _mlBucket: "opportunities",
    _mlWind: "tailwinds",
  },
];

async function run() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("prism_db");
    const signals = db.collection("signals");

    console.log("🧹 Clearing old seed docs...");
    await signals.deleteMany({});

    console.log("🌱 Inserting demo seed docs...");
    await signals.insertMany(seedDocs);

    console.log(`✅ Done seeding ${seedDocs.length} signals!`);
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    await client.close();
  }
}

run();
