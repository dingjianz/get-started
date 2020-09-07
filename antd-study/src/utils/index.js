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

// 截流函数 默认500ms
const throttle = (fn, interval) => {
  const __self = fn;
  let timer;
  let firstTime = true;
  return function () {
    const args = arguments;
    const __me = this;
    if (firstTime) {
      __self.apply(__me, args);
      return (firstTime = false);
    }
    if (timer) {
      return false;
    }
    timer = setTimeout(function () {
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);
  };
}

// 函数防抖（debounce） https://www.cnblogs.com/cc-freiheit/p/10827372.html
const debounce = (func, interval) => {
  let timer;
  return function() {
    let args = arguments; // arguments中存着e
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, interval || 500)
  }
}

// 暴露给外部访问
export {
  $localStorage,
  $sessionStorage,
  throttle,
  debounce
}