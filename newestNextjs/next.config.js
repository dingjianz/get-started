/* eslint-disable no-useless-concat */
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  reactStrictMode: true,
  env: {
    Title: process.env.title,
  },
  async rewrites() {
    return [
      // 默认使用定义在pages下的路由，否则将代理到 https://www.nextjs.cn/，需要注意的是pages下定义的路由有最高优先级。
      // {
      //   source: "/dashboard/:bid",
      //   destination: "http://www.baidu.com",
      // },
      {
        source: '/:path*',
        destination: '/:path*' + '?name=jianding9',
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.plugins.push(
      new ESLintPlugin({
        fix: true,
        extensions: ['js', 'jsx'],
        exclude: '/node_modules/',
        formatter: eslintFriendlyFormatter,
      })
    );

    return config;
  },
};
