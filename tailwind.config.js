/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7EFE6",
          100: "#EFDECE",
          200: "#E7CEB5",
          300: "#DFBD9D",
          400: "#D7AD84",
          500: "#C18E60", // Original Primary
          600: "#A97B4D",
          700: "#8F6839",
          800: "#755526",
          900: "#5C4213",
        },
        secondary: {
          50: "#E6E6E6",
          100: "#CCCCCC",
          200: "#999999",
          300: "#666666",
          400: "#333333",
          500: "#1E1E1E", // Original Secondary
          600: "#191919",
          700: "#141414",
          800: "#0F0F0F",
          900: "#0A0A0A",
        },

        accent: {
          900: "#D9C6A6", // Darker (80%)
          700: "#BDA781", // Dark (60%)
          500: "#F5E6CC", // Original (Base)
          300: "#FAF1DB", // Lighter (40%)
          100: "#FEFBF1", // Lightest (20%)
        },
        background: "#181818", // Clean White
        foregroundText: "#E0E0E0", // Dark Gray for readability
        placeholder: "#9E9E9E", // Medium Gray for placeholders
        divider: "#424242", // Light Gray for dividers
      },
    },
  },
  darkMode: "class",
};
