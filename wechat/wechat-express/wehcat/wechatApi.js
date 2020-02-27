/*
  获取access_token:微信调用接口全局唯一凭据
    -特点：
      -1.唯一性;
      -2.有效期为2小时

    整理思路：
      -读取本地文件(readAcessToken)
        -本地有文件
          -判断是否过期(isValidAccessToken)
            -过期了
              -重新请求获取access_token (getAccessToken)，保存下来覆盖之前的文件（保证文件是唯一的） (saveAccessToken)
            -没有过期
              -直接使用
        -本地没有文件
          -发送请求获取access_token (getAccessToken)，保存下来（本地文件）(saveAccessToken)，直接使用
      - https请求方式: GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
*/

const rp = require('request-promise-native') // 只需要引入request-promise-native
const { appID, appsecret } = require('../config')
const menuConfig = require('./menuConfig')
const api = require('../utils/api')
const { writeFileAsync, readeFileAsync } = require('../utils/tool')


class Wechat {
  constructor() { }

  // 用来获取access_token
  getAccessToken() {
    // 定义请求地址
    const url = `${api.accessToken}&appid=${appID}&secret=${appsecret}`
    /* 
      服务端无法使用ajax请求，下载两个库:
        -request
        -request-promise-native 返回值是一个propmise对象
    */
    return new Promise((resolve, reject) => {
      rp({ methods: 'GET', url, json: true })
        .then(res => {
        /*
          { access_token:   '30_q0MOc42qtmmTCrBzxTPZZoYp62HpCTgcKoQqpaWZWBHcwjeqoth8OFuQusjDNtbylfcAtxviNZ_4GN5O5XSpza1v5bgZYs5eQYOJtHsQ0rojGK_mzL1kfRCEhlWrCj84uAzDwnF7oA0qhRI-GCLjAAAXTC',
          expires_in: 7200 }
          */
        // 设置access_token的过期时间，转成时间戳
        res.expires_in = Date.now() + (res.expires_in - 5 * 60) * 1000
        resolve(res)
      })
      .catch(err => {
        reject('getAccessToken方法出了问题：'+ err)
      })
    })
  }

  // 用来保存access_token
  saveAccessToken(accessToken) {
    return writeFileAsync(accessToken, 'access_token.txt')
  }

  // 用来读取access_token
  readAccessToken() {
    return readeFileAsync('access_token.txt')
  }

  // 用来检测access_token是否有效
  isValidAccessToken(data) {
    // 检测传入的参数是否有效的
    if (!data && data.access_token && !data.expires_in) return false // 代表无效
    // 检测access_token是否在有效期内
    return data.expires_in > Date.now()
  }
  
  // 用来获取access_token
  fetchAccessToken() {
    if (this.access_token && this.expires_in && this.isValidAccessToken(this)) { // 说明之前保存过access_token，并且它是有效的，可直接使用
      return Promise.resolve({
        access_token: this.access_token,
        expires_in: this.expires_in
      })
    }
    return new Promise((resolve, reject) => {
      this.readAccessToken()
        .then(async res => {  // 本地有文件
          if (this.isValidAccessToken(res)) {
            return Promise.resolve(res) // 有效的
          } else {
            // 无效的，发送请求获取 access_token
            const res = await this.getAccessToken()
            // 保存请求下来（本地文件） access_token，直接使用
            await this.saveAccessToken(res)
            // 将请求回来的 access_token 返回出去
            return Promise.resolve(res)
          }
        })
        .catch(async err => {
          // 本地没有文件, 发送请求获取access_token
          const res = await this.getAccessToken()
          // 保存下来（本地文件） access_token，直接使用
          await this.saveAccessToken(res)
          // 将请求回来的access_token返回出去
          return Promise.resolve(res)
        })
        .then(res => {
          // 将access_token expires_in 挂在到this上
          this.access_token = res.access_token
          this.expires_in = res.expires_in
          // this.readAccessToken()返回的最终值
          resolve(res)
        })
    })
  }

