const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, addPostcssPlugins } = require('customize-cra')

const modifyVars = require('./themeLessVar')

module.exports = override(
  addDecoratorsLegacy(),
  addLessLoader ({
    javascriptEnabled: true,
    modifyVars
  }),
  addPostcssPlugins([
    // require('autoprefixer')({
    //   overrideBrowserslist: ['iOS >= 7', 'Android >= 4.1']
    // }),
    // require('postcss-pxtorem')({
    //   rootValue: 20 / 2,
    //   propWhiteList: [],
    // })
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*']
      // propList: ['*', '!border*', '!font-size*', '!letter-spacing'],
      // propWhiteList: []
    })
  ]),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true
  })
)