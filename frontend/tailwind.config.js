/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cinevault: {
          bg: "#0B0F17",       // Our main cinema dark background
          card: "#111622",     // Slightly lighter dark navy for modals and cards
          accent: "#F59E0B",   // The golden amber color for selected seats & buttons
        }
      }
    },
  },
  plugins: [],
}