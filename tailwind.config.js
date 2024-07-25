/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ea580b",
        dark: "#161622",
      },
      fontFamily: {
        plight: ["Recursive-Light", "sans-serif"],
        pregular: ["Recursive-Regular", "sans-serif"],
        pmedium: ["Recursive-Medium", "sans-serif"],
        psemibold: ["Recursive-SemiBold", "sans-serif"],
        pbold: ["Recursive-Bold", "sans-serif"],
        pextrabold: ["Recursive-ExtraBold", "sans-serif"],
        pblack: ["Recursive-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
