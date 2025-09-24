"use client";

import { motion } from "framer-motion";

interface Props {
  risks?: string[];
  opportunities?: string[];
  sentiment?: number; // -1 (bearish) to +1 (bullish)
  regulatoryRisks?: string[];
}

export default function SecondaryPanels({
  risks = [],
  opportunities = [],
  sentiment = 0,
  regulatoryRisks = []
}: Props) {
  // Convert sentiment into color + label
  const sentimentColor =
    sentiment > 0.2 ? "bg-green-500" : sentiment < -0.2 ? "bg-red-500" : "bg-yellow-500";
  const sentimentLabel =
    sentiment > 0.2 ? "Bullish" : sentiment < -0.2 ? "Bearish" : "Neutral";

  return (
    <div className="mt-10 space-y-8">
      {/* Sentiment Bar */}
      <motion.div
        className="w-full rounded-lg p-4 bg-gradient-to-r from-[#111827] to-[#1f2937] border border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300 font-medium">Market Sentiment</span>
          <span className="text-sm text-gray-400">{sentimentLabel}</span>
        </div>
        <div className="w-full h-3 mt-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-3 ${sentimentColor}`}
            style={{ width: `${Math.abs(sentiment) * 100}%` }}
          />
        </div>
      </motion.div>

      {/* Risk & Opportunity Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risks */}
        <motion.div
          className="bg-gradient-to-br from-[#1e1b1b] to-[#2d1f1f] border border-red-700/40 p-5 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold text-red-400">⚠️ Risks</h3>
          {risks.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-300 mt-3 space-y-2">
              {risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm mt-2">No major risks detected.</p>
          )}
        </motion.div>

        {/* Opportunities */}
        <motion.div
          className="bg-gradient-to-br from-[#11231f] to-[#1b3830] border border-green-700/40 p-5 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h3 className="text-lg font-semibold text-green-400">🚀 Opportunities</h3>
          {opportunities.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-300 mt-3 space-y-2">
              {opportunities.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm mt-2">No clear opportunities yet.</p>
          )}
        </motion.div>
      </div>

      {/* Regulatory Risks */}
      {regulatoryRisks.length > 0 && (
        <motion.div
          className="bg-gradient-to-r from-yellow-800/30 to-yellow-900/30 border border-yellow-600/40 p-5 rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-yellow-400">⚖️ Emerging Regulatory Risks</h3>
          <ul className="list-disc list-inside text-sm text-gray-300 mt-3 space-y-2">
            {regulatoryRisks.map((rr, i) => (
              <li key={i}>{rr}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

