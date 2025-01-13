/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo2: ['"Exo 2"', 'sans-serif'], // Add the font here
      },
    },
  },
    variants: [
      "responsive",
      "group-hover",
      "focus-within",
      "first",
      "last",
      "odd",
      "even",
      "hover",
      "focus",
      "active",
      "visited",
      "disabled",
    ],

  plugins: [],
}