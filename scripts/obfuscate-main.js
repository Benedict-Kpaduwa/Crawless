// Vite only builds the renderer bundle into build/ (it does flatten
// public/electron.js, public/preload.js, and public/workflowPreload.js into
// build/*.js as static passthrough, but it never touches the top-level
// electron/ directory those files require from via "../electron/...").
//
// This script, run between `vite build` and `electron-builder`, makes
// build/ fully self-contained and obfuscated:
//   1. copies electron/ into build/electron/
//   2. rewrites the "../electron/..." requires in the flattened build/*.js
//      files to "./electron/..." (since electron/ is now a sibling, not a
//      parent, of those files inside build/)
//   3. obfuscates every .js file under build/
//
// Source files at the repo root are never modified — only the build/ copy.
const fs = require('fs')
const path = require('path')
const JavaScriptObfuscator = require('javascript-obfuscator')

const root = path.join(__dirname, '..')
const buildDir = path.join(root, 'build')

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '__tests__') continue
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

function obfuscate(code) {
  return JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    identifierNamesGenerator: 'hexadecimal',
    stringArray: true,
    stringArrayThreshold: 0.75,
    rotateStringArray: true,
  }).getObfuscatedCode()
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(full) : [full]
  })
}

if (!fs.existsSync(buildDir)) {
  throw new Error('build/ not found — run `vite build` before this script')
}

copyDir(path.join(root, 'electron'), path.join(buildDir, 'electron'))

const flattenedEntryPoints = ['electron.js', 'preload.js', 'workflowPreload.js']
for (const name of flattenedEntryPoints) {
  const file = path.join(buildDir, name)
  if (!fs.existsSync(file)) continue
  const rewritten = fs
    .readFileSync(file, 'utf-8')
    .replace(/require\((['"])\.\.\/electron\//g, 'require($1./electron/')
  fs.writeFileSync(file, rewritten)
}

for (const file of walk(buildDir)) {
  if (!file.endsWith('.js') || file.includes(`${path.sep}assets${path.sep}`)) continue
  const code = fs.readFileSync(file, 'utf-8')
  fs.writeFileSync(file, obfuscate(code))
  console.log(`obfuscated ${path.relative(root, file)}`)
}
