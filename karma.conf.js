/* eslint-disable */
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
/* eslint-enable */

const karmaWebpackConfig = Object.assign(
  {},
  webpackConfig[0],
  {
    devtool: 'inline-source-map',
    plugins: webpackConfig[0].plugins.filter(plugin => (
      !(plugin instanceof webpack.optimize.CommonsChunkPlugin)
    )
    )
  }
)

module.exports = function (config) {
  config.set({
    // Add any browsers here
    browsers: ['Chrome'],
    frameworks: ['jasmine'],

    // The entry point for our test suite
    basePath: '.',
    autoWatch: true,
    files: [
      'src/scripts/tests/*.js',
      'src/scripts/**/tests/**/*.js'
    ],

    preprocessors: {
      'src/scripts/tests/*.js': ['webpack'],
      'src/scripts/**/tests/**/*.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: karmaWebpackConfig,
    client: {
      // log console output in our test console
      captureConsole: true
    },

    reporters: ['jasmine-diff', 'progress', 'coverage'],

    coverageReporter: [{
      type: 'html',
      dir: 'coverage/'
    }],

    singleRun: false, // do not exit after tests have completed

    webpackMiddleware: {
      noInfo: true
    },

    jasmineDiffReporter: {
      pretty: true,
      matchers: {
        toEqual: {
          pretty: false
        },
        toHaveBeenCalledWith: {
          pretty: '___'
        }
      }
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000 // 60 seconds
  })
}
