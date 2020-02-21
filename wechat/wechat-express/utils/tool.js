/* 
  工具函数包
*/

// 引入xml2js，将xml数据转化成js对象
const { parseString } = require('xml2js')
const { writeFile, readFile } = require('fs')
const path = require('path')

module.exports = {
  getUserDataAsync(req) {
    return new Promise((resolve, reject) => {
      let xmlData = ''
      req
        .on('data', data => {
          // console.log(data) // 读取的数据是buffer，需要将其转换成字符串
          xmlData += data.toString()
        })
        .on('end', () => {
          // 当数据接收完毕时，会触发当前函数
          resolve(xmlData)
        })
    })
  },

  parseXMLAsync(xmlData) { // 解析xml数据
    return new Promise((resolve, reject) => {
      parseString(xmlData, {trim: true}, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject('parseXMLAsync方法出了问题：' + err)
        }
      })
    })
  },

  formatMessage({xml}) {
    let message = {}
    if (typeof xml === 'object') { // 判断数据是否是一个对象
      for(let key in xml) {
        // 获取属性值
        let value = xml[key]
        // 过滤掉空的数据
        if (Array.isArray(value) && value.length > 0) {
          message[key] = value[0]
        }
      }
    }
    return message
  },

  writeFileAsync(data, fileName) { // 保存文件
    return new Promise((resolve, reject) => {
      // 将对象转换成json字符串
      writeFile(path.resolve(__dirname, '../static/' ,fileName), JSON.stringify(data), err => {
        if (!err) {
          console.log(`${fileName}保存成功~ `)
          resolve()
        } else {
          console.log(`${fileName}保存失败：` + err)
          reject(`${fileName}保存失败：` + err)
        }
      })
    })
  },
  
  readeFileAsync(fileName) { // 读取文件
    return new Promise((resolve, reject) => {
      readFile(path.resolve(__dirname, '../static/' ,fileName), (err, data) => {
        if (!err) {
          console.log(`${fileName}读取成功~`)
          resolve(JSON.parse(data))
        } else {
          console.log(`${fileName}读取失败：` + err)
          reject(`${fileName}读取失败：` + err)
        }
      })
    })
  }

}