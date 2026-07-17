import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#fe2c55", // TikTok pink/red
          dark: "#d81f45",
        },
        cyan: {
          neon: "#25f4ee", // TikTok cyan
        },
        ink: {
          900: "#0b1020",
          800: "#111834",
          700: "#1a2242",
          600: "#2a335c",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(254,44,85,0.25)",
        card: "0 8px 30px rgba(0,0,0,0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
