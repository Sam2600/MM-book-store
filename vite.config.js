import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-ui': ['@material-tailwind/react', 'framer-motion'],
          'vendor-splide': ['@splidejs/react-splide'],
          'vendor-i18n': ['i18next', 'react-i18next'],
        },
      },
    },
  },
})
