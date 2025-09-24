"use client";

export default function LegalVectorSearchBar() {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search regulatory risk, e.g. “ArcelorMittal CBAM Brazil”"
          className="w-full px-3 py-2 rounded-md bg-background text-foreground placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90"
          type="button"
        >
          Search
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        Tip: Try “Boeing litigation”, “Telangana mining opposition”, or “EU CBAM”.
      </p>
    </div>
  );
}
