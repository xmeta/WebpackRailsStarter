const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const OccurenceOrderPlugin = require('webpack/lib/optimize/OccurenceOrderPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {
    output: {
      // Build assets directly in to public/webpack/, let webpack know
      // that all webpacked assets start with webpack/

      // must match config.webpack.output_dir
      path: helpers.root('public/webpack') ,
      publicPath: '/webpack/',
      filename: '[name]-[chunkhash].js'
    },
    plugins: [
      new NoErrorsPlugin(),
      new UglifyJsPlugin({
        compressor: { warnings: false },
        sourceMap: false
      }),
      new DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new DedupePlugin(),
      new OccurenceOrderPlugin()
    ]
  });
}