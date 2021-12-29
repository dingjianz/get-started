// eslint-disable-next-line import/no-extraneous-dependencies
const {
  override,
  addWebpackAlias,
  addPostcssPlugins,
  fixBabelImports,
} = require("customize-cra");

const path = require("path");

module.exports = override(
  addWebpackAlias({
    components: path.resolve(__dirname, "src/components"),
    api: path.resolve(__dirname, "src/api"),
    "@types": path.resolve(__dirname, "src/@types"),
    assets: path.resolve(__dirname, "src/assets"),
    utils: path.resolve(__dirname, "src/utils"),
    pages: path.resolve(__dirname, "src/pages"),
    router: path.resolve(__dirname, "src/router"),
    enum: path.resolve(__dirname, "src/enum"),
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css",
  }),
  addPostcssPlugins([
    require("postcss-pxtorem")({
      rootValue: 16, // 换算的基数
      unitPrecision: 5,
      propWhiteList: [], // 哪些需要进行px转rem
      minPixelValue: 2, // 最小转换，如低于 4px的不会进行转成rem
      // selectorBlackList: ["am-"], // 排除哪些开头的如 .weui-button 等等
    }),
  ])
);
