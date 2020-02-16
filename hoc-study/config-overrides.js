// module.exports = function override(config, env) {
//   // 如果没有使用 customize-cra ，就在这里对config进行配置
//   return config;
// }

const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy()
)