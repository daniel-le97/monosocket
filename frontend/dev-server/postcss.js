import path from 'node:path'
import * as fsp from 'node:fs/promises'
import postcss from 'postcss'

/**
 * Create a PostCSS plugin for use with esbuild.
 * @param {object} options - Options for configuring the PostCSS plugin.
 * @param {string} [options.rootDir] - The root directory for resolving paths.
 * @param {Array<import('postcss').AcceptedPlugin>} [options.plugins] - Array of PostCSS plugins to use.
 * @returns {import('esbuild').Plugin} The esbuild plugin object.
 */
export default function postcssPlugin(options) {
  return {
    name: 'postcss',
    setup(build) {
      build.onStart(() => {
        if (!build.initialOptions.external.includes('socket')) {
          build.initialOptions.external.push('socket:*')
        }
      })
      build.onLoad({ filter: /^backend\.js$/ }, async (args) => {
        console.log('backend.js')
        return { contents: '', loader: 'css' }
      })
      build.onLoad({ filter: /\.css$/ }, async (args) => {
        options.rootDir ??= process.cwd()
        options.plugins ??= []
        const { rootDir, plugins } = options
        const contents = await fsp.readFile(args.path, 'utf-8')
        const paths = {
          from: args.path,
          to: path.join(rootDir, path.basename(args.path)),
        }
        const result = await postcss(plugins).process(contents, paths)
        return { contents: result.css, loader: 'css' }
      })
    },
  }
}
