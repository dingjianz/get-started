
// 1. websocket连接：判断浏览器是否兼容，获取websocket url并连接，这里为了方便本地生成websocket url
// 2. 获取浏览器录音权限：判断浏览器是否兼容，获取浏览器录音权限，
// 3. js获取浏览器录音数据
// 4. 将录音数据处理为文档要求的数据格式：采样率16k或8K、位长16bit、单声道；该操作属于纯数据处理，使用webWork处理
// 5. 根据要求（采用base64编码，每次发送音频间隔40ms，每次发送音频字节数1280B）将处理后的数据通过websocket传给服务器，
// 6. 实时接收websocket返回的数据并进行处理

// ps: 该示例用到了es6中的一些语法，建议在chrome下运行

import CryptoJS from 'crypto-js'
import VConsole from 'vconsole'
import 'js/jquery.js'
import TransWorker from 'js/transcode.worker.js'
import { Base64 } from 'js/base64js.js'
import parser from 'fast-xml-parser'
import './index.css'

let transWorker = new TransWorker()
//APPID，APISecret，APIKey在控制台-我的应用-语音评测（流式版）页面获取
const APPID = '5f43cfa3'
const API_SECRET = '73bfb04aa6da3356877058ad1c339340'
const API_KEY = '49456354092f7540e23b8ba4544cbd87'

/**
 * 获取websocket url
 * 该接口需要后端提供，这里为了方便前端处理
 */
