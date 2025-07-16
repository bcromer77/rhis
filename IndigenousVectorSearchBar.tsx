"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "react-typewriter-effect";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Plotly from "react-plotly.js";
import { Download, Share2 } from "lucide-react";

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
  predictiveAlert?: string;
  likelihood?: number; // 0-100, for bubble chart
  indigenousApproved?: boolean; // OCAP® compliance
  language?: string; // For multilingual support
  embedding?: number[]; // For vector search
}

interface IndigenousVectorSearchBarProps {
  issuesData: any[];
  selectedRegion: string;
  selectedTab: string;
}

// Mock real-time data (replace with XEETCH API in production)
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
    indigenousApproved: true,
    language: "Mayo",
    embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
  },
  {
    headline: "EU CBAM: Carbon Tariff Impacts Steel Exports",
    source: "Reuters | July 15, 2025",
    date: "2025-07-15",
    details: "EU’s Carbon Border Adjustment Mechanism (CBAM) imposes tariffs on carbon-intensive steel imports, affecting ArcelorMittal’s Mexico operations.",
    tags: ["Carbon Tariff", "Ecological Compliance", "ESG"],
    issueType: ["Ecological Compliance", "Legal"],
    region: "EU",
    country: "Europe",
    riskScore: 80,
    likelihood: 75,
    predictiveAlert: "75% ± 5% likelihood of compliance costs by Q4 2025.",
    indigenousApproved: false,
    language: "Spanish",
    embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
  },
  {
    headline: "Carbon Credit Market: Voluntary Credits Surge",
    source: "Bloomberg | July 14, 2025",
    date: "2025-07-14",
    details: "Voluntary carbon credit prices rise 20% due to demand for ESG-aligned projects. Opportunity for ArcelorMittal to offset emissions in Sinaloa.",
    tags: ["Carbon Credits", "ESG", "Market Opportunity"],
    issueType: ["Carbon Credits"],
    region: "Global",
    country: "Global",
    riskScore: 30,
    likelihood: 50,
    predictiveAlert: "50% chance of market entry opportunity by August 2025.",
    indigenousApproved: false,
    language: "Spanish",
    embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
  },
];

// Static search results (from provided page)
const staticSearchResults: SearchResult[] = [
  {
    headline: "USMCA Article 2.4 Breach: 30% Tariff on Minerals",
    source: "RHIS Legal Tracker | July 2025",
    date: "2025-07-10",
    details: "Unilateral U.S. tariff violates USMCA terms. Potential for investor-state arbitration and state-to-state dispute resolution.",
    tags: ["Treaty Violation", "ISDS", "Cross-Border Compliance"],
    issueType: ["Legal"],
    region: "North America",
    country: "Mexico",
    riskScore: 90,
    likelihood: 80,
    predictiveAlert: "80% ± 5% likelihood of arbitration by Q3 2025.",
    indigenousApproved: false,
    language: "Spanish",
    embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
  },
  {
    headline: "Sinaloa Rail Bypass: Indigenous Consultation Absent",
    source: "FPIC Legal Signal | RHIS Monitoring",
    date: "2025-07-12",
    details: "No documented Free, Prior and Informed Consent in rail expansion zones tied to tariff-avoidant trade routes.",
    tags: ["FPIC", "Infrastructure", "Environmental Compliance"],
    issueType: ["FPIC", "Protests"],
    region: "Sinaloa",
    country: "Mexico",
    riskScore: 85,
    likelihood: 70,
    predictiveAlert: "70% ± 7% likelihood of protests by September 2025.",
    indigenousApproved: true,
    language: "Mayo",
    embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
  },
  {
    headline: "Quota Enforcement Model: Refined Sugar Becomes Template",
    source: "H.R.1 Section 359k | U.S. House 2025",
    date: "2025-07-11",
    details: "Legal mechanism for reallocating tariff-rate quotas now active. May be adapted to steelmaking inputs.",
    tags: ["Labeling Law", "Customs Enforcement", "Trade Quota"],
    issueType: ["Legal"],
    region: "North America",
    country: "Mexico",
    riskScore: 60,
    likelihood: 55,
    predictiveAlert: "55% ± 5% chance of steel quota enforcement by Q4 2025.",
    indigenousApproved: false,
    language: "Spanish",
    embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
  },
];

