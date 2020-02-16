//封装操作localstorage本地存储的方法
let $localStorage = {
  set(key, value) { //存储
    window.localStorage.setItem(key, JSON.stringify(value))
  },

  get(key) { // //取出数据
    return JSON.parse(window.localStorage.getItem(key))
  },

  remove(key) { // 删除数据
    window.localStorage.removeItem(key)
  }
}

//封装操作sessionStorage本地存储的方法
let $sessionStorage = {
  set(key, value) { //存储
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },

  get(key) { // //取出数据
    return JSON.parse(window.sessionStorage.getItem(key))
  },

  remove(key) { // 删除数据
    window.sessionStorage.removeItem(key)
  }
}
// 暴露给外部访问
export {
  $localStorage,
  $sessionStorage
}