import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Map @ to src directory
    },
  },
  server : {
    port : 3400
  }
})
