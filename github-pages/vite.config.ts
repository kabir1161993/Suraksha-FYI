import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Relative paths work for both username and project GitHub Pages sites.
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
