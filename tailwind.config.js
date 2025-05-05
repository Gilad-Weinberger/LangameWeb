/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#fbfafa",
        main: "#3366CC",
        "main-hover": "#254A99",
        "text-primary": "#1F1F1F",
        "text-secondary": "#555555",
        "text-disabled": "#8A8A8A",
        border: "#CCCCCC",
      },
    },
  },
};
