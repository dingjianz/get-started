/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV;
const isAnalyzer = NODE_ENV === 'analyzer';

let configJs;
switch (process.env.TARGET_ENV) {
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
    configJs = 'config/env-dev.js';
}

module.exports = {
  // basePath: isProd ? '/docs' : '',
  env: {
    superName: 'jianding9',
  },
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '.',

  webpack: (config, { dev }) => {
    if (isAnalyzer) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    config.resolve.extensions.push('scss', 'sass', 'css');
    config.resolve.modules.push(path.join(__dirname, 'src'));
    config.resolve.alias.config = configJs;
    config.module.rules.push({
      enforce: 'pre',
      test: /\.jsx?$/,
      include: [path.join(__dirname, 'src')],
      loader: 'eslint-loader',
      options: {
        emitWarning: dev,
        // eslint-disable-next-line global-require
        formatter: require('eslint-friendly-formatter'),
        fix: true,
      },
    });
    return config;
  },
};
