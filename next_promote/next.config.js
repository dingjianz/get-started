/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const isProd = process.env.NODE_ENV === 'production';
const isAnalyzer = process.env.NODE_ENV === 'analyzer';

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
