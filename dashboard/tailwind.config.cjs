/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        '128': '29rem',
        '180':'60rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}