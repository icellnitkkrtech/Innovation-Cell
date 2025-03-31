// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import react from '@vitejs/plugin-react';

export default {
  plugins: [react({
    // This allows JSX in .js files
    include: '**/*.{jsx,js,tsx,ts}',
  })],
};
