const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const utilts =  require('./utils')
const entryJs = utilts.getEntries('./src/api/**.js')
var htmlPath = path.join(process.cwd(), './dist/page')
const commonsChunk = utilts.getCommonsChunk(['common', 'vendor'])
/* 
  在webpack.config.js文件中，output配置只在production环境下起效，devServer只在development环境下有效。
*/

module.exports = {
  entry: entryJs,
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/'
  },
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new UglifyJsPlugin()
    ]
  },
  performance: { hints: false },
  devtool: 'source-map',
  watch: true,
  watchOptions: { //监控的选项
    poll: 1000, // 每秒问我1000次是否更新
    aggregateTimeout: 500, // 防抖 500ms内只打包一次
    ignored:/node_modules/
  },
  module: {
    rules: [
      // {
      //   enforce: 'pre', // previous post
      //   test:/\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'eslint-loader'
      //   }
      // },
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins:[
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose" : true }],
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: 'assets/images/[name].[ext]',
            publicPath: '/',
            limit: 8192,
            esModule: false
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json"],
    modules: [
      'node_modules',
      path.join(process.cwd(), './src'),
    ],
  },
  plugins: [
    // new webpack.ProvidePlugin({ // 在每个模块中都注入$
    //   $: 'jquery',
    //   jQuery: 'jquery'
    // }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[chunkHash:8].css',
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(process.cwd(), 'static'),
      to: 'static'
    }]),
    new webpack.HotModuleReplacementPlugin()
  ].concat(utilts.generateTemplates(entryJs, htmlPath, commonsChunk, !isDev)),
  
  devServer: {
    // contentBase:path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    port: 3000,
    hot: true,
    open: true,
    inline: true,
    proxy: {}
  }
}


if (isDev) {
  module.exports.plugins = module.exports.plugins.concat([
    new CleanWebpackPlugin(),
  ])
}