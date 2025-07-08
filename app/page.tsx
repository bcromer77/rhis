'use client';

import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setResults([]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8080'}/api/transcripts/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: query }),
      });

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black p-6 sm:p-12 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">🎯 RHIS Semantic Search</h1>

        <div className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Search minerals, risks, speaker names..."
            className="flex-1 p-3 border border-gray-300 rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {loading && (
          <div className="text-center text-gray-500 mt-10 animate-pulse">
            Loading results...
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            {results.map((result, idx) => {
              const transcript = result.transcript;
              return (
                <div
                  key={idx}
                  className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="text-sm text-gray-600">
                    <strong>{transcript?.speaker}</strong> — {transcript?.country} |{" "}
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {transcript?.sentiment || 'neutral'}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-800">
                    {expandedIndex === idx
                      ? transcript?.text
                      : transcript?.text.slice(0, 180) + '...'}
                  </p>

                  <div className="text-xs mt-2 text-gray-500 flex justify-between items-center">
                    <span>🔎 Similarity: {result.similarity.toFixed(4)}</span>
                    <button
                      className="text-blue-600 underline"
                      onClick={() =>
                        setExpandedIndex(expandedIndex === idx ? null : idx)
                      }
                    >
                      {expandedIndex === idx ? 'Show Less' : 'Read More'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && results.length === 0 && (
          <p className="text-gray-400 text-center mt-12">No results yet. Try a search.</p>
        )}
      </div>
    </main>
  );
}

