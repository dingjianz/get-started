const routes = require('./router/index') // 路由配置
const config =  {
  pages: routes,
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
}

// 微信小程序tab
if (process.env.TARO_ENV === "weapp") {
  config.tabBar = {
    color: "#333333",
    selectedColor: "#0095ff",
    backgroundColor: "#FFFFFF",
    borderStyle: "black",
    list: [
      {
        text: '主页',
        pagePath: 'pages/index/index',
        iconPath: 'assets/img/tabbar/home.png',
        selectedIconPath: 'assets/img/tabbar/home_a.png'
      },
      {
        text: '博客',
        pagePath: 'pages/blog/index',
        iconPath: 'assets/img/tabbar/note.png',
        selectedIconPath: 'assets/img/tabbar/note_a.png'
      },
      {
        text: '商城',
        pagePath: 'pages/shop/index',
        iconPath: 'assets/img/tabbar/shop.png',
        selectedIconPath: 'assets/img/tabbar/shop_a.png'
      },
      {
        text: '设置',
        pagePath: 'pages/set/index',
        iconPath: 'assets/img/tabbar/set.png',
        selectedIconPath: 'assets/img/tabbar/set_a.png'
      },
    ]
  }
}

export default config;