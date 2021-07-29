/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-concat */
const path = require('path');

const ESLintPlugin = require('eslint-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

let configJs = 'config/env-dev.js';

switch (process.env.NODE_ENV) {
  case 'development':
    configJs = 'config/env-dev.js';
    break;
  case 'test':
    configJs = 'config/env-test.js';
    break;
  case 'demo':
    configJs = 'config/env-demo.js';
    break;
  case 'production':
    configJs = 'config/env-prod.js';
    break;
  default:
    break;
}

module.exports = {
  reactStrictMode: true,
  env: {
    Title: process.env.title,
  },
  images: {
    domains: ['img2.baidu.com'],
  },
  async rewrites() {
    return [
      // 默认使用定义在pages下的路由，否则将代理到 https://www.nextjs.cn/，需要注意的是pages下定义的路由有最高优先级。
      // {
      //   source: "/dashboard/:bid",
      //   destination: "http://www.baidu.com",
      // },
      {
        source: '/dashboard/:bid',
        destination: '/dashboard/:bid' + '?ch=web',
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.config = path.join(__dirname, 'src', configJs);
    config.plugins.push(
      new ESLintPlugin({
        fix: true,
        extensions: ['js', 'jsx'],
        exclude: '/node_modules/',
        formatter: eslintFriendlyFormatter,
      })
    );
    config.module.rules.push(
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          publicPath: '/_next',
          name: '[name].[hash].[ext]',
          esModule: false,
        },
      }
      // use: [
      //   {
      //     loader: 'url-loader',
      //     options: {
      //       limit: config.inlineImageLimit,
      //       // publicPath: `${config.assetPrefix}/_next/static/media/`,
      //       // outputPath: `${isServer ? '../' : ''}static/media/`,
      //       publicPath: '/_next',
      //       name: '[name].[hash].[ext]',
      //       esModule: config.esModule || false,
      //     },
      //   },
      // ],
    );

    return config;
  },
};
