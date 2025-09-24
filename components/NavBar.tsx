"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-white shadow">
      <Link href="/" className="font-bold text-slate-900 text-lg">
        RHIS
      </Link>

      <button
        aria-label="Menu"
        onClick={() => setOpen(!open)}
        className="md:hidden"
      >
        <Menu />
      </button>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/case-studies">Case Studies</Link>
        <Link href="/pricing">Pricing</Link>
        <Link
          href="/contact"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
}
