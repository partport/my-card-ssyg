/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      width: {
        13: "13rem",
        17.5: "17.5rem",
        26.5: "26.5rem",
        128: "32rem",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
