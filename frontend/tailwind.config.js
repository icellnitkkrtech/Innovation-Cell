/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'innokshetra-background': "url('./public/INNOKSHETRA_BG.png')", // Update with your relative path
      })
    },
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

