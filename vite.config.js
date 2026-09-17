import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' so the built index.html loads correctly under Electron's file:// protocol
// outDir: 'build' (not Vite's default 'dist') to match public/electron.js's existing ../build/index.html reference
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    // @crawless/ui's published package.json points "main" at "dist/index.js",
    // but the package ships index.js flattened at its root with no dist/ folder.
    // Webpack tolerated that; Vite/esbuild's resolver doesn't, so point at it directly.
    // (Vite's alias matching uses RegExp for exact matches, not webpack's "$" suffix convention.)
    alias: [
      { find: /^@crawless\/ui$/, replacement: '@crawless/ui/index.js' },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
})
