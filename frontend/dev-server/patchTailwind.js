import * as fsp from 'node:fs/promises'

const tailwind = await fsp.readFile(
  './node_modules/@tailwindcss/postcss/package.json',
  'utf8',
)
const toJson = JSON.parse(tailwind)
const exports = toJson.exports['.']
if (!exports.import) {
  exports.import = './dist/index.js'
  toJson.exports['.'] = exports
}
await fsp.writeFile(
  './node_modules/@tailwindcss/postcss/package.json',
  JSON.stringify(toJson, null, 2),
  'utf8',
)
