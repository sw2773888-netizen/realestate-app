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
          DEFAULT: "#006aff",
          dark: "#0053cc",
          light: "#e7f0ff",
        },
        ink: "#2a2a33",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        cardHover: "0 8px 24px rgba(0,0,0,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
