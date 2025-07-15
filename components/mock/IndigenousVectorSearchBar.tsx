"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "react-typewriter-effect";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Plotly from "react-plotly.js";
import { Download, BarChart2, Share2 } from "lucide-react";

interface SearchResult {
  headline: string;
  source: string;
  date?: string;
  details: string;
  tags: string[];
  issueType: string[];
  region?: string;
  country?: string;
  riskScore?: number;
  likelihood?: number;
  predictiveAlert?: string;
  sentimentScore?: number;
  indigenousApproved?: boolean;
  language?: string; // Mayo, Yaqui, Guarijío, Spanish
}

interface IndigenousVectorSearchBarProps {
  issuesData: any[];
  selectedRegion: string;
  selectedTab: string;
}

// Mock XEETCH and real-time data (replace with client-provided API)
const realTimeData: SearchResult[] = [
  {
    headline: "Mayo/Yoreme Protest Water Usage at San Jose Mine",
    source: "XEETCH La Voz de los Tres Ríos | July 15, 2025",
    date: "2025-07-15",
    details: "Community leaders demand transparency on water consumption, citing FPIC violations.",
    tags: ["Protests", "FPIC", "Water Transparency"],
    issueType: ["Protests", "FPIC"],
    region: "Sinaloa",
    country: "Mexico",
    riskScore: 85,
    likelihood: 70,
    predictiveAlert: "70% ± 7% likelihood of protests by September 2025.",
    sentimentScore: -0.9,
    indigenousApproved: true,
    language: "Mayo",
  },
  {
    headline: "EU CBAM: Carbon Tariff Impacts Steel Exports",
    source: "Reuters | July 15, 2025",
    date: "2025-07-15",
    details: "EU’s CBAM imposes tariffs on carbon-intensive steel, affecting Mexico operations.",
    tags: ["Carbon Tariff", "Ecological Compliance", "ESG"],
    issueType: ["Ecological Compliance", "Legal"],
    riskScore: 80,
    likelihood: 75,
    predictiveAlert: "75% ± 5% likelihood of compliance costs by Q4 2025.",
    sentimentScore: -0.7,
    indigenousApproved: false,
    language: "Spanish",
  },
];

const staticSearchResults: SearchResult[] = [
  {
    headline: "USMCA Article 2.4 Breach: 30% Tariff on Minerals",
    source: "RHIS Legal Tracker | July 2025",
    date: "2025-07-10",
    details: "Unilateral U.S. tariff risks investor-state arbitration.",
    tags: ["Treaty Violation", "ISDS", "Cross-Border Compliance"],
    issueType: ["Legal"],
    riskScore: 90,
    likelihood: 80,
    predictiveAlert: "80% ± 5% likelihood of arbitration by Q3 2025.",
    sentimentScore: -0.8,
    indigenousApproved: false,
    language: "Spanish",
  },
];

// Bubble chart data (Rosling-inspired)
const bubbleChartData = [
  { region: "Sinaloa", x: 70, y: 85, z: 1000, color: "#F59E0B", text: "Mayo/Yoreme Protests", sentiment: -0.9 },
  { region: "Andhra Pradesh", x: 60, y: 60, z: 800, color: "#10B981", text: "Bauxite Mine Opposition", sentiment: -0.6 },
  { region: "EU (CBAM)", x: 75, y: 80, z: 1000, color: "#EF4444", text: "Carbon Tariff Impact", sentiment: -0.7 },
];

// Heatmap data
const heatmapData = [
  { region: "Sinaloa", riskScore: 85 },
  { region: "Andhra Pradesh", riskScore: 60 },
  { region: "EU (CBAM)", riskScore: 80 },
];

// Time-series forecast data
const forecastData = [
  { date: "2025-07", risk: 85, carbonPrice: 24 },
  { date: "2025-08", risk: 88, carbonPrice: 26 },
  { date: "2025-09", risk: 90, carbonPrice: 28 },
];

