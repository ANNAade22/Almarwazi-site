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
        primary: "#2e4832",
        secondary: "#93a694",
      },
    },
  },
  plugins: [heroui()],
};
