/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'min-w-400': '400px',
      },
    },
    fontFamily:{
      'balgin': ['Balgin', 'sans-serif'],
    }
  },
  plugins: [],
}

