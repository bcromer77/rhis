"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const IndigenousVectorSearchBar = dynamic(
  () => import("@/components/mock/IndigenousVectorSearchBar"),
  { ssr: false }
);

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

