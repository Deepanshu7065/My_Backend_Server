import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default {
  server: {
      watch: {
          ignored: ['**/node_modules/**', '**/assets/**']
      }
  }
}