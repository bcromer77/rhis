"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp } from "lucide-react";

type CaseStudy = {
  id: string;
  company: string;
  ticker?: string;
  signal: string;
  why_it_matters: string;
  who_loses: string;
  who_wins: string;
  source: string;
  esg_pillar: "E" | "S" | "G";
  severity: "CRITICAL" | "WARNING" | "OPPORTUNITY";
};

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    company: "ArcelorMittal",
    ticker: "MT",
    signal: "Municipal review of water drawdowns in South Africa",
    why_it_matters:
      "Community opposition to industrial water use raises operating costs and ESG scrutiny.",
    who_loses: "Steel operations facing higher compliance capex",
    who_wins: "Compliant local steel peers with secured allocations",
    source: "Municipal council records",
    esg_pillar: "E",
    severity: "CRITICAL",
  },
  {
    id: "2",
    company: "Meta",
    ticker: "META",
    signal: "Tribal council challenges water permits for New Mexico data center",
    why_it_matters:
      "Community governance pushes back on water‑intensive data centers.",
    who_loses: "Meta cloud/data roadmap",
    who_wins: "Regional providers with prior ESG approvals",
    source: "Ute Mountain tribal proceedings",
    esg_pillar: "S",
    severity: "WARNING",
  },
  {
    id: "3",
    company: "Glencore",
    ticker: "GLEN",
    signal: "EU ESG compliance requires Scope 3 resubmission",
    why_it_matters:
      "Raises compliance costs and highlights exposure to carbon‑intensive assets.",
    who_loses: "Carbon‑heavy commodity trading desks",
    who_wins: "Diversified miners aligned with ESG thresholds",
    source: "EU ESG disclosure platform",
    esg_pillar: "G",
    severity: "CRITICAL",
  },
  {
    id: "4",
    company: "Nexstar Media",
    ticker: "NXST",
    signal: "FCC expands transparency rules for political advertising",
    why_it_matters:
      "Smaller stations face compliance costs; Nexstar scales governance reporting.",
    who_loses: "Regional independents",
    who_wins: "Nexstar (strong governance capacity)",
    source: "FCC filings",
    esg_pillar: "G",
    severity: "OPPORTUNITY",
  },
  {
    id: "5",
    company: "Rio Tinto",
    ticker: "RIO",
    signal: "Indigenous displacement flagged in CSR report",
    why_it_matters:
      "Social license at risk; community litigation creates project delays.",
    who_loses: "Rio Tinto projects in contested land",
    who_wins: "Competitors with community accords",
    source: "Company CSR report, NGO filings",
    esg_pillar: "S",
    severity: "CRITICAL",
  },
  {
    id: "6",
    company: "EDF Energy",
    ticker: "EDF",
    signal: "Community complaints over nuclear cooling water discharges",
    why_it_matters:
      "Environmental opposition delays renewable credibility narrative, raising capex.",
    who_loses: "EDF nuclear expansion timelines",
    who_wins: "Rivals marketing low‑impact renewables",
    source: "Local council minutes",
    esg_pillar: "E",
    severity: "WARNING",
  },
  {
    id: "7",
    company: "Adani Ports",
    ticker: "ADANIPORTS",
    signal: "NGO files against coastal displacement in new port project",
    why_it_matters:
      "Heightened social scrutiny damages investor confidence in governance.",
    who_loses: "Adani coastal projects",
    who_wins: "Competitors positioned with ESG‑compliant permits",
    source: "NGO litigation filings",
    esg_pillar: "S",
    severity: "CRITICAL",
  },
  {
    id: "8",
    company: "ExxonMobil",
    ticker: "XOM",
    signal: "Shareholder vote forces tighter climate disclosures",
    why_it_matters:
      "Governance reform pressures raise compliance workload; potential strategic pivots.",
    who_loses: "Carbon‑heavy exploration projects",
    who_wins: "Renewables divisions & compliant oil majors",
    source: "Annual proxy filings",
    esg_pillar: "G",
    severity: "WARNING",
  },
  {
    id: "9",
    company: "Tesla",
    ticker: "TSLA",
    signal: "Labor council disputes in German Gigafactory",
    why_it_matters:
      "Worker rights + unions elevate ESG scrutiny; risk to European workforce expansion.",
    who_loses: "Tesla Germany hiring expansion",
    who_wins: "Union‑aligned competitors in EU auto",
    source: "German labor council records",
    esg_pillar: "S",
    severity: "CRITICAL",
  },
  {
    id: "10",
    company: "Enel",
    ticker: "ENEL",
    signal: "CSR disclosure: coal plant community transition funding approved",
    why_it_matters:
      "Governance‑led transition plan lowers ESG headline risk, improves investor appeal.",
    who_loses: "Coal‑heavy energy peers",
    who_wins: "Enel (positive ESG arbitrage)",
    source: "ESG/CSR report disclosures",
    esg_pillar: "E",
    severity: "OPPORTUNITY",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="py-20 text-center">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
          Case Studies: ESG Signals in Action
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          ESG isn’t after‑the‑fact reporting — it’s where operational, community,
          and governance risks emerge early. These{" "}
          <span className="font-semibold">illustrative Crisis Cards</span> show
          how environmental, social, and governance disclosures surface hidden
          vulnerabilities — turning “boring” reports into foresight.
        </p>
      </section>

      {/* ESG Crisis Cards */}
      <section className="py-16 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
          ESG Lens: Who Loses, Who Wins
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {caseStudies.map((c) => (
            <Card
              key={c.id}
              className={`shadow-lg rounded-xl border-l-4 transition-transform hover:-translate-y-1 ${
                c.severity === "CRITICAL"
                  ? "border-red-500 bg-gradient-to-r from-red-50 to-white"
                  : c.severity === "WARNING"
                  ? "border-yellow-500 bg-gradient-to-r from-yellow-50 to-white"
                  : "border-green-500 bg-gradient-to-r from-green-50 to-white"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-slate-900 font-bold">
                    {c.company} {c.ticker && `(${c.ticker})`}
                  </span>
                  <Badge
                    className={
                      c.severity === "CRITICAL"
                        ? "bg-red-100 text-red-700"
                        : c.severity === "WARNING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  >
                    {c.severity === "CRITICAL"
                      ? "🔴 Critical"
                      : c.severity === "WARNING"
                      ? "🟠 Warning"
                      : "🟢 Opportunity"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="font-semibold text-slate-800">{c.signal}</p>
                <p className="text-slate-600">{c.why_it_matters}</p>

                <div className="flex items-start gap-2">
                  <TrendingDown className="h-4 w-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-red-600 uppercase">
                      Losers
                    </p>
                    <p className="text-sm text-red-700">{c.who_loses}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-green-600 uppercase">
                      Winners
                    </p>
                    <p className="text-sm text-green-700">{c.who_wins}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic">Source: {c.source}</p>
                <p className="text-xs uppercase font-semibold text-slate-500">
                  ESG Pillar: {c.esg_pillar}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 bg-slate-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          From “Boring” Reports → Actionable Signals
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-slate-300">
          Water usage, power permits, displacement, labor councils, board votes
          — the details most investors skip are where future risks and
          opportunities first appear. RHIS turns these raw disclosures into
          foresight. Fast, structured, ready for your workflow.
        </p>
        <Link href="/pricing">
          <Button
            size="lg"
            className="bg-white text-slate-900 font-semibold hover:bg-slate-200"
          >
            Explore Pricing
          </Button>
        </Link>
      </section>
    </div>
  );
}
