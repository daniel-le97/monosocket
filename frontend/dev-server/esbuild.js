import * as fsp from 'node:fs/promises'
import { createServer } from 'node:http'
import * as modules from 'node:module'
import * as esbuild from 'esbuild'
import vue from 'unplugin-vue/esbuild'
import tailwind from 'tailwindcss'
import auto from 'autoprefixer'
import postcssPlugin from './postcss.js'

const outdir = process.env.PREFIX ?? 'dist'

const args = process.argv.slice(2)

const builder = await esbuild.context({
  plugins: [vue(), postcssPlugin({ plugins: [tailwind, auto] })],
  bundle: true,
  entryPoints: [
    'src/index.ts',
    //  "./src/worker.js",
  ],
  outdir,
  loader: {
    '.svg': 'file',
    '.png': 'file',
  },
  define: {
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
  },
  external: ['socket:*', ...modules.builtinModules],
  assetNames: 'assets/[name]',
  chunkNames: 'static/[name]-[hash]',
  alias: {
    '@/assets': './src/assets',
  },
  format: 'esm',
  platform: 'browser',
  // minify: true,
  // sourcemap: true,
  treeShaking: true,
  splitting: true,
  allowOverwrite: true,
})
async function main() {
  try {
    const start = performance.now()
    // await fsp.rmdir("dist", { recursive: true }).catch(console.error);
    // import tail from '@tailwindcss/postcss'

    await builder.rebuild()
    await fsp.copyFile('src/index.html', `${outdir}/index.html`)
    // await fsp.copyFile(".env", outdir + "/.env");
    // await fsp.write(outdir + "/index.html", Bun.file("src/index.html"));
    const end = performance.now()
    console.log(
      `esbuild took ${(end - start).toFixed(2)}ms to build the project.`,
    )
  }
  catch (error) {
    console.log(error)
    process.exit(1)
  }
}

await main()

const server = createServer(async (req, res) => {
  await main()
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('okay')
  if (args.includes('prod')) {
    console.log('Exiting...')
    process.exit(0)
  }
}).listen(3000)
console.log('Listening on http://localhost:3000')
