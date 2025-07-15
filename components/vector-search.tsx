"use client";

import React, { useState, useEffect } from "react";
import IndigenousVectorSearchBar from "@/components/mock/IndigenousVectorSearchBar"; // or wherever you saved it

export const VectorSearch = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <IndigenousVectorSearchBar
      issuesData={[]} // can update with MongoDB props later
      selectedRegion=""
      selectedTab="All"
    />
  );
};

