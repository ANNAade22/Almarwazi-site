const { heroui } = require("@heroui/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-amiri)", "serif"],
        mono: ["var(--font-geist-mono)"],
        amiri: ["var(--font-amiri)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#2e4832",
          light: "#3d6b45",
          dark: "#22341f",
        },
        secondary: "#93a694",
        accent: {
          DEFAULT: "#b08a2e",
          light: "#c9a227",
        },
        sand: "#f6f1e7",
      },
    },
  },
  plugins: [heroui()],
};
