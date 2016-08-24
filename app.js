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
    html: '**/*.sml',
    css: '**/*.sss'
  },
  ignore: ['**/layout.sml', '**/_*', '**/.*'],
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
        url: `https://api.npms.io/search?term=${name}-plugin`,
        transform: (res) => {
          return res.results.filter((p) => {
            return pluginBlacklist.indexOf(p.module.name) < 0
          })
        }
      }
    })
  ]
}
