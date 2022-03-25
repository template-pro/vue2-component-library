const path = require('path')
const { merge } = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('../package.json')
const baseWebpackConfig = require('./webpack.base')

const isProduction = process.env.NODE_ENV === 'production'
const libraryName = pkg.name.replace(/^@.*\//, '')

const resolve = (...args) => path.resolve(__dirname, '../', ...args)

module.exports = merge(baseWebpackConfig, {
  mode: isProduction ? 'production' : 'development',
  entry: resolve('example/index.js'),
  output: {
    path: resolve('dist'),
    publicPath: '/',
    filename: 'static/[name].[hash:7].js',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 8088,
  },
  optimization: {
    minimize: isProduction,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('index.html'),
      title: `${libraryName} | example`,
    }),
  ],
})
