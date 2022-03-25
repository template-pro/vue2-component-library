const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const pkg = require('../package.json')

const resolve = (...args) => path.resolve(__dirname, '../', ...args)

const webpack = require('webpack')
module.exports = {
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.pug$/,
        use: ['pug-plain-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: 'static/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      '@': resolve('src'),
      [pkg.name]: resolve('src'),
    },
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      'package.json': resolve('package.json'),
    }),
  ],
}
