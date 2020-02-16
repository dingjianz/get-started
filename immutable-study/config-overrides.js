const {
  override,
  fixBabelImports,
  addLessLoader
} = require('customize-cra')


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
);