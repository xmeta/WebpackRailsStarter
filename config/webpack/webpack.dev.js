const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const PORT = 3808;

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
      path: helpers.root('public/webpack'),
      publicPath: '/webpack/',
      filename: '[name].js'
    },
    devServer: {
      port: PORT,
      headers: { 'Access-Control-Allow-Origin': '*' }
    },
    output: {
      publicPath: '//localhost:' + PORT + '/webpack/'
    },
    devtool: 'cheap-module-eval-source-map'
  });
}
