"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    document.cookie = `dashboard-password=${password}; path=/`; // ✅ store in cookie
    router.push("/horizon"); // redirect
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Login to RHIS PRISM</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
      </form>
    </div>
  );
}

