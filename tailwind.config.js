/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', "serif"], // For headings
        body: ['"Roboto"', "sans-serif"] // For body text
      }
    }
  },
  plugins: []
};
