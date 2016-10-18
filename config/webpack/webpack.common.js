const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
const StatsPlugin = require('stats-webpack-plugin');

/*
 * Webpack Constants
 */

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

module.exports = function (options) {
  return {
    entry: {
      // Sources are expected to live in $app_root/webpack
      'application': './webpack/application.js'
    },
    resolve: {
      root: helpers.root('webpack')
    },
    plugins: [
      // must match config.webpack.manifest_filename
      new StatsPlugin('manifest.json', {
        // We only need assetsByChunkName
        chunkModules: false,
        source: false,
        chunks: false,
        modules: false,
        assets: true
      })]
  }
}