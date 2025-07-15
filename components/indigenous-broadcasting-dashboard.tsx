"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Network } from "vis-network/standalone";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Badge } from "@/components/ui/badge";
import Papa from "papaparse";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// TypeScript interfaces
interface Stakeholder {
  name: string;
  contact: string;
  role: string;
  engagement: string;
}

interface Issue {
  country: string;
  region: string;
  station: string;
  date: string;
  headline: string;
  details: string;
  sentiment: string;
  consultPeriod: string;
  legalFlags: string[];
  risk: string[];
  action: string;
  stakeholders: Stakeholder[];
  predictiveAlert: string;
  legislativeContext?: string;
  esgAlignment?: string;
  issueType: string[];
}

// Data
const issuesData: Issue[] = [
  {
    country: "India",
    region: "Andhra Pradesh",
    station: "AIR Visakhapatnam",
    date: "2025-07-13",
    headline: "Tribal Opposition to Bauxite Mine Expansion",
    details:
      "Broadcast reports tribal panchayats’ concerns over lack of consultation for a bauxite mine, citing environmental damage and FPIC violations under Forest Rights Act, 2006.",
    sentiment: "Negative",
    consultPeriod: "Not Initiated",
    legalFlags: ["FPIC Risk", "Forest Rights Act Violation"],
    risk: ["Legal", "Environmental", "Community"],
    action: "Engage tribal legal advisors. Review Forest Rights Act compliance. Initiate FPIC consultation.",
    stakeholders: [
      {
        name: "Tribal Panchayat Council",
        contact: "panchayat@andhra.gov.in",
        role: "Community Leader",
        engagement: "Initial meeting pending",
      },
    ],
    predictiveAlert: "60% likelihood of protests by August 2025 if consultation not initiated.",
    issueType: ["FPIC", "Protests"],
  },
  {
    country: "Canada",
    region: "Quebec",
    station: "CBC North",
    date: "2025-07-10",
    headline: "Innu Leaders Critique Iron Ore Mine Expansion",
    details:
      "Broadcast features Innu Nation spokesperson raising alarm over lack of consultation for iron ore mine expansion, citing violation of Duty to Consult under Canada’s Impact Assessment Act.",
    sentiment: "Negative",
    consultPeriod: "Ongoing",
    legalFlags: ["Duty to Consult", "Environmental Licensing"],
    risk: ["Legal", "Community", "ESG"],
    action: "Trigger FPIC review. Engage Innu leadership council. Pause environmental approvals.",
    stakeholders: [
      {
        name: "Innu Nation Leadership",
        contact: "innu@cbcnorth.ca",
        role: "Community Leader",
        engagement: "FPIC review scheduled for July 20, 2025",
      },
    ],
    predictiveAlert: "50% likelihood of legal challenge by September 2025 if consultation fails.",
    issueType: ["Legal", "FPIC"],
  },
  {
    country: "Mexico",
    region: "Sinaloa",
    station: "La Voz de los Pueblos",
    date: "2025-07-14",
    headline: "Cartel Mining Sparks Mayo/Yoreme Community Fears",
    details:
      "Broadcast reports Mayo/Yoreme concerns over illegal gold mining in San Ignacio and lack of FPIC for legal projects like ArcelorMittal’s San Jose mine. Community demands transparency on water usage and security measures.",
    sentiment: "Negative",
    consultPeriod: "Not Initiated",
    legalFlags: ["Constitutional Breach (Article 2)", "Cartel Activity"],
    risk: ["Legal", "Environmental", "ESG", "Security"],
    action:
      "Engage Mayo/Yoreme leaders via CLUIMISIN by July 20, 2025. Review NOM-157-SEMARNAT-2009 compliance for tailings. Strengthen security protocols per 2015 theft precedent. Publish water usage report on La Voz de los Pueblos.",
    stakeholders: [
      {
        name: "Mayo Community Council",
        contact: "mayo.council@sinaloa.org",
        role: "Community Leader",
        engagement: "Initial FPIC meeting scheduled for July 18, 2025",
      },
      {
        name: "Sinaloa Ministry of Economy",
        contact: "economy@sinaloa.gov.mx",
        role: "Government",
        engagement: "Pending consultation",
      },
      {
        name: "CLUIMISIN",
        contact: "info@cluimisin.org",
        role: "Industry Facilitator",
        engagement: "Collaboration initiated",
      },
    ],
    predictiveAlert: "70% likelihood of protests by September 2025 if water concerns unaddressed.",
    legislativeContext:
      "Sinaloa Congress (July 10, 2025) discussed security budget deficits (3,400M MXN vs. 4,777M needed) and open parliament platform, increasing scrutiny of mining projects.",
    esgAlignment: "Addressing water concerns supports ArcelorMittal’s 2030 sustainability goals.",
    issueType: ["Legal", "FPIC", "Protests"],
  },
];

