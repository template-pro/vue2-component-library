const path = require('path')
const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NodeExternals = require('webpack-node-externals')

const pkg = require('../package.json')
const baseWebpackConfig = require('./webpack.base')
const libraryName = pkg.name.replace(/^@.*\//, '')

const banner = `/*!
* ${libraryName} v${pkg.version}
* (c) ${new Date().getFullYear()} ${pkg.author.name}<${pkg.author.email}>
*/`

const resolve = (...args) => path.resolve(__dirname, '../', ...args)

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    [libraryName]: resolve('src/index.js'),
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  externals: [NodeExternals()],
  optimization: {
    minimize: false, // 不压缩代码
  },
  resolve: {
    alias: {
    },
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          'css-loader',
          'stylus-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.BannerPlugin({
      banner,
      raw: true,
      entryOnly: true,
      include: /\.js$/,
    }),
  ],
})
