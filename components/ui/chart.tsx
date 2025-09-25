"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts"

// 👇 Define a proper type for the tooltip payload
interface CustomPayload {
  value: number
  name: string
}

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string> & { payload?: CustomPayload[] }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white p-2 rounded shadow">
        <p>{label}</p>
        <p>{payload[0].value}</p>
      </div>
    )
  }
  return null
}

const data = [
  { name: "Winner A", value: 400 },
  { name: "Loser B", value: 300 },
  { name: "Winner C", value: 200 },
]

export function ChartDemo() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  )
}

