"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "react-typewriter-effect";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Plotly from "react-plotly.js";
import { Download, BarChart2 } from "lucide-react";

interface SearchResult {
  headline: string;
  source: string;
  date?: string;
  details: string;
  tags: string[];
  issueType: string[];
  region?: string;
  country?: string;
  riskScore?: number; // 0-100
  likelihood?: number; // 0-100
  predictiveAlert?: string;
  sentimentScore?: number; // -1 to 1
}

interface IndigenousVectorSearchBarProps {
  issuesData: any[];
  selectedRegion: string;
  selectedTab: string;
}

// Mock real-time data (replace with API in production)
const realTimeData: SearchResult[] = [
  {
    headline: "EU CBAM: Carbon Tariff Impacts Steel Exports",
    source: "Reuters | July 15, 2025",
    date: "2025-07-15",
    details:
      "EU’s Carbon Border Adjustment Mechanism (CBAM) imposes tariffs on carbon-intensive steel imports, requiring emissions reporting for ArcelorMittal’s Mexico operations.",
    tags: ["Carbon Tariff", "Ecological Compliance", "ESG"],
    issueType: ["Ecological Compliance", "Legal"],
    riskScore: 80,
    likelihood: 75,
    predictiveAlert: "75% ± 5% likelihood of compliance costs by Q4 2025.",
    sentimentScore: -0.7,
  },
  {
    headline: "Carbon Credit Market: Voluntary Credits Surge",
    source: "Bloomberg | July 14, 2025",
    date: "2025-07-14",
    details:
      "Voluntary carbon credit prices rise 20% due to ESG demand. Opportunity for ArcelorMittal to offset Sinaloa emissions.",
    tags: ["Carbon Credits", "ESG", "Market Opportunity"],
    issueType: ["Carbon Credits"],
    riskScore: 30,
    likelihood: 50,
    predictiveAlert: "50% ± 10% chance of market entry opportunity by August 2025.",
    sentimentScore: 0.4,
  },
  {
    headline: "India: Tribal Protests Escalate Over Bauxite Mine",
    source: "AIR Visakhapatnam | July 13, 2025",
    date: "2025-07-13",
    details:
      "Tribal panchayats protest bauxite mine expansion, citing Forest Rights Act violations and environmental damage.",
    tags: ["FPIC", "Environmental Compliance", "Protests"],
    issueType: ["FPIC", "Protests", "Ecological Compliance"],
    region: "Andhra Pradesh",
    country: "India",
    riskScore: 60,
    likelihood: 60,
    predictiveAlert: "60% ± 8% likelihood of protests by August 2025.",
    sentimentScore: -0.6,
  },
];

// Static search results
const staticSearchResults: SearchResult[] = [
  {
    headline: "USMCA Article 2.4 Breach: 30% Tariff on Minerals",
    source: "RHIS Legal Tracker | July 2025",
    date: "2025-07-10",
    details:
      "Unilateral U.S. tariff violates USMCA terms, risking investor-state arbitration.",
    tags: ["Treaty Violation", "ISDS", "Cross-Border Compliance"],
    issueType: ["Legal"],
    riskScore: 90,
    likelihood: 80,
    predictiveAlert: "80% ± 5% likelihood of arbitration by Q3 2025.",
    sentimentScore: -0.8,
  },
  {
    headline: "Sinaloa Rail Bypass: Indigenous Consultation Absent",
    source: "FPIC Legal Signal | RHIS Monitoring",
    date: "2025-07-12",
    details:
      "No Free, Prior and Informed Consent (FPIC) in rail expansion zones tied to tariff-avoidant trade routes.",
    tags: ["FPIC", "Infrastructure", "Environmental Compliance"],
    issueType: ["FPIC", "Protests"],
    region: "Sinaloa",
    country: "Mexico",
    riskScore: 85,
    likelihood: 70,
    predictiveAlert: "70% ± 7% likelihood of protests by September 2025.",
    sentimentScore: -0.9,
  },
  {
    headline: "Quota Enforcement Model: Refined Sugar Template",
    source: "H.R.1 Section 359k | U.S. House 2025",
    date: "2025-07-11",
    details:
      "Legal mechanism for tariff-rate quotas may be adapted to steel inputs.",
    tags: ["Labeling Law", "Customs Enforcement", "Trade Quota"],
    issueType: ["Legal"],
    riskScore: 60,
    likelihood: 55,
    predictiveAlert: "55% ± 10% chance of steel quota enforcement by Q4 2025.",
    sentimentScore: -0.5,
  },
];

