const path = require('path')
const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPluginCss = require('mini-css-extract-plugin')
const MiniCssExtractPluginSass = require('mini-css-extract-plugin')

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'app.js'
  },
  plugins: [
    new CleanWebpackPlugin(), // 清空dist目录
    new HtmlWebpackPlugin({
      hash: false,
      title: 'Hello World app',
      minify: { // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: false, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      filename: 'index.html',
      template: 'src/index.html',
    }),
    new MiniCssExtractPluginCss({
      filename: 'css/index.css'
    }),
    new MiniCssExtractPluginSass({
      filename: 'scss/index.scss'
    })
  ],
  module: {
    rules: [
      // css-loader 解析@import这种语法,解析路径
      // style-loader 把css插入到head标签中
      {test: /\.css$/, use: [ MiniCssExtractPluginCss.loader, 'css-loader', 'postcss-loader']},
      {test: /\.scss$/, use: [ MiniCssExtractPluginSass.loader, 'css-loader', 'postcss-loader','sass-loader']},
    ]
  },
  devServer: { // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: './dist',
    open: true
  }
}