import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'




// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        '/api': 'http://localhost:3000' {
        target: 'https://api.deezer.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/deezer/, '')
      }
    }
  }
});