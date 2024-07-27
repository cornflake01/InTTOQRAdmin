/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-custom': 'inset 2px 4px 6px 0 rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
  fontFamily: {
    sans: ['Poppins', 'sans-serif'],
  },
  
}

