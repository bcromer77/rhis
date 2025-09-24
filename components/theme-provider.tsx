"use client";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Temporary: no theme switching for demo, just render children
  return <>{children}</>;
}

