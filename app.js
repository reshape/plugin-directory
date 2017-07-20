const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const Records = require('spike-records')
const isProduction = process.env.NODE_ENV === 'production'

const name = 'reshape'

const locals = {
  title: `${name[0].toUpperCase() + name.slice(1)} Plugin Directory`,
  githubUrl: `https://github.com/${name}/${name}`,
  gitterUrl: `https://gitter.im/${name}/${name}`,
  documentationUrl: `https://github.com/${name}/${name}#writing-a-plugin`
}

const pluginBlacklist = [name]

module.exports = {
  matchers: { html: '**/*.sgr', css: '**/*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'yarn.lock', 'readme.md', 'license.md'],
  reshape: htmlStandards({ locals, minify: isProduction }),
  postcss: cssStandards({ minify: isProduction }),
  babel: jsStandards(),
  plugins: [
    new Records({
      addDataTo: locals,
      plugins: {
        url:
        `https://api.npms.io/v2/search?q=keywords:${name}-plugin&size=100`,
        transform: (res) => {
          return res.results.filter((p) => {
            if (p.flags && p.flags.deprecated) return false
            return pluginBlacklist.indexOf(p.package.name) < 0
          })
        }
      }
    })
  ]
}
