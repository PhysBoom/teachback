/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        "accent-orange": "#ea580c",
        "accent-lime": "#d9f99d",
        "accent-coral": "#fda4af",
        "navy-dark": "#0f172a",
        "navy-deep": "#020617",

        "navy-lighter": "#1E293B",
        "neon-blue": "#60a5fa",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        serif: ["'Fraunces'", "serif"],
      },
      boxShadow: {
        "soft-blue": "0 4px 20px -2px rgba(59, 130, 246, 0.15)",
        hard: "2px 2px 0px 0px rgba(0, 0, 0, 1)",
        "hard-blue": "2px 2px 0px 0px #3b82f6",
        "hard-orange": "2px 2px 0px 0px #ea580c",

        neon: "0 0 15px rgba(59, 130, 246, 0.5)",
      },
    },
  },
  plugins: [],
};