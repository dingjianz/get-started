const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy } = require('customize-cra')
const modifyVars = require('./themeLessVar')

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
);