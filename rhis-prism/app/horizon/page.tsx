"use client";

import React, { useState } from 'react';
import ResultsFlow from '@/components/ResultsFlow';
import { Search } from 'lucide-react';

export default function Page() {   // 👈 must be called Page
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowResults(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl font-bold mb-4">PRISM HORIZON</h1>
          <p className="text-xl text-purple-100 mb-8">
            Regulatory & Human Intelligence Surveillance Platform
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g., 'Mexico lithium mining law'"
                className="w-full px-6 py-4 text-lg text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              setQuery('Mexico lithium mining law');
              setShowResults(true);
            }}
            className="mt-6 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Try Demo Query
          </button>
        </div>
      </div>

      {showResults && <ResultsFlow query={query} />}
    </div>
  );
}