// Stakeholder mapping data
const nodes = [
  { id: 1, label: "Mayo Community Council", group: "community", title: "Sinaloa indigenous stakeholder" },
  { id: 2, label: "Sinaloa Ministry of Economy", group: "government", title: "Supports mining investment" },
  { id: 3, label: "ArcelorMittal Legal Team", group: "company", title: "Internal stakeholder" },
  { id: 4, label: "CLUIMISIN", group: "industry", title: "Sinaloa mining facilitator" },
  { id: 5, label: "Tribal Panchayat Council", group: "community", title: "India indigenous stakeholder" },
  { id: 6, label: "Innu Nation Leadership", group: "community", title: "Canada indigenous stakeholder" },
];

const edges = [
  { from: 1, to: 3, label: "FPIC Consultation" },
  { from: 2, to: 3, label: "Policy Support" },
  { from: 3, to: 4, label: "Industry Collaboration" },
  { from: 5, to: 3, label: "FPIC Consultation" },
  { from: 6, to: 3, label: "Duty to Consult" },
];

// Sentiment trend data
const sentimentData = {
  labels: ["June 2025", "July 2025"],
  datasets: [
    {
      label: "Sinaloa Sentiment",
      data: [0, -10],
      borderColor: "#F59E0B",
      backgroundColor: "rgba(245, 158, 11, 0.2)",
      fill: true,
    },
    {
      label: "India Sentiment",
      data: [0, -8],
      borderColor: "#10B981",
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      fill: true,
    },
    {
      label: "Canada Sentiment",
      data: [0, -5],
      borderColor: "#1E3A8A",
      backgroundColor: "rgba(30, 58, 138, 0.2)",
      fill: true,
    },
  ],
};

