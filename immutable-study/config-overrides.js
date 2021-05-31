const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
} = require('customize-cra');

const path = require('path');


module.exports = override(
  addLessLoader({
    javascriptEnabled: true
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true // 要安装less less-loader
  }),
  addWebpackAlias({
    '@': path.resolve('./src'),
  })
);