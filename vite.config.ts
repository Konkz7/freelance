import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Served from https://konkz7.github.io/freelance/, so assets need the repo
  // name as a prefix. If you move to a custom domain or rename the repo,
  // change this — and see `src/lib/asset.ts`, which depends on it.
  base: '/freelance/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
