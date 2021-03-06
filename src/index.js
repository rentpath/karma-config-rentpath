const fs = require('fs')
const path = require('path')

const rootDir = process.cwd()
const jsDir = path.resolve(rootDir, 'app/assets/javascripts')
const nodeModulesDir = path.resolve(rootDir, 'node_modules')
const imageDir = path.resolve(rootDir, 'app/assets/images')
const componentDir = path.resolve(rootDir, 'app/assets/components') // For legacy Flight components

const aliasConfig = function() {
  const aliasConfigFile = path.resolve(rootDir, 'webpack-alias.config.js')
  if(fs.existsSync(aliasConfigFile)) {
    return require(aliasConfigFile)
  } else {
    return {}
  }
}

export default function(config) {
  config.set({
    basePath: '',
    plugins: [
      require('karma-webpack'),
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-shim',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ],
    frameworks: [
      'jasmine',
      'phantomjs-shim'
    ],
    files: [
      {
        pattern: 'spec/javascripts/fixtures/**',
        watched: true,
        served: true,
        included: false
      },
      {
        pattern: './app/assets/images/**/*',
        watched: true,
        served: true,
        included: false
      },
      './spec/javascripts/tests.bundle.js'
    ],
    exclude: [
      '**/*.swp',
      'app/assets/javascripts/main.js',
      'app/assets/javascripts/main.js.coffee',
      'app/assets/javascripts/application.js'
    ],
    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './node_modules/webpack-jasmine-flight/lib/jasmine-flight.js': ['webpack'],
      './node_modules/jasmine-jquery/lib/jasmine-jquery.js': ['webpack'],
      './app/assets/javascripts/**/*.coffee': ['webpack', 'coverage'],
      './app/assets/javascripts/**/*.js': ['webpack', 'coverage'],
      './vendor/javascripts/**/*.coffee': ['webpack'],
      './vendor/javascripts/**/*.js': ['webpack'],
      './spec/javascripts/helpers/js_config_helper.coffee': ['webpack'],
      './spec/javascripts/tests.bundle.js': ['webpack']
    },
    webpack: {
      resolve: {
        root: [jsDir, nodeModulesDir, rootDir, imageDir, componentDir],
        alias: aliasConfig(),
        extensions: ['', '.js.coffee', '.coffee', '.js', '.json', '.hbs', '.jsx']
      },
      amd: {
        jQuery: true
      },
      devtool: 'inline-source-map',
      module: {
        loaders: [
          { include: /\.json$/, loaders: ['json-loader'] },
          {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: [/node_modules/],
            cacheDirectory: true,
            presets: ['es2015']
          },
          {
            test: /\.coffee$/,
            loader: 'coffee-loader'
          },
          {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
          },
          {
            test: /\.(png|jpg|jpeg|gif|ico)$/,
            loader: "file?name=[name].[ext]"
          }
        ],
        postLoaders: [
          {
            test: /\.+(js.coffee|js|coffee)$/,
            exclude: /(spec|node_modules|vendor)\//,
            loader: 'istanbul-instrumenter'
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      type: 'html',
      subdir: 'karma'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
}
