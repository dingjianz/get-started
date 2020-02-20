// 处理用户发送的消息类型和内容，决定返回不同的内容给用户
module.exports = (message) => {
  const option = {
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName,
    createTime: message.CreateTime,
    msgType: message.MsgType
  }
  let content = '您在说什么？我听不懂啊T_T'
  // 判断用户发送的消息是否是文本消息
  if (message.MsgType === 'text') {
    // 判断用户发送的消息内容具体是什么
    if (message.Content === '1') { // 全匹配
      content = '大吉大利，今晚吃鸡'
    } else if (message.Content === '2') { // 全匹配
      content = '落地成盒，下次努力'
    } else if (message.Content.includes('爱')) { // 半匹配
      content = '我爱你宝贝🌹'
    } else if (message.Content.match('恨')) { // 半匹配
      content = '我恨你，因为你吃了我的奶酪🧀'
    }
    
  } else if (message.MsgType === 'image') {
    option.mediaId = message.MediaId
    // console.log({
    //   PicUrl: message.PicUrl
    // })

  } else if (message.MsgType === 'voice') {
    option.mediaId = message.MediaId
    // console.log({
    //   Recognition: message.Recognition
    // })

  } else if (message.MsgType === 'lo cation') {
    content = `维度：${message.Location_X}， 经度：${message.Location_Y}，缩放大小：${message.Scale}，位置信息：${message.Label}`

  } else if (message.MsgType === 'event') {
    if (message.Event === 'subscribe') { // 用户订阅事件
      content = '欢迎您的关注~'
      if (message.EventKey) content = '用户扫描带参数的二维码关注事件'

    } else if (message.Event === 'unsubscribe') { // 用户取消订阅，已经收不到发送的信息
      console.log('取消订阅')
    } else if (message.Event === 'SCAN') {
      content = '用户已经关注过，再扫描带参数的二维码关注事件'

    } else if (message.Event === 'LOCATION') {
      content = `维度：${message.Latitude}， 经度：${message.Longitude}，位置精度：${message.Precision}`
    } else if (message.Event === 'CLICK') {
      content = `您点击了按钮：${message.EventKey}`
    }
  }
  option.content = content
  return option
}