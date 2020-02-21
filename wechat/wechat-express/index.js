// 引入express
const express = require('express')
// 引入auth模块
const auth = require('./wehcat/auth')
// 创建app应用对象
const app = express()
// 引入wechat模块
const Wechat = require('./wehcat/wechatApi')
// 引入congig模块
const  { url } = require('./config')
// 引入sha1模块
const sha1 = require('sha1')

// 配置模板资源目录
app.set('views', './views')
// 配置模板引擎
app.set('view engine', 'ejs')

const wechatApi = new Wechat() // 创建实例对象
//页面路由
app.get('/search', async (req, res) => {
  // 获取随机字符串
  const noncestr = Math.random().toString().replace('.', '')
  // 获取时间戳
  const timestamp = Date.now().toString().substr(0, 10)
  // 获取票据
  const { ticket } = await wechatApi.fetchTicket()

  /* 
    生成js-sdk使用的签名：
      -1.组合参与签名的四个参数，jsapi_ticket(临时票据)、noncestr(随机字符串)、timestamp(时间戳)，url(当前服务器地址)
      -2.将其进行字典序排序，以'&'拼接在一起
      -3.进行sha1加密，最终生成signature
  */
  const arr = [
    `jsapi_ticket=${ticket}`,
    `noncestr=${noncestr}`,
    `timestamp=${timestamp}`,
    `url=${url}/search`
  ]
  const str = arr.sort().join('&')
  const signature = sha1(str)
  res.render('search', {
    signature,
    noncestr,
    timestamp
  })
})

// 接受处理所有消息
app.use(auth())
// 监听端口号
app.listen(80, () => {
  console.log('服务器启动成功了')
})