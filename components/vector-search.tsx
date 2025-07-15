"use client";

import React, { useState, useEffect } from "react";
import IndigenousVectorSearchBar from "@/components/mock/IndigenousVectorSearchBar";

// Exported wrapper component for use in `/dashboard`
export const VectorSearch = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <IndigenousVectorSearchBar
      issuesData={[]} // Replace with real data or prop in future
      selectedRegion=""
      selectedTab="All"
    />
  );
};
