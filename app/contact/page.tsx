"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now, just demo state — replace with API call / email integration
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-20">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-lg text-slate-600 mb-10 text-center">
          Whether you’re an investor, partner, or enterprise, we’d love to hear from you.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg text-center shadow">
            ✅ Thank you for your message! We’ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Name
              </label>
              <Input type="text" placeholder="Your full name" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <Input type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Message
              </label>
              <Textarea rows={5} placeholder="How can we help?" required />
            </div>
            <div className="text-center">
              <Button
                type="submit"
                className="bg-slate-900 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-slate-800"
              >
                Send Message
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
