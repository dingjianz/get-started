import 'babel-polyfill'
var cookie = {
  get: function (key) {
    if (key === undefined) {
      return document.cookie
    }
    var cookies = document.cookie.split('; ')
    for (var i = 0, len = cookies.length; i < len; i++) {
      var nv = cookies[i].split('=')
      if (nv[0] === escape(key)) {
        return unescape(nv[1])
      }
    }
    return null
  },
  set: function (key, value, params) {
    params = params || ''
    if (key === undefined) {
      Error.parameterNull('document.setCookie', 'key')
    }
    if (value === undefined) {
      Error.parameterNull('document.setCookie', 'value')
    }
    var str = escape(key) + '=' + escape(value)

    var date = new Date()
    date.setMonth(date.getMonth() + 1)
    str += ';expires=' + date.toGMTString() + params
    document.cookie = str
  },
  pureSet: function (key, value, exp) {
    if (key === undefined) {
      Error.parameterNull('document.setCookie', 'key')
    }
    if (value === undefined) {
      Error.parameterNull('document.setCookie', 'value')
    }
    var str = escape(key) + '=' + escape(value)
    str += ';expires=' + exp
    document.cookie = str
  },
  clear: function (key, params) {
    var cookieDate = new Date()
    cookieDate.setTime(-1000)
    params = params || ''
    document.cookie = `${key}='';expires=${cookieDate.toGMTString()}${params}`
  }
}
export {
  cookie
}
