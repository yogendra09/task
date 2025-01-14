import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://task-o08e.onrender.com',
        changeOrigin: true,
        secure: false, // Use this if the backend server uses self-signed SSL certificates
      }, // <-- Ensure this bracket is present
    },
  },
})