export default function IndigenousBroadcastingDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("All");
  const containerRef = useRef<HTMLDivElement>(null);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  // Initialize Vis.js network
  useEffect(() => {
    if (containerRef.current) {
      const options = {
        nodes: { shape: "dot", size: 20, font: { size: 14 } },
        edges: { arrows: "to", font: { size: 12 } },
        groups: {
          community: { color: { background: "#10B981", border: "#059669" } },
          government: { color: { background: "#1E3A8A", border: "#1E40AF" } },
          company: { color: { background: "#F59E0B", border: "#D97706" } },
          industry: { color: { background: "#6B7280", border: "#4B5563" } },
        },
        layout: { improvedLayout: true },
        physics: { enabled: true },
      };
      new Network(containerRef.current, { nodes, edges }, options);
    }
  }, []);

  // Filter data by region and tab
  const filteredData = issuesData.filter((item) => {
    const regionMatch =
      selectedRegion === "" ||
      item.country === selectedRegion ||
      item.region === selectedRegion;
    const tabMatch =
      selectedTab === "All" || item.issueType.includes(selectedTab);
    return regionMatch && tabMatch;
  });

  // CSV export function
  const exportToCSV = () => {
    const csvData = filteredData.map((issue) => ({
      Headline: issue.headline,
      Station: issue.station,
      Region: issue.region,
      Country: issue.country,
      Risk: issue.risk.join(", "),
      LegalFlags: issue.legalFlags.join(", "),
      Action: issue.action,
    }));
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `indigenous_broadcasting_${new Date().toISOString()}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-blue-900 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold">Indigenous Broadcasting News</h1>
        <p className="text-lg">
          Real-time coverage of community grievances, FPIC issues, and regulatory
          risks for ArcelorMittal
        </p>
      </header>

      {/* Dropdown Filter and CSV Export */}
      <div className="mb-6 flex items-center space-x-4">
        <div>
          <label htmlFor="region-filter" className="text-blue-900 font-semibold mr-2">
            Filter by Region:
          </label>
          <select
            id="region-filter"
            className="p-2 border border-blue-900 rounded-lg bg-white text-blue-900"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All</option>
            <option value="India">India</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Canada">Canada</option>
            <option value="Quebec">Quebec</option>
            <option value="Mexico">Mexico</option>
            <option value="Sinaloa">Sinaloa</option>
          </select>
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
          onClick={exportToCSV}
        >
          Export to CSV
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex space-x-4 mb-6 flex-wrap">
        {["All", "Legal", "FPIC", "Protests"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-medium ${
              selectedTab === tab
                ? "bg-yellow-500 text-white shadow"
                : "bg-white text-blue-900 border border-blue-900"
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chronological Slider */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Broadcast Timeline</h2>
        <Slider {...sliderSettings}>
          {filteredData.map((issue, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg shadow-md mx-2">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-blue-900">
                  {issue.station} — {issue.region}, {issue.country}
                </h2>
                <span className="text-sm text-gray-500">{issue.date}</span>
              </div>
              <h3 className="text-xl font-bold text-yellow-600">{issue.headline}</h3>
              <p className="text-gray-700">{issue.details}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge
                  className={
                    issue.sentiment === "Negative"
                      ? "bg-red-100 text-red-700 border-red-300"
                      : "bg-green-100 text-green-700 border-green-300"
                  }
                >
                  {issue.sentiment}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                  {issue.consultPeriod}
                </Badge>
                {issue.legalFlags.map((flag, i) => (
                  <Badge key={i} className="bg-red-100 text-red-700 border-red-300">
                    {flag}
                  </Badge>
                ))}
                {issue.risk.map((r, i) => (
                  <Badge key={i} className="bg-yellow-100 text-yellow-700 border-yellow-300">
                    {r}
                  </Badge>
                ))}
              </div>
              <div className="mt-2 text-sm text-blue-900">
                <strong>Legislative Context:</strong> {issue.legislativeContext || "N/A"}
              </div>
              <div className="mt-2 text-sm text-blue-900">
                <strong>ESG Alignment:</strong> {issue.esgAlignment || "N/A"}
              </div>
              <div className="mt-2 text-sm text-blue-900">
                <strong>Predictive Alert:</strong> {issue.predictiveAlert}
              </div>
              <div className="mt-2 text-sm text-blue-900">
                <strong>Action:</strong> {issue.action}
              </div>
              <button
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setSelectedIssue(issue)}
              >
                View Engagement Details
              </button>
            </div>
          ))}
        </Slider>
      </section>

      {/* Stakeholder Mapping */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Stakeholder Mapping</h2>
        <div ref={containerRef} className="w-full h-96 border rounded-lg bg-white shadow-md"></div>
      </section>

      {/* Sentiment Trend Graph */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Sentiment Trend</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line
            data={sentimentData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Community Sentiment Over Time" },
              },
            }}
          />
        </div>
      </section>

      {/* FPIC and Legal Frameworks */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">FPIC and Legal Frameworks</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-blue-900">Free, Prior, and Informed Consent (FPIC)</h3>
          <p className="text-gray-700">
            Mexico’s 2023 Mining Law mandates FPIC for projects on indigenous lands, per Article 2 of the Constitution and UNDRIP Article 32. Key requirements:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li><strong>Free:</strong> No coercion or intimidation.</li>
            <li><strong>Prior:</strong> Consultation before project approval.</li>
            <li><strong>Informed:</strong> Full disclosure of project impacts.</li>
            <li><strong>Consent:</strong> Community approval with 5% profit-sharing.</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 text-blue-900">Mexican Legal Frameworks</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li><strong>Article 2, Mexican Constitution:</strong> Guarantees indigenous rights to self-determination and consultation.</li>
            <li><strong>2023 Mining Law:</strong> Requires environmental impact assessments and restoration programs (NOM-141-SEMARNAT-2003).</li>
            <li><strong>NOM-157-SEMARNAT-2009:</strong> Governs mining waste management.</li>
            <li><strong>ILO Convention 169:</strong> International standard for indigenous rights.</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 text-blue-900">Mayo/Yoreme Protest Risks</h3>
          <p className="text-gray-700">
            Broadcasts on La Voz de los Pueblos (July 2025) highlight Mayo/Yoreme concerns over water usage and cartel mining in Sinaloa, risking protests by September 2025 if unaddressed. Actions:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Engage Mayo/Yoreme leaders via CLUIMISIN for FPIC consultations by July 20, 2025.</li>
            <li>Publish transparent water usage reports to counter environmental fears.</li>
            <li>Strengthen security to mitigate cartel risks, per 2015 theft precedent.</li>
            <li>Align with Sinaloa’s open parliament initiative for transparency.</li>
          </ul>
        </div>
      </section>

      {/* Engagement Tracker */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Engagement Tracker</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {selectedIssue ? (
            <>
              <h3 className="text-lg font-semibold text-blue-900">
                {selectedIssue.station} — Engagement Details
              </h3>
              <table className="w-full mt-4 border-collapse">
                <thead>
                  <tr className="bg-blue-900 text-white">
                    <th className="p-2 text-left">Stakeholder</th>
                    <th className="p-2 text-left">Contact</th>
                    <th className="p-2 text-left">Role</th>
                    <th className="p-2 text-left">Engagement Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedIssue.stakeholders.map((stakeholder, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="p-2">{stakeholder.name}</td>
                      <td className="p-2">{stakeholder.contact}</td>
                      <td className="p-2">{stakeholder.role}</td>
                      <td className="p-2">{stakeholder.engagement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p className="text-gray-700">Select an issue to view engagement details.</p>
          )}
        </div>
      </section>

      {/* Feedback Portal */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-900">Feedback Portal</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700">Submit responses to community concerns or schedule consultations:</p>
          <textarea
            className="w-full p-2 border rounded-lg mt-2 text-gray-700"
            rows={4}
            placeholder="Enter your response..."
          ></textarea>
          <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg">
            Submit Feedback
          </button>
        </div>
      </section>
    </div>
  );
}
