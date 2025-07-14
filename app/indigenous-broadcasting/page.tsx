"use client";
import React, { useState } from "react";

const issuesData = [
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "Radio Costa Viva",
    date: "2025-07-10",
    headline: "New Port Requires Number Plate Tracking",
    details:
      "Local station reports that the new port development in Mazatlán requires all commercial vehicles to have number plate tracking, raising privacy and data protection concerns among local transport unions and Indigenous fishing communities.",
    risk: ["Privacy", "Regulatory", "Community Relations"],
    action: "Review local data protection laws. Engage with transport unions and Indigenous leaders. Assess compliance with privacy regulations.",
    link: "#"
  },
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "La Voz de los Pueblos",
    date: "2025-07-08",
    headline: "Water Quality Issues in Elota River",
    details:
      "Community complaints about declining water quality, allegedly linked to increased industrial runoff from new infrastructure projects.",
    risk: ["Environmental", "Reputational"],
    action: "Initiate water quality assessment. Liaise with environmental authorities. Prepare public statement.",
    link: "#"
  },
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "Radio Sierra Madre",
    date: "2025-07-05",
    headline: "Deforestation Protests by Mayo and Yoreme",
    details:
      "Protests over rapid deforestation near port access roads, citing lack of environmental impact consultation.",
    risk: ["Environmental", "Consultation", "Legal"],
    action: "Review consultation records. Engage with affected communities. Assess legal exposure.",
    link: "#"
  },
  {
    country: "Canada",
    region: "Northern Ontario",
    station: "Wawatay Radio Network",
    date: "2025-07-09",
    headline: "Pipeline Expansion Consultation Gaps",
    details:
      "First Nations not properly consulted about pipeline expansion, with leaders threatening legal action under Section 35 of the Constitution.",
    risk: ["Consultation", "Legal", "Operational"],
    action: "Initiate urgent legal review. Engage with First Nations leadership. Prepare for possible litigation.",
    link: "#"
  },
  {
    country: "Canada",
    region: "Akwesasne",
    station: "CKON 97.3 FM",
    date: "2025-07-07",
    headline: "Land Rights Dispute with Mohawk Council",
    details:
      "Land rights dispute involving a mining company and the Mohawk Council, with allegations of encroachment on unceded territory.",
    risk: ["Land Rights", "Legal", "Reputational"],
    action: "Engage external counsel. Review land agreements. Initiate dialogue with Mohawk Council.",
    link: "#"
  },
  {
    country: "Canada",
    region: "Attawapiskat",
    station: "APTN News",
    date: "2025-07-06",
    headline: "Boil-Water Advisory Blamed on Industry",
    details:
      "Boil-water advisory in Attawapiskat, with community members blaming industrial activity for contamination.",
    risk: ["Environmental", "Reputational"],
    action: "Commission independent water testing. Prepare crisis communications. Engage with local authorities.",
    link: "#"
  },
  {
    country: "India",
    region: "Jharkhand",
    station: "AIR Ranchi",
    date: "2025-07-11",
    headline: "Forest Rights Act Violations Alleged",
    details:
      "Munda community claims steel plant expansion is proceeding without proper consent under the Forest Rights Act, with threats of PIL.",
    risk: ["Legal", "Consultation", "Operational"],
    action: "Review Forest Rights Act compliance. Engage with community leaders. Prepare for PIL response.",
    link: "#"
  },
  {
    country: "India",
    region: "Madhya Pradesh",
    station: "Radio Adivasi Dhwani",
    date: "2025-07-08",
    headline: "Health Impacts from Mining Dust",
    details:
      "Villagers report increased respiratory illness, allegedly due to dust from nearby mining operations.",
    risk: ["Health", "Environmental", "Reputational"],
    action: "Commission health impact study. Review dust mitigation measures. Engage with local health authorities.",
    link: "#"
  },
  {
    country: "India",
    region: "Tamil Nadu",
    station: "Radio Kotagiri",
    date: "2025-07-05",
    headline: "Lack of Consultation on Road Project",
    details:
      "Nilgiri tribal council complains no formal consultation was held before a new road project, violating PESA.",
    risk: ["Consultation", "Legal", "Community Relations"],
    action: "Audit consultation process. Engage with tribal council. Review compliance with PESA.",
    link: "#"
  }
];

const riskColors = {
  "Legal": "bg-red-100 text-red-700 border-red-300",
  "Environmental": "bg-green-100 text-green-700 border-green-300",
  "Consultation": "bg-yellow-100 text-yellow-700 border-yellow-300",
  "Community Relations": "bg-blue-100 text-blue-700 border-blue-300",
  "Reputational": "bg-purple-100 text-purple-700 border-purple-300",
  "Operational": "bg-orange-100 text-orange-700 border-orange-300",
  "Privacy": "bg-pink-100 text-pink-700 border-pink-300",
  "Land Rights": "bg-indigo-100 text-indigo-700 border-indigo-300",
  "Health": "bg-teal-100 text-teal-700 border-teal-300"
};

function Dashboard() {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [filtered, setFiltered] = useState(issuesData);

  const handleFilter = () => {
    let data = issuesData;
    if (country) data = data.filter(i => i.country === country);
    if (region) data = data.filter(i => i.region.toLowerCase().includes(region.toLowerCase()));
    setFiltered(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col items-center">
      <header className="w-full py-8 bg-white shadow flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">LCAO Legal Risk Dashboard</h1>
        <p className="text-lg text-gray-600 max-w-2xl text-center">
          Instantly surface actionable local broadcasting issues for legal and CSR teams. Designed for clarity, urgency, and world-class compliance.
        </p>
      </header>
      <main className="w-full max-w-5xl mt-10 flex flex-col items-center">
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center mb-8">
          <select
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            value={country}
            onChange={e => setCountry(e.target.value)}
            aria-label="Select country"
          >
            <option value="">All Countries</option>
            <option value="Mexico">Mexico</option>
            <option value="Canada">Canada</option>
            <option value="India">India</option>
          </select>
          <input
            className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="Filter by region (e.g. Sinaloa)"
            value={region}
            onChange={e => setRegion(e.target.value)}
            aria-label="Filter by region"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition"
            onClick={handleFilter}
            aria-label="Apply filters"
          >
            Find Issues
          </button>
        </div>
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.length === 0 ? (
            <div className="col-span-2 text-center text-gray-500 text-xl">
              No issues found. Adjust your filters.
            </div>
          ) : (
            filtered.map((issue, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition border-l-8 border-blue-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-gray-800">
                      {issue.headline}
                    </h2>
                    <span className="text-xs text-gray-400 font-mono">{issue.date}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-1">
                    {issue.station} &middot; {issue.region}, {issue.country}
                  </div>
                  <div className="mb-3 text-gray-700">{issue.details}</div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {issue.risk.map((r, i) => (
                      <span
                        key={i}
                        className={`px-2 py-1 rounded border text-xs font-semibold ${riskColors[r] || "bg-gray-100 text-gray-700 border-gray-300"}`}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-gray-800">Action:</span> {issue.action}
                  </div>
                </div>
                <a
                  href={issue.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-blue-600 hover:underline font-medium self-end"
                >
                  View Source
                </a>
              </div>
            ))
          )}
        </section>
      </main>
      <footer className="mt-16 mb-4 text-gray-400 text-sm">
        Designed for legal clarity, actionable insight, and global CSR leadership.
      </footer>
    </div>
  );
}

export default Dashboard;
