const htmlStandards = require('spike-html-standards')
const cssStandards = require('spike-css-standards')
const Records = require('spike-records')
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

const pluginBlacklist = [name]

module.exports = {
  devtool: false,
  module: {
    loaders: [{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'image-webpack' }]
  },
  reshape: (ctx) => {
    return htmlStandards({ webpack: ctx, locals, minify: true })
  },
  postcss: (ctx) => {
    return cssStandards({ webpack: ctx, minify: true })
  },
  plugins: [
    new UglifyJsPlugin(),
    new DedupePlugin(),
    new OccurrenceOrderPlugin(),
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
