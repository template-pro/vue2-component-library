const path = require('path')
const webpack = require('webpack')

const resolve = (...args) => path.resolve(__dirname, '../../', ...args)

const isDev = process.env.NODE_ENV !== 'production'
const pkg = require(resolve('package.json'))

module.exports = {
  title: `${pkg.name} | ${pkg.version}`,
  description: pkg.dependencies,
  base: isDev ? '/' :'/docs',
  port: 8089,
  theme: path.resolve(__dirname, './theme/development'),
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        pkg: resolve('package.json'),
      }),
    ],
    resolve: {
      extensions: ['.vue', '.js'],
      alias: {
        '@': resolve('src'),
      }
    }
  },
  postcss: {
  },
  themeConfig: {
    lastUpdated: true,
    sidebar: [
      '/',
    ],
    nav: [
      { text: 'ChangeLog', link: '/changelog/' },
      { text: 'Home', link: pkg.homepage },
    ]
  },
  plugins: {
    'demo-container': {},
  },
  additionalPages: [{
    path: '/changelog/',
    filePath: path.resolve(process.cwd(), './CHANGELOG.md')
  }]
}