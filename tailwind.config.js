/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#E7EEF7",
        primary: "#5B7CFD",
      },
    },
  },
  plugins: [require("daisyui")],
};
