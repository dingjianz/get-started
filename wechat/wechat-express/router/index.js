// 引入express模块
const express = require('express')
// 获取Router
const Router = express.Router

// 创建路由器对象
const router = new Router()

// 引入reply模块
const reply = require('../reply')

// 引入wechat模块
const Wechat = require('../wehcat/wechatApi')
// 引入congig模块
const  { url } = require('../config')
// 引入sha1模块
const sha1 = require('sha1')

const wechatApi = new Wechat() // 创建实例对象

//页面路由
router.get('/search', async (req, res) => {
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
router.use(reply())

module.exports = router