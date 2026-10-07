/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fc",
          400: "#36abf7",
          500: "#0c8ee9",
          600: "#0070c7",
          700: "#0159a1",
          800: "#064c84",
          900: "#0a3f6e",
          950: "#072849",
        },
      },
    },
  },
  plugins: [],
};