function getWebSocketUrl() {
  return new Promise((resolve, reject) => {
    // 请求地址根据语种不同变化
    var url = 'wss://ise-api.xfyun.cn/v2/open-ise'
    var host = 'ise-api.xfyun.cn'
    var apiKey = API_KEY
    var apiSecret = API_SECRET
    var date = new Date().toGMTString()
    var algorithm = 'hmac-sha256'
    var headers = 'host date request-line'
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/open-ise HTTP/1.1`
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
    var signature = CryptoJS.enc.Base64.stringify(signatureSha)
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
    var authorization = btoa(authorizationOrigin)
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
    resolve(url)
  })
}
class IseRecorder {
  constructor({ language, accent, appId } = {}) {
    let self = this
    this.status = 'null'
    this.language = language || 'zh_cn'
    this.accent = accent || 'mandarin'
    this.appId = appId || APPID
    // 记录音频数据
    this.audioData = []
    // 记录听写结果
    this.resultText = ''
    // wpgs下的听写结果需要中间状态辅助记录
    this.resultTextTemp = ''
    transWorker.onmessage = function (event) {
      self.audioData.push(...event.data)
    }
    $('.start-taste-left .ipt').text(`今天天气怎么样`)
  }

  // 修改录音听写状态
  setStatus(status) {
    this.onWillStatusChange && this.status !== status && this.onWillStatusChange(this.status, status)
    this.status = status
  }
  setResultText(setResultXml = '') {
    this.onTextChange && this.onTextChange(setResultXml || '')
  }
  // 修改听写参数
  setParams({ language, accent } = {}) {
    language && (this.language = language)
    accent && (this.accent = accent)
  }
  // 连接websocket
  connectWebSocket() {
    return getWebSocketUrl().then(url => {
      let iseWS
      if ('WebSocket' in window) {
        iseWS = new WebSocket(url)
      } else if ('MozWebSocket' in window) {
        iseWS = new MozWebSocket(url)
      } else {
        alert('浏览器不支持WebSocket')
        return
      }
      this.webSocket = iseWS
      this.setStatus('init')
      iseWS.onopen = e => {
        this.setStatus('ing')
        // 重新开始录音
        setTimeout(() => {
          this.webSocketSend()
        }, 500)
      }
      iseWS.onmessage = e => {
        this.result(e.data)
      }
      iseWS.onerror = e => {
        this.recorderStop()
      }
      iseWS.onclose = e => {
        this.recorderStop()
      }
    })
  }
  // 初始化浏览器录音
  recorderInit() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia
    
    // 创建音频环境
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.audioContext.resume()
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口')
        return
      }
    } catch (e) {
      if (!this.audioContext) {
        alert('浏览器不支持webAudioApi相关接口')
        return
      }
    }
    
    // 获取浏览器录音权限
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then(stream => {
          getMediaSuccess(stream)
        })
        .catch(e => {
          getMediaFail(e)
        })
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: true,
          video: false,
        },
        stream => {
          getMediaSuccess(stream)
        },
        function(e) {
          getMediaFail(e)
        }
      )
    } else {
      if (navigator.userAgent.toLowerCase().match(/chrome/) && location.origin.indexOf('https://') < 0) {
        alert('chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限')
      } else {
        alert('无法获取浏览器录音功能，请升级浏览器或使用chrome')
      }
      this.audioContext && this.audioContext.close()
      return
    }
    // 获取浏览器录音权限成功的回调
    let getMediaSuccess = stream => {
      console.log('getMediaSuccess')
      // 创建一个用于通过JavaScript直接处理音频
      this.scriptProcessor = this.audioContext.createScriptProcessor(0, 1, 1)
      this.scriptProcessor.onaudioprocess = e => {
        // 去处理音频数据
        if (this.status === 'ing') {
          transWorker.postMessage(e.inputBuffer.getChannelData(0))
        }
      }
      // 创建一个新的MediaStreamAudioSourceNode 对象，使来自MediaStream的音频可以被播放和操作
      this.mediaSource = this.audioContext.createMediaStreamSource(stream)
      // 连接
      this.mediaSource.connect(this.scriptProcessor)
      this.scriptProcessor.connect(this.audioContext.destination)
      this.connectWebSocket()
    }

    let getMediaFail = (e) => {
      alert('请求麦克风失败')
      console.log(e)
      this.audioContext && this.audioContext.close()
      this.audioContext = undefined
      // 关闭websocket
      if (this.webSocket && this.webSocket.readyState === 1) {
        this.webSocket.close()
      }
    }
  }
  recorderStart() {
    if (!this.audioContext) {
      this.recorderInit()
    } else {
      this.audioContext.resume()
      this.connectWebSocket()
    }
  }
  // 暂停录音
  recorderStop() {
    // safari下suspend后再次resume录音内容将是空白，设置safari下不做suspend
    if (!(/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgen))){
      this.audioContext && this.audioContext.suspend()
    }
    this.setStatus('end')
  }

  // 对处理后的音频数据进行base64编码
  toBase64(buffer) {
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }
  // 向webSocket发送数据
  webSocketSend() {
    if (this.webSocket.readyState !== 1) {
      return
    }
    let audioData = this.audioData.splice(0, 1280)
    var params = {
      common: {
        app_id: this.appId,
      },
      business: {
        category: 'read_sentence', // read_syllable/单字朗读，汉语专有 read_word/词语朗读  read_sentence/句子朗读 http://test.www.xfyun.cn/doc/Ise/IseAPI.html#%E6%8E%A5%E5%8F%A3%E8%B0%83%E7%94%A8%E6%B5%81%E7%A8%8B
        rstcd: 'utf8',
        group: 'pupil',
        sub: 'ise',
        ent: 'cn_vip',
        tte: 'utf-8',
        cmd: 'ssb',
        auf: 'audio/L16;rate=16000',
        aus: 1,
        aue: 'raw',
        text: '\uFEFF' + ($('.start-taste-left .ipt').val() || '今天天气怎么样')
      },
      data: {
        status: 0,
        encoding: 'raw',
        data_type: 1,
        data: ''
      },
    }
    this.webSocket.send(JSON.stringify(params))
    this.handlerInterval = setInterval(() => {
      // websocket未连接
      if (this.webSocket.readyState !== 1) {
        this.audioData = []
        clearInterval(this.handlerInterval)
        return
      }
      // 最后一帧
      if (this.audioData.length === 0) {
        if (this.status === 'end') {
          this.webSocket.send(
            JSON.stringify({
              business: {
                cmd: 'auw',
                aus: 4,
                aue: 'raw'
              },
              data: {
                status: 2,
                encoding: 'raw',
                data_type: 1,
                data: '',
              },
            })
          )
          this.audioData = []
          clearInterval(this.handlerInterval)
        }
        return false
      }
      audioData = this.audioData.splice(0, 1280)
      // 中间帧
      this.webSocket.send(
        JSON.stringify({
          business: {
            cmd: 'auw',
            aus: 2,
            aue: 'raw'
          },
          data: {
            status: 1,
            encoding: 'raw',
            data_type: 1,
            data: this.toBase64(audioData),
          },
        })
      )
    }, 40)
  }
  result(resultData) {
    // 识别结束
    let jsonData = JSON.parse(resultData)
    if (jsonData.data && jsonData.data.data) {
      let data = Base64.decode(jsonData.data.data)
      let grade = parser.parse(data, {
        attributeNamePrefix: '',
        ignoreAttributes: false
      })
      this.setResultText(grade)
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      this.webSocket.close()
    }
    if (jsonData.code !== 0) {
      this.webSocket.close()
      console.log(`${jsonData.code}:${jsonData.message}`)
    }
  }
  start() {
    this.recorderStart()
    this.setResultText()
    $('.accuracy_score').text(0)
    $('.emotion_score').text(0)
    $('.fluency_score').text(0)
    $('.integrity_score').text(0)
    $('.phone_score').text(0)
    $('.tone_score').text(0)
    $('.total_score').text(0)
  }
  stop() {
    this.recorderStop()
  }
}

// ======================开始调用=============================
var vConsole = new VConsole()
let iseRecorder = new IseRecorder()
let countInterval
// 状态改变时处罚
iseRecorder.onWillStatusChange = function(oldStatus, status) {
  // 可以在这里进行页面中一些交互逻辑处理：倒计时（听写只有60s）,录音的动画，按钮交互等
  // 按钮中的文字
  let text = {
    null: '开始识别', // 最开始状态
    init: '开始识别', // 初始化状态
    ing: '结束识别', // 正在录音状态
    end: '开始识别', // 结束状态
  }
  let senconds = 0
  $('.taste-button')
    .removeClass(`status-${oldStatus}`)
    .addClass(`status-${status}`)
    .text(text[status])
  if (status === 'ing') {
    $('hr').addClass('hr')
    $('.taste-content').hide()
    $('.start-taste').addClass('flex-display-1')
    // 倒计时相关
    countInterval = setInterval(()=>{
      senconds++
      $('.used-time').text(`0${Math.floor(senconds/60)}：${Math.floor(senconds/10)}${senconds%10}`)
      if (senconds >= 60) {
        this.stop()
        clearInterval(countInterval)
      }
    }, 1000)
  } else if (status === 'init') {
    $('.start-taste-right').show()
    $('.used-time').text('00：00')
  } else {
    $('.start-taste-right').hide()
    $('.taste-content').show()
    $('hr').removeClass('hr')
    clearInterval(countInterval)
  }
}
// 监听识别结果的变化
iseRecorder.onTextChange = function(grade) {
  $('.accuracy_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.accuracy_score)
  $('.emotion_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.emotion_score)
  $('.fluency_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.fluency_score)
  $('.integrity_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.integrity_score)
  $('.phone_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.phone_score)
  $('.tone_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.tone_score)
  $('.total_score').text(grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.total_score)
  let sentence = grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.sentence?.word || grade?.xml_result?.read_sentence?.rec_paper?.read_sentence?.sentence || []
  let resultStr = ''
  sentence.forEach(item => {
    if (item?.word) {
      item.word.forEach(wt => {
        let flag = false
        if (wt.syll?.phone) {
          flag = wt.syll.phone.some(pt => pt?.perr_msg != 0)
        } else {
          wt.syll.forEach(st => {
            if (Array.isArray(st?.phone)) {
              flag = st.phone.some(pt => pt?.perr_msg != 0)
            }
          })
        }
        if (flag) {
          resultStr += `<span class="err">${wt.content}</span>`
        } else {
          resultStr += wt.content
        }
      })
    } else if (item?.syll) {
      let flag = false
      if (item.syll?.phone) {
        flag = item.syll.phone.some(pt => pt?.perr_msg != 0)
      } else {
        item.syll.forEach(st => {
          if (Array.isArray(st?.phone)) {
            flag = st.phone.some(pt => pt?.perr_msg != 0)
          }
        })
      }
      if (flag) {
        resultStr += `<span class="err">${item.content}</span>`
      } else {
        resultStr += item.content
      }
    }
  })
  resultStr && $('.right .title').show()
  $('.output-box .right .result').html(resultStr)
}
$('#taste_button, .taste-button').click(function() {
  if (iseRecorder.status === 'ing') {
    iseRecorder.stop()
  } else {
    iseRecorder.start()
  }
})
