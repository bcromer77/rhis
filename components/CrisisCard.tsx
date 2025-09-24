"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type CrisisCardType = {
  id: string;
  company: string;
  ticker?: string;
  signal: string;
  category: string;
  severity: "CRITICAL" | "WARNING" | "OPPORTUNITY";
  why: string;
  losers: string[];
  winners: string[];
  source: string;
};

export function CrisisCard({ card }: { card: CrisisCardType }) {
  const color =
    card.severity === "CRITICAL"
      ? "bg-red-100 text-red-700 border-red-500"
      : card.severity === "WARNING"
      ? "bg-yellow-100 text-yellow-700 border-yellow-500"
      : "bg-green-100 text-green-700 border-green-500";

  return (
    <Card className="rounded-xl shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 border-l-4 border-slate-200">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="text-lg font-bold text-slate-900">
            {card.company} {card.ticker && `(${card.ticker})`}
          </span>
          <Badge className={color}>{card.severity}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="font-semibold mb-2">{card.signal}</p>
        <p className="text-slate-600 mb-3">{card.why}</p>

        <div className="mb-3">
          <p className="text-xs text-slate-500 uppercase font-semibold">
            Losers
          </p>
          <p className="text-sm text-red-700">
            ❌ {card.losers.join(", ")}
          </p>
        </div>

        <div className="mb-3">
          <p className="text-xs text-slate-500 uppercase font-semibold">
            Winners
          </p>
          <p className="text-sm text-green-700">
            ✅ {card.winners.join(", ")}
          </p>
        </div>

        <p className="text-xs text-slate-400 italic">
          Source: {card.source}
        </p>
      </CardContent>
    </Card>
  );
}
