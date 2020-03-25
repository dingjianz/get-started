var path = require('path')
var glob = require('glob')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const fs = require('fs')
const config = require('./config')

// 是否是线上环境（测试|预上线|生产）
var isProduction = process.env.NODE_ENV !== 'development'

// 资源路径
exports.assetsPath = function (_path) {
  var assetsSubDirectory = isProduction
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 获取指定路径下的入口文件
exports.getEntries = function () {
  let entries = {}
  const globPath = './src/pages/**/index.js'
  glob.sync(globPath).forEach(function (filepath) {
    const split = filepath.split('/')
    const name = split[split.length - 2]
    entries[name] = ['./' + filepath]
  })
  // 抽出的全页面公共的js／css
  return entries
}

// 生成模板
exports.generateTemplates = function (entry, isOnline) {
  const commonsChunk = ['commons', 'jquery', 'runtime']
  let plugins = []

  Object.keys(entry).forEach(function (entryName) {
    if (!commonsChunk.some(function (item) { return item === entryName })) {
      let filePath = entry[entryName][0].replace('.js', '')
      let fileName = filePath
        .replace(/(.*\.\/src\/pages)/, isOnline ? 'view' : '')
        .replace(/\/index\/index/, '/index')
        .replace(/^\//, '')
      let options = {
        filename: `${fileName}.html`,
        template: `${filePath}.html`,
        chunks: [...commonsChunk, entryName],
        inject: true,
        hash: true,
        chunksSortMode: function (chunk1, chunk2) {
          var order = [...commonsChunk, entryName];
          var order1 = order.indexOf(chunk1.names[0]);
          var order2 = order.indexOf(chunk2.names[0]);
          return order1 - order2;
        }
      }
      if (isOnline) {
        options.minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        }
        options.chunksSortMode = 'dependency'
      }
      plugins.push(new HtmlWebpackPlugin(options))
    }
  })
  return plugins
}