// Bubble chart data (Rosling-inspired)
const bubbleChartData = [
  {
    region: "Sinaloa",
    x: 70,
    y: 85,
    z: 1000,
    color: "#F59E0B",
    text: "Mayo/Yoreme Protests",
    sentiment: -0.9,
  },
  {
    region: "Andhra Pradesh",
    x: 60,
    y: 60,
    z: 800,
    color: "#10B981",
    text: "Bauxite Mine Opposition",
    sentiment: -0.6,
  },
  {
    region: "Quebec",
    x: 50,
    y: 50,
    z: 600,
    color: "#1E3A8A",
    text: "Innu Legal Challenge",
    sentiment: -0.5,
  },
  {
    region: "Global (USMCA)",
    x: 80,
    y: 90,
    z: 1200,
    color: "#6B7280",
    text: "USMCA Tariff Breach",
    sentiment: -0.8,
  },
  {
    region: "EU (CBAM)",
    x: 75,
    y: 80,
    z: 1000,
    color: "#EF4444",
    text: "Carbon Tariff Impact",
    sentiment: -0.7,
  },
];

// Heatmap data
const heatmapData = [
  { region: "Sinaloa", riskScore: 85 },
  { region: "Andhra Pradesh", riskScore: 60 },
  { region: "Quebec", riskScore: 50 },
  { region: "Global (USMCA)", riskScore: 90 },
  { region: "EU (CBAM)", riskScore: 80 },
];

// Time-series forecast data
const forecastData = [
  { date: "2025-07", risk: 85, carbonPrice: 24 },
  { date: "2025-08", risk: 88, carbonPrice: 26 },
  { date: "2025-09", risk: 90, carbonPrice: 28 },
];

