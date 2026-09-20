import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import JavaScriptObfuscator from 'javascript-obfuscator'

// Obfuscates the renderer bundle at build time only (never in dev, where it
// would make debugging useless). Kept deliberately light (no
// controlFlowFlattening/deadCodeInjection) since those can blow up bundle
// size and runtime cost for very little extra reverse-engineering resistance
// on a bundle this size.
function obfuscatorPlugin() {
  return {
    name: 'obfuscator',
    apply: 'build',
    renderChunk(code) {
      const result = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        identifierNamesGenerator: 'hexadecimal',
        renameGlobals: false,
        stringArray: true,
        stringArrayThreshold: 0.75,
        rotateStringArray: true,
      })
      return { code: result.getObfuscatedCode(), map: null }
    },
  }
}

// base: './' so the built index.html loads correctly under Electron's file:// protocol
// outDir: 'build' (not Vite's default 'dist') to match public/electron.js's existing ../build/index.html reference
export default defineConfig({
  plugins: [react(), obfuscatorPlugin()],
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
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js'],
  },
})
