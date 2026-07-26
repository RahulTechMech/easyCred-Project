import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Every token below is backed by a CSS variable defined in globals.css,
        // with separate values for dark (default) and light (".light" class).
        // Existing components that reference e.g. `bg-ink-900` or `text-frost-50`
        // automatically re-skin when the theme toggle flips the root class —
        // no per-component changes required.
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
        },
        frost: {
          50: "rgb(var(--frost-50) / <alpha-value>)",
          200: "rgb(var(--frost-200) / <alpha-value>)",
          400: "rgb(var(--frost-400) / <alpha-value>)",
        },
        signal: {
          500: "rgb(var(--signal-500) / <alpha-value>)",
          400: "rgb(var(--signal-400) / <alpha-value>)",
          300: "rgb(var(--signal-300) / <alpha-value>)",
        },
        mint: {
          500: "rgb(var(--mint-500) / <alpha-value>)",
        },
        amber: {
          500: "rgb(var(--amber-500) / <alpha-value>)",
        },
        hairline: "rgb(var(--hairline) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jbmono)", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(91,139,255,0.15), 0 8px 40px -8px rgba(59,108,246,0.35)",
        card: "0 4px 24px -4px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grad-signal": "linear-gradient(135deg, #3b6cf6 0%, #5b8bff 50%, #8fb0ff 100%)",
        "grad-radial-glow":
          "radial-gradient(60% 60% at 50% 0%, rgba(59,108,246,0.25) 0%, rgba(10,14,26,0) 70%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
