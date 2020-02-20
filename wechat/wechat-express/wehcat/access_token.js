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
const { writeFile, readFile } = require('fs')

const { appID, appsecret } = require('../config')


class Wechat {
  constructor() {
    this.fetchAccessToken().then(res => {
      console.log(774)
      console.log(res)
    })
  }

  // 用来获取access_token
  getAccessToken() {
    // 定义请求地址
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`
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
    return new Promise((resolve, reject) => {
      // 将对象转换成json字符串
      writeFile('./accessToken.txt', JSON.stringify(accessToken), err => {
        if (!err) {
          console.log('文件保存成功~')
          resolve()
        } else {
          console.log('文件保存失败：' + err)
          reject('文件保存失败：' + err)
        }
      })
    })
  }

  // 用来读取access_token
  readAccessToken() {
    return new Promise((resolve, reject) => {
      readFile('./accessToken.txt', (err, data) => {
        if (!err) {
          console.log('文件读取成功~')
          resolve(JSON.parse(data))
        } else {
          console.log('文件读取失败：' + err)
          reject('文件读取失败：' + err)
        }
      })
    })
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
      console.log(909)
      return Promise.resolve({
        access_token: this.access_token,
        expires_in: this.expires_in
      })
    }
    return new Promise(() => {
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
          // 返回res包装了一层promise对象（此对象为成功的状态）
          // this.readAccessToken()返回的最终值
          return Promise.resolve(res)
        })
    })
  }
}

// // 模拟测试
const w = new Wechat()
// w.fetchAccessToken()
// .then(res => {
//   console.log(res)
// })