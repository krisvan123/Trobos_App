import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        trobos: {
          navy: "#0A0F1D",
          dark: "#111827",
          card: "#182234",
          surface: "#F8FAFC",
          orange: "#FF5500",
          orangeHover: "#E64C00",
          orangeGlow: "rgba(255, 85, 0, 0.25)",
          red: "#EF4444",
          green: "#10B981",
          blue: "#2563EB",
          muted: "#64748B",
          border: "#E2E8F0",
          darkBorder: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      boxShadow: {
        emergency: "0 10px 30px -5px rgba(255, 85, 0, 0.35)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)",
        elevated: "0 20px 40px -15px rgba(0, 0, 0, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
