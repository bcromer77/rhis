"use client"

import * as React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts"

// Define payload + label typing
interface CustomPayload {
  value: number
  name: string
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  payload?: CustomPayload[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded shadow-md text-sm">
        {label && <p className="font-bold">{label}</p>}
        <p>
          Impact: <span className="text-green-400">{payload[0].value}%</span>
        </p>
      </div>
    )
  }
  return null
}

// Example headline → winners & losers dataset
const data = [
  { name: "MP Materials (US)", impact: 35 },     // clear winner
  { name: "Lynas Rare Earths (AU)", impact: 20 },
  { name: "Lockheed Martin", impact: 10 },
  { name: "China Northern RE", impact: -25 },    // loser
  { name: "Shenghe Resources", impact: -30 },    // loser
]

export function GeoHeadlineChart() {
  return (
    <div className="w-full h-[400px]">
      <h2 className="text-lg font-semibold mb-2">
        📈 Market Impact: China clamps down on rare earths
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="impact" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

