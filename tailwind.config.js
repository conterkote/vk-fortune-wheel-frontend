/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily : {
      "text-gotham" : '"Gotham Pro"'
    },
    extend: {
      keyframes : {
        "clickSpin" : {
          "0%" : { "top" : "-0.375rem"},
          "100%" : {"top" : "0rem"},
        }
      },
      colors : {
        "golden" : "#FAC269"
      }
    },
  },
  plugins: [],
}

