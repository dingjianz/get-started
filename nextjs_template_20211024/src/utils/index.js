/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable prefer-rest-params */

/**
 * 将数组装换成key-value对象
 * 与arrayToObject的区别在于value不指定时的操作
 * @param {*} arr
 * @param {*} key
 * @param {*} value
 */
const arrayToKV = (arr, key, value) => {
  const kv = {};
  for (let i = 0; i < arr?.length; i += 1) {
    kv[arr[i][key]] = value ? arr[i][value] : arr[i];
    kv[arr[i][key]].index = i;
  }
  return kv;
};

/**
 * 获得地址栏中指定参数名称的参数值
 * @param {*} name
 * @param {*} search
 * @returns
 */
const getQueryString = (name, search = window.location.search) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

/**
 * 截流函数，默认500ms
 * @param {*} fn
 * @param {*} interval
 * @returns
 */
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
};

/**
 * 函数防抖（debounce）
 * @param {*} func
 * @param {*} interval
 * @returns
 */
const debounce = (func, interval) => {
  let timer;
  return function () {
    const args = arguments; // arguments中存着e
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, interval || 500);
  };
};

/**
 * 数组去重
 * @param {*} arr
 */
const unique = (arr) => {
  return Array.from(new Set(arr));
};

export { arrayToKV, getQueryString, throttle, debounce, unique };
