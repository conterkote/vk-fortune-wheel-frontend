/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily : {
      "text-gotham" : '"Gotham Pro"'
    },
    extend: {
      colors : {
        "golden" : "#FAC269"
      }
    },
  },
  plugins: [],
}