  // 用来获取jsapi_ticket
  getTicket() {
    return new Promise(async (resolve, reject) => {
      const data = await this.fetchAccessToken()
      const url = `${api.jsApiTicket}&access_token=${data.access_token}`
      rp({method: 'GET', url, json: true})
        .then(res => {
          /* {
              "errcode":0,
              "errmsg":"ok",
              "ticket":"bxLdikRXVbTPdHSM05e5u5sUoXNKd8-41ZO3MhKoyN5OfkWITDGgnr2fwJ0m9E8NYzWKVZvdVtaUgWvsdshFKA",
              "expires_in":7200
          }*/
          resolve({
            ticket: res.ticket,
            expires_in: Date.now() + (res.expires_in - 5 * 60)*1000
          })
        })
        .catch(err => {
          console.log(err)
          reject('getTicket方法除了问题：' + err)
        })
    })
  }

  // 用来保存jsapi_ticket
  saveTicket(ticket) {
    return writeFileAsync(ticket, 'ticket.txt')
  }

  // 用来读取jsapi_ticket
  readTicket() {
    return readeFileAsync('ticket.txt')
  }

  // 用来检测jsapi_ticket是否有效
  isValidTicket(data) {
    if (!data && data.ticket && !data.ticket_expires_in) return false // 代表无效
    // 检测ticket是否在有效期内
    return data.ticket_expires_in > Date.now()
  }

  // 用来获取没有过期的ticket
  fetchTicket() {
    if (this.ticket && this.ticket_expires_in && this.isValidTicket(this)) { // 说明之前保存过 ticket，并且它是有效的，可直接使用
      return Promise.resolve({
        ticket: this.ticket,
        expires_in: this.ticket_expires_in
      })
    }
    return new Promise((resolve, reject) => {
      this.readTicket()
        .then(async res => {  // 本地有文件
          if (this.isValidTicket(res)) {
            return Promise.resolve(res) // 有效的
          } else {
            // 无效的，发送请求获取 ticket
            const res = await this.getTicket()
            // 保存请求下来（本地文件） ticket，直接使用
            await this.saveTicket(res)
            // 将请求回来的 ticket 返回出去
            return Promise.resolve(res)
          }
        })
        .catch(async err => {
          // 本地没有文件, 发送请求获取 ticket
          const res = await this.getTicket()
          // 保存下来（本地文件） ticket，直接使用
          await this.saveTicket(res)
          // 将请求回来的ticket返回出去
          return Promise.resolve(res)
        })
        .then(res => {
          // 将 ticket expires_in 挂在到this上
          this.ticket = res.ticket
          this.ticket_expires_in = res.expires_in
          // this.readAccessToken()返回的最终值
          resolve(res)
        })
    })
  }
  // 创建菜单
  createMenu(config) {
    return new Promise(async (resolve, reject) => {
      // 获取access_token
      try {
        const data = await this.fetchAccessToken()
        const url = `${api.menu.create}access_token=${data.access_token}`
        const result = await rp({method: 'POST',url, json: true, body: config})
        resolve(result)
      } catch (err) {
        reject('createMenu方法出错了：' + err)
      }
    })
  }

  // 删除菜单
  deleteMenu() {
    return new Promise(async (resolve, reject) => {
      try {
        // 获取access_token
        const data = await this.fetchAccessToken()
        const url = `${api.menu.delete}access_token=${data.access_token}`
        const result = await rp({method: 'GET',url, json: true})
        resolve(result)
      } catch (err) {
        reject('deleteMenu方法出错了：' + err)
      }
    })
  }
}

// 模拟测试,如果需要新建菜单，打开闭包，运行wechatApi.js
/*
(async () => {
  const w = new Wechat()
  const result_1 = await w.deleteMenu() // 先删除才能创建
  console.log({result_1})
  const result_2 = await w.createMenu(menuConfig)
  console.log(result_2)
  const result_3 = await w.fetchTicket()
  console.log(result_3)
})()
*/

module.exports = Wechat