// Visualization data
const bubbleChartData = [
  {
    region: "Sinaloa",
    x: 70, // Protest likelihood
    y: 85, // Risk score
    z: 1000, // Size (impact)
    color: "#F59E0B", // Amber for Mayo/Yoreme protests
    text: "Mayo/Yoreme Protests",
  },
  {
    region: "Andhra Pradesh",
    x: 60,
    y: 60,
    z: 800,
    color: "#10B981", // Emerald for bauxite opposition
    text: "Bauxite Mine Opposition",
  },
  {
    region: "Quebec",
    x: 50,
    y: 50,
    z: 600,
    color: "#3B82F6", // Blue for Innu challenge
    text: "Innu Legal Challenge",
  },
  {
    region: "Global (USMCA)",
    x: 80,
    y: 90,
    z: 1200,
    color: "#6B7280", // Gray for USMCA tariff
    text: "USMCA Tariff Breach",
  },
  {
    region: "EU (CBAM)",
    x: 75,
    y: 80,
    z: 1000,
    color: "#EF4444", // Red for CBAM impact
    text: "Carbon Tariff Impact",
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

const IndigenousVectorSearchBar: React.FC<IndigenousVectorSearchBarProps> = ({
  issuesData,
  selectedRegion,
  selectedTab,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [storyMode, setStoryMode] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Precompute embeddings for vector database
  useEffect(() => {
    realTimeData.forEach(async (result) => {
      if (!result.embedding) {
        result.embedding = await generateEmbedding(`${result.headline} ${result.details}`);
      }
    });
    staticSearchResults.forEach(async (result) => {
      if (!result.embedding) {
        result.embedding = await generateEmbedding(`${result.headline} ${result.details}`);
      }
    });
  }, []);

  // XEETCH and STT integration
  useEffect(() => {
    const fetchXEETCHBroadcasts = async () => {
      // Placeholder for client-provided XEETCH stream
      const response = await fetch('https://xeetch.inpi.gob.mx/api/stream', {
        headers: { 'Community-Approval': 'mayo_yoreme_2025' }
      }).catch(() => ({
        json: () => Promise.resolve([]),
      }));
      const audioBlob = await response.blob?.() || new Blob();
      const transcript = await transcribeAudio(audioBlob, ['mayo', 'yaqui', 'guarijio', 'spanish']);
      const embedding = await generateEmbedding(transcript.text);
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
        indigenousApproved: true,
        language: transcript.language || 'Mayo',
        embedding,
      }];
      setSearchResults((prev) => [...new Set([...prev, ...processedData])]);
    };
    if (searchQuery.toLowerCase().includes('mayo') || searchQuery.toLowerCase().includes('sinaloa')) {
      fetchXEETCHBroadcasts();
    }
  }, [searchQuery]);

  // Optimized vector search
  const generateEmbedding = async (text: string): Promise<number[]> => {
    // Simulate Hugging Face sentence-transformers (client-provided model)
    return Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05);
  };

  const cosineSimilarity = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB) || 0;
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(!!query);
    const lowerQuery = query.toLowerCase();

    // Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // Combine data sources
    const allResults = [
      ...realTimeData,
      ...staticSearchResults,
      ...issuesData.map((issue) => ({
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
        indigenousApproved: issue.region === "Sinaloa",
        language: issue.region === "Sinaloa" ? "Mayo" : "Spanish",
        embedding: Array(768).fill(0).map(() => Math.random() * 0.1 - 0.05),
      })),
    ];

    // Vector search with filters
    const filteredResults = allResults
      .map((result) => ({
        result,
        similarity: result.embedding ? cosineSimilarity(queryEmbedding, result.embedding) : 0,
      }))
      .filter(
        ({ result, similarity }) =>
          (selectedRegion === "" ||
            result.country === selectedRegion ||
            result.region === selectedRegion) &&
          (selectedTab === "All" || result.issueType.includes(selectedTab)) &&
          (similarity > 0.6 || // Higher threshold for precision
            result.headline.toLowerCase().includes(lowerQuery) ||
            result.details.toLowerCase().includes(lowerQuery) ||
            result.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
            result.source.toLowerCase().includes(lowerQuery)) &&
          result.indigenousApproved // OCAP® compliance
      )
      .sort((a, b) => b.similarity - a.similarity)
      .map(({ result }) => result)
      .slice(0, 10); // Paginate for scalability

    setSearchResults(filteredResults);

    // Semantic suggestions
    const suggestionList = [
      "FPIC", "Mayo/Yoreme", "USMCA", "Carbon Credits", "CBAM", "Sinaloa", "Water Transparency",
    ].filter(async (s) => (await cosineSimilarity(queryEmbedding, await generateEmbedding(s))) > 0.6);
    setSuggestions(query ? suggestionList.slice(0, 3) : []);
  };

  const transcribeAudio = async (audioBlob: Blob, languages: string[]) => {
    // Mock STT (replace with client-provided Google Cloud or custom Wav2Vec2)
    return {
      text: "Community leaders demand water transparency for San Jose mine.",
      sentiment: -0.9,
      riskScore: 85,
      likelihood: 70,
      language: languages.includes('mayo') ? 'Mayo' : 'Spanish',
    };
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(searchResults.filter((r) => r.indigenousApproved), null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `search_results_${new Date().toISOString()}.json`;
    link.click();
  };

  const exportToCSV = () => {
    const csvData = searchResults.filter((r) => r.indigenousApproved).map((result) => ({
      Headline: result.headline,
      Source: result.source,
      Region: result.region || "N/A",
      Country: result.country || "N/A",
      RiskScore: result.riskScore,
      Likelihood: result.likelihood,
      PredictiveAlert: result.predictiveAlert,
      Language: result.language,
      IndigenousApproved: result.indigenousApproved ? "Yes" : "No",
    }));
    const csv = [
      "Headline,Source,Region,Country,RiskScore,Likelihood,PredictiveAlert,Language,IndigenousApproved",
      ...csvData.map(
        (row) =>
          `"${row.Headline}","${row.Source}","${row.Region}","${row.Country}",${row.RiskScore || 'N/A'},${row.Likelihood || 'N/A'},"${row.PredictiveAlert || 'N/A'}","${row.Language || 'N/A'}","${row.IndigenousApproved}"`
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `search_results_${new Date().toISOString()}.csv`;
    link.click();
  };

  const shareWithCommunity = (results: SearchResult[], email: string) => {
    console.log(`Sharing results with ${email}:`, results.filter((r) => r.indigenousApproved));
  };

  // Narrative story mode (Dykes/Disney-inspired)
  const renderStoryMode = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-6 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-lg font-bold text-gray-800">Compliance Story: Navigating Global Risks</h3>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <p className="text-gray-700 mt-2">
          <strong>Context:</strong> XEETCH broadcasts highlight Mayo/Yoreme demands for water transparency at the San Jose mine, per semantic analysis. EU CBAM and USMCA breaches escalate compliance risks.
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

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">
        AI-Powered Vector Search for Regulatory & Indigenous Insights
      </h2>
      <p className="text-gray-700 mb-4">
        Search for legal, regulatory, ESG, and Indigenous risks with semantic understanding
      </p>
      <div className="flex items-center space-x-4 mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for FPIC, Mayo/Yoreme, USMCA, Carbon Credits, CBAM..."
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {suggestions.length > 0 && (
            <motion.div
              className="absolute w-full bg-gray-50 border border-gray-300 rounded-lg mt-1 shadow-md z-10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {suggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                  onClick={() => handleSearch(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </motion.div>
          )}
        </div>
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-600 flex items-center"
          onClick={exportToJSON}
        >
          <Download className="w-4 h-4 mr-2" />
          JSON
        </button>
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-600 flex items-center"
          onClick={exportToCSV}
        >
          <Download className="w-4 h-4 mr-2" />
          CSV
        </button>
        <button
          className="bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-emerald-600 flex items-center"
          onClick={() => shareWithCommunity(searchResults, 'mayo.council@sinaloa.org')}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share with Community
        </button>
        <button
          className={`px-4 py-2 rounded-lg font-medium ${
            storyMode ? "bg-amber-500 text-white shadow" : "bg-gray-50 text-gray-800 border border-gray-300"
          }`}
          onClick={() => setStoryMode(!storyMode)}
        >
          {storyMode ? "Data View" : "Story Mode"}
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
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Vector Search Results</h3>
                {searchResults.length > 0 ? (
                  <>
                    {searchResults.map((result, idx) => (
                      <motion.div
                        key={idx}
                        className="bg-gray-50 p-4 rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <h3 className="text-lg font-bold text-amber-500">
                          <Typewriter
                            text={result.headline}
                            delay={30}
                            cursorColor="#F59E0B"
                          />
                        </h3>
                        <p className="text-sm text-gray-600">
                          {result.source} {result.indigenousApproved ? "(Community Approved)" : "(Pending Approval)"}
                        </p>
                        <p className="text-gray-700">{result.details}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {result.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="bg-blue-100 text-blue-500 border border-blue-200 rounded px-2 py-1 text-sm"
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
                    <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Risk Bubble Chart</h3>
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
                        width: 600,
                        height: 400,
                        paper_bgcolor: "#F9FAFB", // Match bg-gray-50
                        plot_bgcolor: "#F9FAFB",
                      }}
                      config={{ responsive: true, displayModeBar: true }}
                    />
                    <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Risk Heatmap</h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={heatmapData}>
                        <XAxis dataKey="region" stroke="#1F2937" />
                        <YAxis domain={[0, 100]} stroke="#1F2937" />
                        <Tooltip />
                        <Bar dataKey="riskScore" fill="#F59E0B" />
                      </BarChart>
                    </ResponsiveContainer>
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
          Enter a query to scan for legal, regulatory, ESG, or Indigenous insights using AI-powered vector search.
        </p>
      )}
    </motion.div>
  );
};

export default IndigenousVectorSearchBar;