const IndigenousVectorSearchBar: React.FC<IndigenousVectorSearchBarProps> = ({
  issuesData,
  selectedRegion,
  selectedTab,
}) => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [storyMode, setStoryMode] = useState(false);
  const [dataExplorer, setDataExplorer] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
    // Mock autocomplete suggestions
    const suggestionList = [
      "FPIC",
      "Mayo/Yoreme",
      "USMCA",
      "Carbon Credits",
      "CBAM",
      "Sinaloa",
      "Andhra Pradesh",
    ].filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    setSuggestions(searchQuery ? suggestionList.slice(0, 3) : []);
  }, [searchQuery, selectedRegion, selectedTab]);

  if (!mounted) return null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
    const lowerQuery = query.toLowerCase();

    const filteredStatic = [...staticSearchResults, ...realTimeData].filter(
      (result) =>
        (selectedRegion === "" ||
          result.country === selectedRegion ||
          result.region === selectedRegion) &&
        (selectedTab === "All" || result.issueType.includes(selectedTab)) &&
        (result.headline.toLowerCase().includes(lowerQuery) ||
          result.details.toLowerCase().includes(lowerQuery) ||
          result.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
          result.source.toLowerCase().includes(lowerQuery))
    );

    const filteredIssues = issuesData
      .filter(
        (issue) =>
          (selectedRegion === "" ||
            issue.country === selectedRegion ||
            issue.region === selectedRegion) &&
          (selectedTab === "All" || issue.issueType.includes(selectedTab)) &&
          (issue.headline.toLowerCase().includes(lowerQuery) ||
            issue.details.toLowerCase().includes(lowerQuery) ||
            issue.legalFlags.some((flag: string) =>
              flag.toLowerCase().includes(lowerQuery)
            ) ||
            issue.risk.some((risk: string) => risk.toLowerCase().includes(lowerQuery)))
      )
      .map((issue) => ({
        headline: issue.headline,
        source: `${issue.station} | ${issue.date}`,
        details: issue.details,
        tags: [...issue.legalFlags, ...issue.risk],
        issueType: issue.issueType,
        region: issue.region,
        country: issue.country,
        riskScore: issue.region === "Sinaloa" ? 85 : issue.region === "Andhra Pradesh" ? 60 : 50,
        likelihood: issue.region === "Sinaloa" ? 70 : issue.region === "Andhra Pradesh" ? 60 : 50,
        predictiveAlert: issue.predictiveAlert,
        sentimentScore: issue.sentiment === "Negative" ? -0.7 : 0.3,
      }));

    setSearchResults([...filteredStatic, ...filteredIssues]);
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(searchResults, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `search_results_${new Date().toISOString()}.json`;
    link.click();
  };

  const exportToCSV = () => {
    const csvData = searchResults.map((result) => ({
      Headline: result.headline,
      Source: result.source,
      Region: result.region || "N/A",
      Country: result.country || "N/A",
      RiskScore: result.riskScore,
      Likelihood: result.likelihood,
      PredictiveAlert: result.predictiveAlert,
      SentimentScore: result.sentimentScore,
    }));
    const csv = [
      "Headline,Source,Region,Country,RiskScore,Likelihood,PredictiveAlert,SentimentScore",
      ...csvData.map(
        (row) =>
          `"${row.Headline}","${row.Source}","${row.Region}","${row.Country}",${row.RiskScore},${row.Likelihood},"${row.PredictiveAlert}",${row.SentimentScore}`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `search_results_${new Date().toISOString()}.csv`;
    link.click();
  };

  const renderStoryMode = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-lg font-bold text-blue-900">Global Risk Narrative</h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-gray-700 mt-2">
          <strong>Context:</strong> ArcelorMittal faces escalating risks in Sinaloa, where Mayo/Yoreme communities demand transparency on water usage, compounded by cartel-driven illegal mining. Globally, EU’s CBAM and USMCA tariff breaches threaten compliance costs.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-gray-700 mt-2">
          <strong>Conflict:</strong> Lack of FPIC in Sinaloa (70% ± 7% protest likelihood by September 2025) and carbon-intensive operations under CBAM scrutiny risk legal and ESG setbacks.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p className="text-gray-700 mt-2">
          <strong>Resolution:</strong> Engage Mayo/Yoreme leaders via CLUIMISIN by July 20, 2025. Enhance emissions tracking for CBAM compliance. Explore voluntary carbon credits to offset costs. Align with Sinaloa’s open parliament initiative for transparency.
        </p>
      </motion.div>
    </motion.div>
  );

  const renderDataExplorer = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-lg font-bold text-blue-900">Data Explorer</h3>
      <table className="w-full mt-4 border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-2 text-left">Headline</th>
            <th className="p-2 text-left">Region</th>
            <th className="p-2 text-left">Risk Score</th>
            <th className="p-2 text-left">Likelihood</th>
            <th className="p-2 text-left">Sentiment</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((result, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-100">
              <td className="p-2">{result.headline}</td>
              <td className="p-2">{result.region || "N/A"}</td>
              <td className="p-2">{result.riskScore || "N/A"}</td>
              <td className="p-2">{result.likelihood || "N/A"}%</td>
              <td className="p-2">{result.sentimentScore?.toFixed(2) || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-gray-700 mt-4">
        <strong>Model Metadata:</strong> Mock ML model (Logistic Regression, 85% accuracy, features: sentiment, broadcast frequency, regulatory signals).
      </p>
    </motion.div>
  );

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-2 text-blue-900">
        Horizon Scanning & Compliance Search
      </h2>
      <p className="text-gray-700 mb-4">
        AI-powered search for legal, regulatory, ESG, and predictive insights
      </p>
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for FPIC, Mayo/Yoreme, USMCA, Carbon Credits, CBAM..."
            className="w-full p-3 border border-blue-900 rounded-lg text-blue-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {suggestions.length > 0 && (
            <motion.div
              className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-md z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSearch(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 flex items-center"
          onClick={exportToJSON}
        >
          <Download className="w-4 h-4 mr-2" />
          JSON
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-green-700 flex items-center"
          onClick={exportToCSV}
        >
          <Download className="w-4 h-4 mr-2" />
          CSV
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            storyMode ? "bg-yellow-500 text-white shadow" : "bg-white text-blue-900 border border-blue-900"
          }`}
          onClick={() => {
            setStoryMode(!storyMode);
            setDataExplorer(false);
          }}
        >
          {storyMode ? "Data View" : "Story Mode"}
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            dataExplorer ? "bg-yellow-500 text-white shadow" : "bg-white text-blue-900 border border-blue-900"
          }`}
          onClick={() => {
            setDataExplorer(!dataExplorer);
            setStoryMode(false);
          }}
        >
          <BarChart2 className="w-4 h-4 inline mr-2" />
          {dataExplorer ? "Search View" : "Data Explorer"}
        </button>
      </div>
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            {storyMode ? (
              renderStoryMode()
            ) : dataExplorer ? (
              renderDataExplorer()
            ) : (
              <>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Search Results</h3>
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((result, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-white p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <h3 className="text-lg font-bold text-yellow-600">
                          <Typewriter
                            text={result.headline}
                            delay={30}
                            cursorColor="#F59E0B"
                          />
                        </h3>
                        <p className="text-sm text-gray-500">{result.source}</p>
                        <p className="text-gray-700">{result.details}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {result.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-700 border border-blue-300 rounded px-2 py-1 text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {result.predictiveAlert && (
                          <p className="text-sm text-red-600 mt-2">
                            <strong>Predictive Alert:</strong> {result.predictiveAlert}
                          </p>
                        )}
                      </motion.div>
                    ))}
                    <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-2">
                      Risk Bubble Chart (Rosling-Inspired)
                    </h3>
                    <Plotly
                      data={[
                        {
                          x: bubbleChartData.map((d) => d.x),
                          y: bubbleChartData.map((d) => d.y),
                          text: bubbleChartData.map((d) => d.text),
                          mode: "markers",
                          marker: {
                            size: bubbleChartData.map((d) => d.z / 50),
                            color: bubbleChartData.map((d) => d.color),
                            opacity: 0.8,
                          },
                        },
                      ]}
                      layout={{
                        xaxis: { title: "Likelihood (%)", range: [0, 100] },
                        yaxis: { title: "Risk Score", range: [0, 100] },
                        title: "Global Risk Landscape",
                        hovermode: "closest",
                        width: 800,
                        height: 500,
                        showlegend: false,
                      }}
                      config={{ responsive: true, displayModeBar: true }}
                    />
                    <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-2">
                      Risk Heatmap
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={heatmapData}>
                        <XAxis dataKey="region" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="riskScore" fill="#F59E0B" />
                      </BarChart>
                    </ResponsiveContainer>
                    <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-2">
                      Risk and Carbon Price Forecast
                    </h3>
                    <Plotly
                      data={[
                        {
                          x: forecastData.map((d) => d.date),
                          y: forecastData.map((d) => d.risk),
                          type: "scatter",
                          mode: "lines+markers",
                          name: "Protest Risk",
                          line: { color: "#F59E0B" },
                        },
                        {
                          x: forecastData.map((d) => d.date),
                          y: forecastData.map((d) => d.carbonPrice),
                          type: "scatter",
                          mode: "lines+markers",
                          name: "Carbon Price ($/tCO2e)",
                          line: { color: "#10B981" },
                          yaxis: "y2",
                        },
                      ]}
                      layout={{
                        xaxis: { title: "Date" },
                        yaxis: { title: "Protest Risk", range: [0, 100] },
                        yaxis2: {
                          title: "Carbon Price ($/tCO2e)",
                          overlaying: "y",
                          side: "right",
                          range: [0, 50],
                        },
                        title: "Risk and Carbon Price Trends",
                        hovermode: "closest",
                        width: 800,
                        height: 400,
                      }}
                      config={{ responsive: true, displayModeBar: true }}
                    />
                  </>
                ) : (
                  <p className="text-gray-700">No results found for "{searchQuery}".</p>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!isSearching && (
        <p className="text-gray-700 mt-4">
          Enter a query to scan for legal, regulatory, ESG, or predictive insights.
        </p>
      )}
    </motion.div>
  );
};

export default IndigenousVectorSearchBar;
export const VectorSearch = IndigenousVectorSearchBar;

