// eslint-disable-next-line import/no-extraneous-dependencies
const { override, addWebpackAlias } = require("customize-cra");

const path = require("path");

module.exports = override(
  addWebpackAlias({
    components: path.resolve(__dirname, "src/components"),
    api: path.resolve(__dirname, "src/api"),
    "@types": path.resolve(__dirname, "src/@types"),
    assets: path.resolve(__dirname, "src/assets"),
    utils: path.resolve(__dirname, "src/utils"),
  })
);
