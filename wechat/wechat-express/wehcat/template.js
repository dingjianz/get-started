// 用来加工最终回复用户消息的模板
module.exports = option => {
  let replyMessage = `
    <xml>
      <ToUserName><![CDATA[${option.toUserName}]]></ToUserName>
      <FromUserName><![CDATA[${option.fromUserName}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[${option.msgType}]]></MsgType>`

  if (option.msgType === 'text') {
    replyMessage += `<Content><![CDATA[${option.content}]]></Content>`
  } else if (option.msgType === 'image') {
    replyMessage += `
      <Image>
        <MediaId><![CDATA[${option.mediaId}]]></MediaId>
      </Image>`
  } else if (option.msgType === 'voice') {
    replyMessage += `
      <Voice>
        <MediaId><![CDATA[${option.mediaId}]]></MediaId>
      </Voice>`
  } else if (option.msgType === 'video' || option.msgType ===  'shortvideo') {
    replyMessage += `
      <Video>
        <MediaId><![CDATA[${option.mediaId}]]></MediaId>
        <Title><![CDATA[${option.title}]]></Title>
        <Description><![CDATA[${option.description}]]></Description>
      </Video>`
  } else if (option.msgType === 'music') {
    replyMessage += `
      <Music>
        <Title><![CDATA[${option.title}]]></Title>
        <Description><![CDATA[${option.description}]]></Description>
        <MusicUrl><![CDATA[${option.musicUrl}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${option.hqMusicUrl}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${option.mediaId}]]></ThumbMediaId>
      </Music>`
  } else if (option.msgType === 'news') {
    replyMessage += `
      <ArticleCount>${option.content.length}</ArticleCount><Articles>`
      option.content.forEach(item => {
        replyMessage += `<item>
          <Title><![CDATA[${item.title}]]></Title>
          <Description><![CDATA[${item.description}]]></Description>
          <PicUrl><![CDATA[${item.picUrl}]]></PicUrl>
          <Url><![CDATA[${item.url}]]></Url>
        </item>`
      })
    replyMessage += '</Articles>'
  }

  // 最终回复给用户的xml数据
  return replyMessage + '</xml>'
}