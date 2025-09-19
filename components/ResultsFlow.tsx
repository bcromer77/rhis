"use client";

import React, { useState } from "react";

// Import country data packs
import mexicoTranscripts from "@/data/transcripts.json";
import mexicoPdfs from "@/data/pdfs.json";
import mexicoEntities from "@/data/entities.json";
import peruComparison from "@/data/peru_comparison.json";

import brazilTranscripts from "@/data/brazil/transcripts.json";
import brazilPdfs from "@/data/brazil/pdfs.json";
import brazilEntities from "@/data/brazil/entities.json";
import brazilComparison from "@/data/brazil/comparison.json";

import chileTranscripts from "@/data/chile/transcripts.json";
import chilePdfs from "@/data/chile/pdfs.json";
import chileEntities from "@/data/chile/entities.json";
import chileComparison from "@/data/chile/comparison.json";

type AlertProps = {
  title: string;
  description: string;
  date: string;
  riskScore: number;
};

function AlertCard({ title, description, date, riskScore }: AlertProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-500">
      <h2 className="text-xl font-semibold text-red-700">Live Alert</h2>
      <p className="text-sm text-gray-500 mb-2">{date}</p>
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2 text-gray-700">{description}</p>
      <p className="mt-2 text-red-600 font-semibold">Risk Score: {riskScore}%</p>
    </div>
  );
}

function StakeholderCard({
  name,
  type,
  influence,
  stance,
}: {
  name: string;
  type: string;
  influence: number;
  stance?: string;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded shadow">
      <h4 className="font-bold">{name}</h4>
      <p className="text-xs text-gray-500">{type}</p>
      <p className="text-purple-600 text-sm font-semibold">
        Influence: {influence}
      </p>
      {stance && <p className="italic text-gray-600">Stance: {stance}</p>}
    </div>
  );
}

export default function ResultsFlow({ query }: { query: string }) {
  // State: which country's pack is selected
  const [country, setCountry] = useState<"mexico" | "brazil" | "chile">("mexico");

  // Load datasets based on selected country
  const dataset =
    country === "mexico"
      ? {
          transcripts: (mexicoTranscripts as any).task1_youtube_transcripts,
          pdfs: (mexicoPdfs as any).task2_government_pdfs,
          entities: (mexicoEntities as any).entities,
          comparison: peruComparison,
        }
      : country === "brazil"
      ? {
          transcripts: (brazilTranscripts as any).task1_youtube_transcripts,
          pdfs: (brazilPdfs as any).task2_government_pdfs,
          entities: (brazilEntities as any).entities,
          comparison: brazilComparison,
        }
      : {
          transcripts: (chileTranscripts as any).task1_youtube_transcripts,
          pdfs: (chilePdfs as any).task2_government_pdfs,
          entities: (chileEntities as any).entities,
          comparison: chileComparison,
        };

  // Live alert (grab first transcript)
  const firstTranscript = dataset.transcripts[0];
  const alert = {
    title: firstTranscript?.title || "No Alert Found",
    date: firstTranscript?.date || "n/a",
    description:
      firstTranscript?.transcript_chunks[0]?.text || "No transcript text",
    riskScore: 80,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4">PRISM Horizon Intelligence</h1>
      <p className="text-gray-500 mb-6">Results for: "{query}"</p>

      {/* Country Selector */}
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setCountry("mexico")}
          className={`px-4 py-2 rounded ${
            country === "mexico"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          🇲🇽 Mexico
        </button>
        <button
          onClick={() => setCountry("brazil")}
          className={`px-4 py-2 rounded ${
            country === "brazil"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          🇧🇷 Brazil
        </button>
        <button
          onClick={() => setCountry("chile")}
          className={`px-4 py-2 rounded ${
            country === "chile"
              ? "bg-purple-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          🇨🇱 Chile
        </button>
      </div>

      {/* Alert */}
      <AlertCard
        title={alert.title}
        description={alert.description}
        date={alert.date}
        riskScore={alert.riskScore}
      />

      {/* Timeline */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Chronological Evolution
        </h2>
        <ul className="space-y-3">
          {dataset.pdfs.slice(0, 2).map((doc: any, idx: number) => (
            <li key={idx} className="border-b pb-2">
              <p className="font-bold">{doc.title}</p>
              <p className="text-sm text-gray-500">{doc.date}</p>
              <p className="text-gray-700">{doc.chunks[0]?.text}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Stakeholders */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Key Stakeholders
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {dataset.entities.map((e: any) => (
            <StakeholderCard
              key={e.name}
              name={e.name}
              type={e.type}
              influence={e.influence_score}
              stance={e.stance}
            />
          ))}
        </div>
      </div>

      {/* Comparison */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Regional Comparison
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border p-4 rounded">
            <h3 className="font-bold">
              {country === "mexico" ? "🇲🇽 Mexico" : country === "brazil" ? "🇧🇷 Brazil" : "🇨🇱 Chile"}
            </h3>
            <p>{dataset.pdfs[0].chunks[0].text}</p>
            <p className="mt-2 text-yellow-600 font-semibold">
              Status: Under Review
            </p>
          </div>
          <div className="border p-4 rounded">
            <h3 className="font-bold">Regional Analysis</h3>
            <p>{dataset.comparison.focus_analysis}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
