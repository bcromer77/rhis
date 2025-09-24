module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core background colors
        background: "#0a0a0a",        // Deep black for main bg
        foreground: "#fafafa",        // Clean white for text
        
        // Card and surface colors
        card: "#111111",              // Slightly lighter than background
        "card-foreground": "#f5f5f5", // Card text
        
        // Border and muted colors
        border: "#262626",            // Subtle borders
        input: "#171717",             // Input backgrounds
        ring: "#525252",              // Focus rings
        
        // Muted text and secondary elements
        muted: "#171717",             // Muted backgrounds
        "muted-foreground": "#a3a3a3", // Muted text
        
        // Accent colors for Crisis Cards
        destructive: "#dc2626",       // Critical/Red alerts
        "destructive-foreground": "#fef2f2",
        
        // Status colors for severity levels
        critical: "#dc2626",          // Red - Critical
        warning: "#f59e0b",           // Amber - Warning  
        opportunity: "#10b981",       // Green - Opportunity
        
        // Primary brand colors
        primary: "#2563eb",           // Blue for primary actions
        "primary-foreground": "#f8fafc",
        
        secondary: "#374151",         // Gray for secondary
        "secondary-foreground": "#f9fafb",
        
        // Accent for highlights
        accent: "#1f2937",
        "accent-foreground": "#f3f4f6",
        
        // ESG/Risk specific colors
        esg: "#059669",               // Green for ESG positive
        risk: "#dc2626",              // Red for risk alerts
        geopolitical: "#7c3aed",      // Purple for geopolitical
        regulatory: "#2563eb",        // Blue for regulatory
        commodity: "#f59e0b",         // Amber for commodities
      },
      
      // Typography for professional dashboard
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      
      // Spacing for cards and layouts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Border radius for modern cards
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      
      // Box shadows for depth
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      
      // Animation for smooth interactions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
