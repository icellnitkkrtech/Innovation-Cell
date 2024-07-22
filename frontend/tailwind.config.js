/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {},
    fontFamily:{
      'balgin': ['Balgin', 'sans-serif'],
    }

  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.mix-blend-screen': {
          'mix-blend-mode': 'screen',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

