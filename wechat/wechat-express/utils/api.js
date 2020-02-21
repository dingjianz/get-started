// 地址前缀
const prefix = 'https://api.weixin.qq.com/cgi-bin/'

module.exports = {
  accessToken: `${prefix}token?grant_type=client_credential`,
  jsApiTicket: `${prefix}ticket/getticket?type=jsapi`,
  menu: {
    create: `${prefix}menu/create?`,
    delete: `${prefix}menu/delete?`
  }
}