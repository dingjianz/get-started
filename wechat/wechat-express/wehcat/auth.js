/*
  验证服务器有效性模块

  1. 微信服务器知道开发正服务器是哪个
    -微信开放文档测试号管理页面上填写url开发者服务器地址
      -使用ngrok内网穿透，将本地端口号开启的服务映射外网跨域访问网址
      -ngrok http 3000
    -填写token
      -参与微信签名加密的一个参数
  2. 开发者服务器 - 验证消息是否来自于微信服务器
    -目的：计算得出signature微信加密签名，和微信传递过来的signature进行对比，如果一样，说明消息来自于微信服务器，不一样，则不是来自微信服务器发送的消息
    2.1 将参与微信加密签名的三个参数(timestamp, nonce, token)，组合在一起，按照字典序排序并组合在一起，形成一个数组
    2.2 将数组里所有参数拼成一个字符串，进行sha1加密；
    2.3 加密完成就生成了一个signature，和微信发送过来的signature进行对比：
      -如果一样，说明消息来自于微信服务器，返回echostr给微信服务器；
      - 如果不一样，说明不是微信服务器发送的消息，返回error
*/

// 引入sha1加密
const sha1 = require('sha1')
// 引入config模块
const config = require('../config')
// 引入tool模块
const { getUserDataAsync, parseXMLAsync, formatMessage } = require('../utils/tool')
// 引入template模块
const template = require('./template')
// 引入replyTemplate模块
const replyTemplate = require('./replyTemplate')

module.exports = () => {
  return async (req, res, next) => {
    // 微信服务器提交过来的参数
    /*
      console.log(req.query)
      {
        signature: '12fa1fb0d2f614ffdbc7bd6888d904e21601d119',// 威胁你的加密签名
        echostr: '8265780771680779143', // 微信的随机字符串
        timestamp: '1581849476', // 微信发送请求的时间戳
        nonce: '779181196' // 微信的随机数字
      }
    */
    const { signature, echostr, timestamp, nonce } = req.query
    const { token } = config

    // 1. 字典排序
    const arr = [timestamp, nonce, token]
    // 2.将数组里所有参数拼接成一个字符串，进行sha1加密
    const sha1Str = sha1(arr.sort().join(''))   
    /* 
      微信服务器回发送两种类型的消息给开发者服务器
        1. GET请求
          - 验证服务器的有效性
        2. POST请求
          - 微信服务器会将用户发送的数据以POST请求的方式转发到开发者服务器上
    */
    if (req.method === 'GET') {
       // 3. 加密完成就生成了一个sha1Str，和微信发送过来的signature进行对比
      if (sha1Str === signature) {
        // 如果一样，说明消息来自于微信服务器，返回echostr给微信服务器
        res.send(echostr)
      } else {
        // 如果不一样，说明不是微信服务器发送的消息，返回error
        res.end('error_dj')
      }
    } else if (req.method === 'POST') {
      // 验证消息是不是来自微信服务器
      if (sha1Str !== signature) return res.end('error_dj') // 不是来自微信服务器


      /* 
        console.log(req.query)
        如果开发者服务器没有返回响应给微信服务器，微信服务器会发送三次请求过来
      { 
        signature: 'd0b68d5dc7552e9719cdeac06cc18d3a65dca7d8',
        timestamp: '1582161110',
        nonce: '145914348',
        openid: 'oJ1juwYj2Kd2kwnPqMjl9-1s0nl4' // 用户微信的id
      }
      */

      // 接受请求体中的数据，流式数据
      const xmlData = await getUserDataAsync(req)
      /* 
        console.log(xmlData)
        <xml>
          <ToUserName><![CDATA[gh_546b1f59ce25]]></ToUserName> // 开发者的id
          <FromUserName><![CDATA[oJ1juwYj2Kd2kwnPqMjl9-1s0nl4]]></FromUserName> // 用户的openid
          <CreateTime>1582162318</CreateTime> // 发送时间的时间戳
          <MsgType><![CDATA[text]]></MsgType> // 发送的消息类型
          <Content><![CDATA[789]]></Content> // 发送的内容789
          <MsgId>22651117601973630</MsgId> // 消息id 微信服务器会默认保存3天用户发送的数据，通过此id三天内就能找到消息数据，三天后就被销毁
        </xml>
      */
      
      // 将xml数据解析为js对象
      const jsData = await parseXMLAsync(xmlData)
      /* 
        console.log(jsData)
        {
          xml: 
            {
              ToUserName: [Array],
              FromUserName: [Array],
              CreateTime: [Array],
              MsgType: [Array],
              Content: [Array],
              MsgId: [Array]
            } 
        } 
      */
        
     // 格式化数据
      const message = formatMessage(jsData)
      const option = replyTemplate(message)
      const replyMessage = template(option)
      // 返回响应给微信服务器
      res.send(replyMessage)
    } else {
      res.end('error_dj')
    }
  }
}
