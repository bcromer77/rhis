"use client";

export default function SubscribePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-600 to-blue-700 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Subscribe to RhisSignals</h1>
      <p className="mb-6 text-lg text-center">
        Get full alpha drops, contrarian trade setups, and institutional foresight — before the headlines.
      </p>

      <form className="w-full max-w-md space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition"
        >
          Subscribe Now
        </button>
      </form>
    </main>
  );
}
