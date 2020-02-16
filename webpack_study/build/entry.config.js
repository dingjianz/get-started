module.exports = {
  pageRequired: {
    'index.ejs': {
      // 单个页面需要引入的插件，在libs配置
      required: ['swiper']
    },
    '^user/': {
      // 单个页面需要引入的插件，在libs配置
      required: ['swiper']
    },
    '^solution/': {
      // 单个页面需要引入的插件，在libs配置
      required: ['swiper']
    }
  },
  libs: {
    // 第三方组建需要单独抽出的
    swiper: ['swiper/js/swiper.min.js', 'swiper/css/swiper.min.css']
  },
  vendor: [
    'babel-polyfill',
    './src/js/common.js'
  ],
  // commonsRequired页面中公共依赖，会被页面引入
  commonsRequired: ['vendor', 'common'],
}