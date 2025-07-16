"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "RHIS PRISM Access Gateway",
  description: "Secure entry to RippleXn's regulatory horizon scanning platform.",
}

export default function CoverPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "rhis2025") {
      router.push("/") // Redirect to main app
    } else {
      setError("Incorrect password. Try again.")
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-4 animate-flicker">RHIS PRISM</h1>
      <p className="mb-8 text-gray-400 animate-fade-in">
        Enter password to access the intelligence dashboard
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-lg border border-gray-700 bg-gray-800 text-white w-72"
        />
        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-2 px-4 rounded"
        >
          Enter
        </button>
        {error && <p className="text-red-400">{error}</p>}
      </form>
      <p className="mt-12 text-sm text-gray-500">Powered by <span className="text-blue-400 font-semibold">RippleXn</span></p>
    </div>
  )
}

