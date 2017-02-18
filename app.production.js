const htmlStandards = require('spike-html-standards')
const cssStandards = require('spike-css-standards')
const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const DedupePlugin = webpack.optimize.DedupePlugin
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin

const name = 'reshape'

const locals = {
  title: `${name[0].toUpperCase() + name.slice(1)} Plugin Directory`,
  githubUrl: `https://github.com/${name}/${name}`,
  gitterUrl: `https://gitter.im/${name}/${name}`,
  documentationUrl: `https://github.com/${name}/${name}#writing-a-plugin`
}

module.exports = {
  reshape: (ctx) => {
    return htmlStandards({ webpack: ctx, locals, minify: true })
  },
  postcss: (ctx) => {
    return cssStandards({ webpack: ctx, minify: true, warnForDuplicates: false })
  },
  plugins: [
    new UglifyJsPlugin(),
    new DedupePlugin(),
    new OccurrenceOrderPlugin()
  ]
}
