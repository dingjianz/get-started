module.exports = option => {
  let replyMessage = `
    <xml>
      <ToUserName><![CDATA[${option.toUserName}]]></ToUserName>
      <FromUserName><![CDATA[${option.fromUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[${option.msgType}]]></MsgType>
      <MsgId>${option.msgId}</MsgId>`
      
  if (option.msgType === 'text') {
    replyMessage += `<Content><![CDATA[${content}]]></Content>`

  } else if (option.msgType === 'image') {
    replyMessage += `
    <PicUrl><![CDATA[${option.picUrl}]]></PicUrl>
    <MediaId><![CDATA[${option.mediaId}]]></MediaId>`

  } else if (option.msgType === 'voice') {
    replyMessage += `
    <MediaId><![CDATA[${option.mediaId}]]]></MediaId>
    <Format><![CDATA[${option.forMat}]]></Format>`

  } else if (option.msgType === 'video' || option.msgType === 'shortvideo') {
    replyMessage += `
      <MediaId><![CDATA[${option.mediaId}]]></MediaId>
      <ThumbMediaId><![CDATA[${option.thumbMediaId}]]></ThumbMediaId>`

  } else if (option.msgType === 'location') {
    replyMessage += `
      <Location_X>${option.localtionX}</Location_X>
      <Location_Y>${option.localtionY}</Location_Y>
      <Scale>${option.scale}</Scale>
      <Label><![CDATA[${option.label}]]></Label>`

  } else if (option.msgType === 'link') {
    replyMessage += `
      <Title><![CDATA[${option.title}]]></Title>
      <Description><![CDATA[${option.description}]]></Description>
      <Url><![CDATA[${option.url}]]></Url>`

  }
  return replyMessage + '</xml>'
}