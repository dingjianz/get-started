const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')
const config = require('./config')
const opener = require('opener')
const rm = require('rimraf')
const entry = utils.getEntries()

let isProduction
let conf
if (process.env.NODE_ENV !== 'development') {
  isProduction = true
  conf = config.build
  rm.sync(path.join(conf.assetsRoot, './*'))
} else {
  isProduction = false
  conf = config.dev
}

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function (env, argv) {
  env = env || {}
  return {
    mode: 'development',
    devtool: conf.devtool,
    entry: entry,
    output: {
      path: conf.assetsRoot,
      filename: utils.assetsPath('js/[name].js'),
      chunkFilename: utils.assetsPath('js/[name].js'),
      publicPath: conf.assetsPublicPath
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' }
        },
        {
          test: /\.(js|jsx)$/i,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }]
        },

        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
              options: {sourceMap: conf.cssSourceMap}
            },
            ...(isProduction ? [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: conf.assetsPublicPath
              }
            }] : []),
            {
              loader: 'css-loader',
              options: {sourceMap: conf.cssSourceMap}
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: conf.cssSourceMap,
                plugins: [
                  require('autoprefixer')
                ]
              }
            }
          ]
        },
        {
          test: /\.scss$/i,
          use: [
            {
              loader: 'style-loader',
              options: {sourceMap: conf.cssSourceMap}
            },
            ...(isProduction ? [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: conf.assetsPublicPath
              }
            }] : []),
            {
              loader: 'css-loader',
              options: {sourceMap: conf.cssSourceMap}
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: conf.cssSourceMap,
                plugins: [
                  require('autoprefixer')
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: conf.cssSourceMap}
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [resolve('src/styles/variable.scss'), resolve('src/styles/mixins.scss')]
              }
            }
          ]
        },
        {
          test: /.(png|jpg|gif)$/i,
          use: {
            loader: 'url-loader',
            options: {
              outputPath: `${conf.assetsSubDirectory}/imgs`,
              limit: 4 * 1024
            }
          }
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/i,
          use: {
            loader: 'url-loader',
            options: {
              outputPath: 'fonts/',
              limit: 4 * 1024
            }
          }
        },
        {
          test: /\.(ejs)$/i,
          loader: 'ejs-loader',
          query: {
            variable: 'pageData'
          }
        },
      ]
    },
    optimization: {
      ...(isProduction ? {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            commons: {
              name: 'commons',
              test: (module) => {
                console.log(module.context)
                return (!/pages/.test(module.context))
              }
            },
            jquery: {
              name: 'jquery',
              priority: 2,
              test: (module) => (/jquery/.test(module.context))
            }
          }
        },
        runtimeChunk: 'single'
      } : {})
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new CopyWebpackPlugin([{
        from: 'src/pages/doc/readme.md',
        to: 'data/doc.readme.md'
      }, {
        from: 'src/pages/doc/transcode.js',
        to: 'data/transcode.js'
      }, {
        from: 'src/pages/doc/websocket.js',
        to: 'data/websocket.js'
      }]),
      ...(isProduction ? [
        new MiniCssExtractPlugin({
          filename: `${conf.assetsSubDirectory}/css/[name].css`
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: {safe: true, discardComments: {removeAll: true}},
          canPrint: true
        })
      ] : []),
      ...utils.generateTemplates(entry, isProduction),
      // new BundleAnalyzerPlugin()
    ],
    devServer: conf.devServer || {},
    resolve: {
      extensions: ['.js', '.scss', '.less', '.css'],
      modules: [
        'node_modules',
        path.join(process.cwd(), './src'),
        path.join(process.cwd(), './src/scss'),
        path.join(process.cwd(), './src/templates'),
        path.join(process.cwd(), './src/assets')
      ]
    }
  }
}
if (!isProduction) {
  opener("http://localhost:8080")
}