// Correlation matrix data (mock)
const correlationData = [
  { variable: "FPIC Violations", FPIC: 1, Protests: 0.85, ESG: 0.6 },
  { variable: "Protests", FPIC: 0.85, Protests: 1, ESG: 0.7 },
  { variable: "ESG", FPIC: 0.6, Protests: 0.7, ESG: 1 },
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
  const [chartFilters, setChartFilters] = useState({ dateRange: "all", issueType: "all" });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
    // Mock autocomplete suggestions
    const suggestionList = [
      "FPIC", "Mayo/Yoreme", "USMCA", "Carbon Credits", "CBAM", "Sinaloa", "Water Transparency",
    ].filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    setSuggestions(searchQuery ? suggestionList.slice(0, 3) : []);
  }, [searchQuery, selectedRegion, selectedTab]);

  // Mock STT and XEETCH integration (replace with client-provided API)
  useEffect(() => {
    const fetchXEETCHBroadcasts = async () => {
      // Placeholder for client-provided XEETCH stream
      const response = await fetch('https://xeetch.inpi.gob.mx/api/stream', {
        headers: { 'Community-Approval': 'mayo_yoreme_2025' }
      }).catch(() => ({
        json: () => Promise.resolve([]), // Fallback for mock
      }));
      const audioBlob = await response.blob?.() || new Blob();
      const transcript = await transcribeAudio(audioBlob, ['mayo', 'yaqui', 'guarijio', 'spanish']);
      const processedData = [{
        headline: 'Mayo/Yoreme Demand Water Transparency',
        source: 'XEETCH La Voz de los Tres Ríos | July 15, 2025',
        details: transcript.text || 'Community leaders discuss water usage concerns at San Jose mine.',
        tags: ['Protests', 'FPIC', 'Water Transparency'],
        issueType: ['Protests', 'FPIC'],
        region: 'Sinaloa',
        country: 'Mexico',
        riskScore: transcript.riskScore || 85,
        likelihood: transcript.likelihood || 70,
        predictiveAlert: '70% ± 7% likelihood of protests by September 2025.',
        sentimentScore: transcript.sentiment || -0.9,
        indigenousApproved: true,
        language: transcript.language || 'Mayo',
      }];
      setSearchResults((prev) => [...prev, ...processedData]);
    };
    if (searchQuery.includes('Mayo/Yoreme') || searchQuery.includes('Sinaloa')) {
      fetchXEETCHBroadcasts();
    }
  }, [searchQuery]);

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
          result.source.toLowerCase().includes(lowerQuery)) &&
        result.indigenousApproved // OCAP® compliance
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
        riskScore: issue.region === "Sinaloa" ? 85 : 60,
        likelihood: issue.region === "Sinaloa" ? 70 : 60,
        predictiveAlert: issue.predictiveAlert,
        sentimentScore: issue.sentiment === "Negative" ? -0.7 : 0.3,
        indigenousApproved: issue.region === "Sinaloa", // Mock OCAP®
        language: issue.region === "Sinaloa" ? "Mayo" : "Spanish",
      }));

    setSearchResults([...filteredStatic, ...filteredIssues]);
  };

  const transcribeAudio = async (audioBlob: Blob, languages: string[]) => {
    // Mock STT (replace with client-provided or custom model)
    return {
      text: "Community leaders demand water transparency for San Jose mine.",
      sentiment: -0.9,
      riskScore: 85,
      likelihood: 70,
      language: languages.includes('mayo') ? 'Mayo' : 'Spanish',
    };
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
      Language: result.language,
      IndigenousApproved: result.indigenousApproved ? "Yes" : "No",
    }));
    const csv = [
      "Headline,Source,Region,Country,RiskScore,Likelihood,PredictiveAlert,SentimentScore,Language,IndigenousApproved",
      ...csvData.map(
        (row) =>
          `"${row.Headline}","${row.Source}","${row.Region}","${row.Country}",${row.RiskScore},${row.Likelihood},"${row.PredictiveAlert}",${row.SentimentScore},"${row.Language}","${row.IndigenousApproved}"`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `search_results_${new Date().toISOString()}.csv`;
    link.click();
  };

  const shareWithCommunity = (results: SearchResult[], email: string) => {
    // Mock community sharing (replace with client-provided endpoint)
    console.log(`Sharing results with ${email}:`, results.filter((r) => r.indigenousApproved));
  };

  const renderStoryMode = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-lg font-bold text-blue-900">Global Risk Narrative</h3>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-gray-700 mt-2">
          <strong>Context:</strong> Mayo/Yoreme in Sinaloa demand water transparency for the San Jose mine, per XEETCH broadcasts. EU CBAM and USMCA breaches escalate compliance risks.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <p className="text-gray-700 mt-2">
          <strong>Conflict:</strong> FPIC violations (70% ± 7% protest likelihood by September 2025) and carbon-intensive operations threaten ESG goals.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <p className="text-gray-700 mt-2">
          <strong>Resolution:</strong> Engage Mayo/Yoreme via CLUIMISIN by July 20, 2025. Enhance CBAM emissions tracking and explore carbon credits.
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
            <th className="p-2 text-left">Language</th>
            <th className="p-2 text-left">Approved</th>
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
              <td className="p-2">{result.language || "N/A"}</td>
              <td className="p-2">{result.indigenousApproved ? "Yes" : "No"}</td>
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
        AI-powered search for legal, regulatory, ESG, and Indigenous insights
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 flex items-center"
          onClick={() => shareWithCommunity(searchResults, 'mayo.council@sinaloa.org')}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share with Community
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
                        <p className="text-sm text-gray-500">
                          {result.source} {result.indigenousApproved ? "(Community Approved)" : "(Pending Approval)"}
                        </p>
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
                        <p className="text-sm text-gray-700 mt-2">
                          <strong>Language:</strong> {result.language}
                        </p>
                      </motion.div>
                    ))}
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">Chart Filters</h3>
                      <select
                        className="p-2 border rounded-lg"
                        value={chartFilters.issueType}
                        onChange={(e) => setChartFilters({ ...chartFilters, issueType: e.target.value })}
                      >
                        <option value="all">All Issues</option>
                        <option value="Protests">Protests</option>
                        <option value="FPIC">FPIC</option>
                        <option value="Ecological Compliance">Ecological Compliance</option>
                      </select>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-2">
                      Risk Bubble Chart (Rosling-Inspired)
                    </h3>
                    <Plotly
                      data={[
                        {
                          x: bubbleChartData
                            .filter((d) => chartFilters.issueType === "all" || d.text.includes(chartFilters.issueType))
                            .map((d) => d.x),
                          y: bubbleChartData
                            .filter((d) => chartFilters.issueType === "all" || d.text.includes(chartFilters.issueType))
                            .map((d) => d.y),
                          text: bubbleChartData
                            .filter((d) => chartFilters.issueType === "all" || d.text.includes(chartFilters.issueType))
                            .map((d) => d.text),
                          mode: "markers",
                          marker: {
                            size: bubbleChartData
                              .filter((d) => chartFilters.issueType === "all" || d.text.includes(chartFilters.issueType))
                              .map((d) => d.z / 50),
                            color: bubbleChartData
                              .filter((d) => chartFilters.issueType === "all" || d.text.includes(chartFilters.issueType))
                              .map((d) => d.color),
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
                    <h3 className="text-lg font-semibold text-blue-900 mt-6 mb-2">
                      Risk Correlation Matrix
                    </h3>
                    <Plotly
                      data={[{
                        type: "heatmap",
                        x: ["FPIC", "Protests", "ESG"],
                        y: ["FPIC", "Protests", "ESG"],
                        z: [
                          [1, 0.85, 0.6],
                          [0.85, 1, 0.7],
                          [0.6, 0.7, 1],
                        ],
                        colorscale: "Viridis",
                      }]}
                      layout={{
                        title: "Risk Correlation Matrix",
                        xaxis: { title: "Variables" },
                        yaxis: { title: "Variables" },
                        width: 500,
                        height: 500,
                      }}
                      config={{ responsive: true }}
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
          Enter a query to scan for legal, regulatory, ESG, or Indigenous insights.
        </p>
      )}
    </motion.div>
  );
};

export default IndigenousVectorSearchBar;
