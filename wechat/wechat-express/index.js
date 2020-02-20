// 引入express
const express = require('express')

// 引入auth模块
const auth = require('./wehcat/auth')

// 创建app应用对象
const app = express()

// 接受处理所有消息
app.use(auth())
// 监听端口号
app.listen(80, () => {
  console.log('服务器启动成功了')
})