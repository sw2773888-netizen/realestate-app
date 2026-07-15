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
          light: "#ffe6ec",
        },
        cyan: {
          DEFAULT: "#25f4ee", // TikTok cyan
        },
        grape: {
          DEFAULT: "#7c3aed", // AI purple
          dark: "#6d28d9",
          light: "#f3ebff",
        },
        ink: "#161623",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(22,22,35,0.08)",
        cardHover: "0 16px 40px rgba(124,58,237,0.20)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #fe2c55 0%, #7c3aed 55%, #25f4ee 130%)",
      },
    },
  },
  plugins: [],
};

export default config;
