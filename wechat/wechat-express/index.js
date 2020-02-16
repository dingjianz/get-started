// 引入express
const express = require('express')

// 创建app应用对象
const app = express()

// 验证服务器的有效性
/* 
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

// 定义配置对象
const config = {
  token: 'jdsanjdsncjds',
  appID: 'wx92089efa72c32563',
  appsecret: 'cee5dd3bcd7a6f262ed638138cffd7c5'
}
// 接受处理所有消息
app.use((req, res, next) => {
  // 微信服务器提交的参数
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
  const arrSort = arr.sort()
  
})
// 监听端口号
app.listen(3000, () => {
  console.log('服务器启动成功了')
})