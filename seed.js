// seed.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://bazilcromer_db_user:rhis12345@cluster0.ox7fzmb.mongodb.net/prism_db";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("prism_db");
    const signals = db.collection("signals");

    await signals.insertMany([
      {
        signal: "Mexico passes lithium nationalization law",
        why_traders_care: "Nationalization of lithium could disrupt global supply chains and impact EV makers.",
        platform_pitch: "Early signals from local senate debates before international news wires.",
        country: "Mexico",
        urgency: 8.5,
        created_at: new Date()
      },
      {
        signal: "Chile copper miners strike escalates",
        why_traders_care: "Global copper supply may tighten, pushing up prices and impacting electronics/EV sectors.",
        platform_pitch: "Union tensions surfaced in local labor boards before global media.",
        country: "Chile",
        urgency: 9.0,
        created_at: new Date()
      },
      {
        signal: "Congo imposes cobalt export ban",
        why_traders_care: "Cobalt export restrictions will shock EV battery producers and commodity markets.",
        platform_pitch: "Local ministerial decree spotted ahead of international commodity desk alerts.",
        country: "DR Congo",
        urgency: 9.3,
        created_at: new Date()
      },
      {
        signal: "U.S. Supreme Court hears Colorado River water rights case",
        why_traders_care: "Water rights litigation could ripple through utilities, agriculture, and muni bonds.",
        platform_pitch: "Court docket flagged before mainstream coverage of water shortages.",
        country: "USA",
        urgency: 8.2,
        created_at: new Date()
      },
      {
        signal: "India expands rare earth mining zones",
        why_traders_care: "Expansion boosts India's strategic supply; impacts global defense and green tech industries.",
        platform_pitch: "Parliamentary transcripts surfaced ahead of international energy analysts.",
        country: "India",
        urgency: 7.8,
        created_at: new Date()
      }
    ]);

    console.log("✅ Seed data inserted!");
  } catch (err) {
    console.error("❌ Error seeding data:", err);
  } finally {
    await client.close();
  }
}

run();

