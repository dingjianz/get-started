const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addWebpackAlias } = require('customize-cra')
const modifyVars = require('./themeLessVar')
const path = require('path')

module.exports = override(
  addDecoratorsLegacy(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true
  }),
  addWebpackAlias({
    ['@']: path.resolve(__dirname, './src'),
    ['@components']: path.resolve(__dirname, './src/components'),
    ['@utils']: path.resolve(__dirname, './src/utils'),
    ['@views']: path.resolve(__dirname, './src/views')
  })
);