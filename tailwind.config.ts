import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "bg-main": "rgb(var(--bg-main) / <alpha-value>)",
        "bg-card": "rgb(var(--bg-card) / <alpha-value>)",
        "bg-input": "rgb(var(--bg-input) / <alpha-value>)",
        "bg-hover": "rgb(var(--bg-hover) / <alpha-value>)",
        "text-main": "rgb(var(--text-main) / <alpha-value>)",
        "text-muted": "rgb(var(--text-muted) / <alpha-value>)",
        border: "rgb(var(--border-color) / <alpha-value>)",
      },
      spacing: {
        layout: "var(--space-layout)",
        card: "var(--space-card)",
      },
      borderRadius: {
        main: "var(--radius-main)",
      }
    },
  },
  plugins: [],
};
export default config;