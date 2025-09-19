"use client"
import { useState } from "react"

export default function IndigenousVectorSearchBar() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data)
    } catch (err) {
      console.error("Search error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="border rounded p-2 flex-1"
          placeholder="Search transcripts + tweets (e.g. litio Sonora)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Left Column: Transcripts */}
          <div>
            <h2 className="font-bold text-lg mb-3">📄 Official Transcripts</h2>
            {results.transcripts && results.transcripts.length > 0 ? (
              results.transcripts.map((t: any, i: number) => (
                <div key={i} className="p-4 border rounded bg-gray-50 mb-3">
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="text-sm text-gray-600">
                    Video:{" "}
                    <a
                      className="text-blue-500 underline"
                      href={`https://youtube.com/watch?v=${t.video_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t.video_id}
                    </a>
                  </p>
                  {t.key_issues && (
                    <p className="mt-2 text-gray-800">
                      {t.key_issues.slice(0, 280)}...
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No transcripts found.</p>
            )}
          </div>

          {/* Right Column: Tweets */}
          <div>
            <h2 className="font-bold text-lg mb-3">🐦 Tweets (X Forensics)</h2>
            {results.tweets && results.tweets.length > 0 ? (
              results.tweets.map((tweet: any, i: number) => (
                <div key={i} className="p-4 border rounded bg-gray-50 mb-3">
                  <p className="text-sm text-gray-500">
                    {new Date(tweet.created_at).toLocaleString()}
                  </p>
                  <p className="mt-1">{tweet.text}</p>
                  <a
                    className="text-blue-500 underline text-sm"
                    href={`https://x.com/i/web/status/${tweet.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on X →
                  </a>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tweets found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
