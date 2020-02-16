let Glob = require('glob')
const path = require('path')
const entryConfig = require('./entry.config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  getEntries: function (globPath) { // 获取指定路径下的入口文件
    let entries = {}
    Glob.sync(globPath).forEach((entry) => {
      // console.log(entry) // './src/api/about.js'  './src/api/home.js' './src/api/index.js' './src/api/movie.js'
      let basename = path.basename(entry, path.extname(entry))
      let pathname = path.dirname(entry)
      // console.log({
      //   extname:path.extname(entry), // js
      //   basename, // about、 home、index、 movie
      //   pathname, // ./src/api
      // })
      if (!entry.match(/\/js\/(lib|commons)\//)) { // js/lib/*.js  js/common.js 不作为入口
        // console.log({1: pathname.split('/')}) // [ '.', 'src', 'api' ] 
        // console.log({2:pathname.split('/').splice(4)}) // []
        // console.log({3:pathname.split('/').splice(4).join('/')}) // ''
        // console.log({4:pathname.split('/').splice(4).join('/') + '/' + basename}) // /about /home /index /movie
        // console.log({5:pathname + '/' + basename}) // './src/api/movie' './src/api/home'
        entries[pathname.split('/').splice(4).join('/') + '/' + basename] = pathname + '/' + basename
      }
      for (let p in entryConfig.libs) {
        entries[p] = entryConfig.libs[p]
      }
      entries.vendor = entryConfig.vendor
    })
    // console.log(entries)
    /* 
    {
      '/about': './src/api/about',
      '/home': './src/api/home',
      '/index': './src/api/index',
      '/movie': './src/api/movie',
      swiper: ['swiper/dist/js/swiper.min.js', 'swiper/dist/css/swiper.min.css'],
      vendor: ['babel-polyfill', './src/js/common.js']
    }
    */
    return entries
  },
  generateTemplates: function (entry, htmlPath, commonsChunk, isOnline) {
    let plugins = []
    Object.keys(entry).map(function (entryName) {
      if (!commonsChunk.some(function (item) {
          return item === entryName
        })) {
        let htmlName = entryName

        let viewPackagePath = entryName.substr(0, entryName.lastIndexOf('/')).split('/') // entryName.substr(0, entryName.indexOf('/'))
        /* 
          { viewPackagePath: [ '' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'activity' ] }
          { viewPackagePath: [ 'demand' ] }
          { viewPackagePath: [ 'demand' ] }
          { viewPackagePath: [ '' ] }
          { viewPackagePath: [ '' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'onstage' ] }
          { viewPackagePath: [ 'order' ] }
          { viewPackagePath: [ 'order' ] }
          { viewPackagePath: [ 'order' ] }
          { viewPackagePath: [ 'order' ] }
          { viewPackagePath: [ 'solution' ] }
          { viewPackagePath: [ 'solution' ] }
          { viewPackagePath: [ 'square' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
          { viewPackagePath: [ 'user' ] }
        */
        let viewFilePath = htmlName.substr(htmlName.indexOf('/') === 0 ? 1 : 0, htmlName.length)
        /* 
          { viewFilePath: '404.ejs' }
          { viewFilePath: 'activity/applyBox.ejs' }
          { viewFilePath: 'activity/demandapply.ejs' }
          { viewFilePath: 'activity/developer.ejs' }
          { viewFilePath: 'activity/developerConsulation.ejs' }
          { viewFilePath: 'activity/empowerment.ejs' }
          { viewFilePath: 'activity/enterapply.ejs' }
          { viewFilePath: 'order/addaddress.ejs' }
          { viewFilePath: 'order/billvalidate.ejs' }
          { viewFilePath: 'order/orderinfo.ejs' }
          { viewFilePath: 'order/toast.ejs' }
          { viewFilePath: 'solution/icservice.ejs' }
          { viewFilePath: 'solution/smarthome.ejs' }
          { viewFilePath: 'square/index.ejs' }
          { viewFilePath: 'user/bank-example.ejs' }
          { viewFilePath: 'user/demand.ejs' }
          { viewFilePath: 'user/enterapply.ejs' }
          { viewFilePath: 'user/enterinfo.ejs' }
          { viewFilePath: 'user/helpcenter.ejs' }
          { viewFilePath: 'user/instant-messaging.ejs' }
          { viewFilePath: 'user/paycomplete.ejs' }
          { viewFilePath: 'user/payfail.ejs' }
          { viewFilePath: 'user/payway.ejs' }
          { viewFilePath: 'user/unsupported.ejs' }
        */
        let required = entryConfig.pageRequired[viewFilePath] ?
          (entryConfig.pageRequired[viewFilePath].required || []) :
          []

        for (var p in entryConfig.pageRequired) {
          if (new RegExp(p).test(viewFilePath)) {
            required.push(...entryConfig.pageRequired[p].required)
          }
        }
        let chunks = entryConfig.commonsRequired.concat(required, entryName)
        /* 
        [ 'vendor', 'common', 'swiper', 'user/unsupported' ]
        [ 'vendor', 'common', 'swiper', 'user/payfail' ]
        [ 'vendor', 'common', 'swiper', 'user/paycomplete' ]
         */
        let filename
        if (!filename) {
          filename = path.join(htmlPath, htmlName)
        }
        let template
        if (htmlName==='/index') {
          template = 'index.html'
          filename = htmlName
        } else {
          template = 'src/page'+ htmlName + '/index.html' 
        }
        console.log({filename})
        plugins.push(new HtmlWebpackPlugin({
          hash: isOnline,
          filename: filename+'.html',
          template: template,
          chunks: chunks,
          inject: true,
          chunksSortMode: function (chunk1, chunk2) {
            var order = chunks
            var order1 = order.indexOf(chunk1.names[0])
            var order2 = order.indexOf(chunk2.names[0])
            return order1 - order2
          }
        }))
      }
    })
    return plugins
  },
  getCommonsChunk: function (commonsChunk) {
    let libs = entryConfig.libs
    let libArr = []
    for (let p in libs) {
      libArr.push(p)
    }
    commonsChunk.splice(1, 0, ...libArr)
    // console.log(commonsChunk) // ['common', 'swiper', 'vendor']
    return commonsChunk
  }
}