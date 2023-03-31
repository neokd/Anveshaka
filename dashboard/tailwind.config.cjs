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
        '84':'21.5rem',
        '128': '29rem',
        '180':'60rem',
      },
      margin:{
        '18':'4.25rem',
        '34':'8.5rem',
        '56':'13.5rem'
      },
      fontSize: {
        12:'12rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}