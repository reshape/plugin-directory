const optimize = require('spike-optimize')

module.exports = {
  afterSpikePlugins: [...optimize({
    aggressiveSplitting: true,
    scopeHoisting: true,
    minify: true
  })]
}
