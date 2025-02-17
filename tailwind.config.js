/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Playfair Display", "serif"], // For headings
        body: ["Roboto", "sans-serif"] // For body text
      },
      screens: {
        xs: "420px"
      },
      colors: {
        customBg: "#FAF9F6",
        customBgDark: {
          DEFAULT: "#2c2c2c",
          100: "#d5d5d5",
          200: "#ababab",
          300: "#808080",
          400: "#565656",
          500: "#2c2c2c",
          600: "#232323",
          700: "#1a1a1a",
          800: "#121212",
          900: "#090909"
        },
        whiteFont: {
          DEFAULT: "#F7F9FA",
          100: "#fdfefe",
          200: "#fcfdfd",
          300: "#fafbfc",
          400: "#f9fafb",
          500: "#f7f9fa",
          600: "#c6c7c8",
          700: "#949596",
          800: "#636464",
          900: "#313232"
        },
        color1: {
          DEFAULT: "#65558f",
          100: "#e0dde9",
          200: "#c1bbd2",
          300: "#a399bc",
          400: "#8477a5",
          500: "#65558f",
          600: "#514472",
          700: "#3d3356",
          800: "#282239",
          900: "#14111d"
        },
        color2: {
          DEFAULT: "#e8def8",
          100: "#faf8fe",
          200: "#f6f2fc",
          300: "#f1ebfb",
          400: "#ede5f9",
          500: "#e8def8",
          600: "#bab2c6",
          700: "#8b8595",
          800: "#5d5963",
          900: "#2e2c32"
        },
        color3: {
          DEFAULT: "#4f378a",
          100: "#dcd7e8",
          200: "#b9afd0",
          300: "#9587b9",
          400: "#725fa1",
          500: "#4f378a",
          600: "#3f2c6e",
          700: "#2f2153",
          800: "#201637",
          900: "#100b1c"
        },
        color4: {
          DEFAULT: "#e8e2f3",
          100: "#faf9fd",
          200: "#f6f3fa",
          300: "#f1eef8",
          400: "#ede8f5",
          500: "#e8e2f3",
          600: "#bab5c2",
          700: "#8b8892",
          800: "#5d5a61",
          900: "#2e2d31"
        },
        color5: {
          DEFAULT: "#322f57",
          100: "#d6d5dd",
          200: "#adacbc",
          300: "#84829a",
          400: "#5b5979",
          500: "#322f57",
          600: "#282646",
          700: "#1e1c34",
          800: "#141323",
          900: "#0a0911"
        }
      }
    }
  },
  plugins: []
};
