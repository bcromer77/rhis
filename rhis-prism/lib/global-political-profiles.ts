export interface PoliticalProfile {
  id: string
  politician_name: string
  country: string
  state?: string
  issue: string
  impact: string
  category: string
  action_required: string[]
  source: string
  date: string
  visual_card: {
    title: string
    image_label: string
    snapshot: string
    horizon_impact: string
    key_risks: string[]
    opportunities: string[]
  }
}

export const rhisPoliticianEntries: PoliticalProfile[] = [
  {
    id: "sheinbaum-mexico-2025",
    politician_name: "Claudia Sheinbaum",
    country: "Mexico",
    state: "National",
    issue: "Lithium nationalization and PEMEX green bond strategy",
    impact: "PEMEX's debt and lithium restrictions reshape Mexico's energy and ESG investment landscape",
    category: "Energy, Industrial Policy, ESG",
    action_required: [
      "Evaluate ArcelorMittal exposure to carbon taxes under USMCA review",
      "Track PEMEX green bond offerings and fiscal restructuring",
      "Assess tech partnership opportunities with Litio MX for EV supply chain",
    ],
    source: "Presidential Press Briefing, July 11, 2025",
    date: "2025-07-11",
    visual_card: {
      title: "CLAUDIA SHEINBAUM (Mexico)",
      image_label: "Sheinbaum with lithium",
      snapshot: "Scientist-President links lithium nationalization & PEMEX reform for green sovereignty.",
      horizon_impact: "State-led lithium & PEMEX reshape markets, balancing ESG with private partnerships.",
      key_risks: [
        "Lithium delays due to clay-based extraction raise costs",
        "PEMEX's $100B debt, $6.8B 2025 maturities create fiscal pressure",
        "USMCA carbon taxes, ESG activism hit steel firms like ArcelorMittal",
      ],
      opportunities: [
        "Tech partnerships with Tesla, BYD for lithium extraction",
        "PEMEX green bonds, ESG-aligned contracts (e.g., Grupo Carso)",
        "Renewable pivot attracting nearshoring investments",
      ],
    },
  },
  {
    id: "modi-india-2025",
    politician_name: "Narendra Modi",
    country: "India",
    state: "National",
    issue: "Green hydrogen mission and steel sector decarbonization",
    impact: "National Green Hydrogen Mission creates opportunities and compliance challenges for steel manufacturers",
    category: "Energy, Climate Policy, Industrial",
    action_required: [
      "Monitor PLI scheme benefits for green steel production",
      "Assess carbon border adjustment mechanism impacts",
      "Evaluate renewable energy procurement mandates",
    ],
    source: "Ministry of New and Renewable Energy Policy Brief",
    date: "2025-01-10",
    visual_card: {
      title: "NARENDRA MODI (India)",
      image_label: "Modi at renewable energy summit",
      snapshot: "PM accelerates green hydrogen mission targeting steel sector transformation by 2030.",
      horizon_impact: "Green hydrogen mandates reshape steel production costs and export competitiveness.",
      key_risks: [
        "High green hydrogen costs impact steel production margins",
        "Renewable energy procurement mandates increase operational complexity",
        "Carbon border taxes affect export competitiveness",
      ],
      opportunities: [
        "PLI scheme incentives for green steel technology adoption",
        "First-mover advantage in green steel exports",
        "Technology partnerships with global clean energy leaders",
      ],
    },
  },
  {
    id: "lula-brazil-2025",
    politician_name: "Luiz Inácio Lula da Silva",
    country: "Brazil",
    state: "National",
    issue: "Amazon deforestation controls and mining regulations",
    impact: "Strengthened environmental enforcement affects mining operations and supply chain compliance",
    category: "Environmental, Mining, ESG",
    action_required: [
      "Review mining license compliance in Amazon regions",
      "Assess supply chain traceability requirements",
      "Monitor indigenous land rights developments",
    ],
    source: "Ministry of Environment Policy Update",
    date: "2025-01-09",
    visual_card: {
      title: "LUIZ INÁCIO LULA DA SILVA (Brazil)",
      image_label: "Lula in Amazon region",
      snapshot: "President strengthens Amazon protection, tightening mining regulations and ESG compliance.",
      horizon_impact: "Enhanced environmental enforcement reshapes mining operations and global supply chains.",
      key_risks: [
        "Mining license delays in environmentally sensitive areas",
        "Increased compliance costs for supply chain traceability",
        "Indigenous land rights conflicts affecting operations",
      ],
      opportunities: [
        "Leadership in sustainable mining practices",
        "Premium pricing for certified sustainable materials",
        "International climate finance access",
      ],
    },
  },
]

// Search function for Mexico sector-specific data
export function searchMexicoSectorData(sector: string): PoliticalProfile[] {
  const validSectors = ["Energy", "Industry", "ESG", "Healthcare", "Technology"]

  if (!validSectors.some((s) => sector.toLowerCase().includes(s.toLowerCase()))) {
    return []
  }

  // Return Mexico-specific entries that match the sector
  return rhisPoliticianEntries.filter(
    (entry) => entry.country === "Mexico" && entry.category.toLowerCase().includes(sector.toLowerCase()),
  )
}

// General search function
export function searchPoliticalProfiles(query: string, country?: string): PoliticalProfile[] {
  const searchTerm = query.toLowerCase()

  return rhisPoliticianEntries.filter((entry) => {
    const matchesCountry = !country || entry.country.toLowerCase() === country.toLowerCase()
    const matchesQuery =
      entry.politician_name.toLowerCase().includes(searchTerm) ||
      entry.issue.toLowerCase().includes(searchTerm) ||
      entry.impact.toLowerCase().includes(searchTerm) ||
      entry.category.toLowerCase().includes(searchTerm)

    return matchesCountry && matchesQuery
  })
}

// Get profile by ID
export function getPoliticalProfileById(id: string): PoliticalProfile | undefined {
  return rhisPoliticianEntries.find((entry) => entry.id === id)
}

// Get all profiles for a specific country
export function getPoliticalProfilesByCountry(country: string): PoliticalProfile[] {
  return rhisPoliticianEntries.filter((entry) => entry.country.toLowerCase() === country.toLowerCase())
}
