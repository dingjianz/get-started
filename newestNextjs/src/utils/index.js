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
 */
const getQueryString = (name, search = window.location.search) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

export { arrayToKV, getQueryString };
