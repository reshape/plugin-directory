const htmlStandards = require('spike-html-standards')
const cssStandards = require('spike-css-standards')
const es2015 = require('babel-preset-es2015')
const Records = require('spike-records')

const name = 'reshape'

const locals = {
  title: `${name[0].toUpperCase() + name.slice(1)} Plugin Directory`,
  githubUrl: `https://github.com/${name}/${name}`,
  gitterUrl: `https://gitter.im/${name}/${name}`,
  documentationUrl: `https://github.com/${name}/${name}#writing-a-plugin`
}

const pluginBlacklist = [name]

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '**/*.sgr',
    css: '**/*.sss'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*'],
  reshape: (ctx) => {
    return htmlStandards({ webpack: ctx, locals })
  },
  postcss: (ctx) => {
    return cssStandards({ webpack: ctx })
  },
  babel: { presets: [es2015] },
  plugins: [
    new Records({
      addDataTo: locals,
      plugins: {
        url:
        `https://api.npms.io/v2/search?q=keywords:${name}-plugin&size=100`,
        transform: (res) => {
          return res.results.filter((p) => {
            if (p.flags.deprecated) return false
            return pluginBlacklist.indexOf(p.package.name) < 0
          })
        }
      }
    })
  ]
}
