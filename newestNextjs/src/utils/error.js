import config from 'config';

/**
 * 前端重新封装状态吗，对接口错误进行归类方便前端处理
 * 100 普通服务器端错误，直接将错误信息弹框显示
 * 101 登录超时，跳转到登录页重新登录
 * 200 普通客户端校验，正常显示错误信息
 */

/**
 * 展示错误信息
 * @param code 错误码
 * @param msg 错误信息
 */
export function showErrorMsg(error) {
  const { code, msg } = error;
  console.log(error, code, msg);
  if (code === 100) {
    // 普通服务器端错误，直接将错误信息弹框显示
    // message.error(msg, 2);
  } else if (code === 101) {
    // 登录超时，跳转到登录页重新登录
    // message.warning(msg, 2, () => {
    window.location.href = `${config.PASSPORT}?jump=${decodeURIComponent(window.location.href)}`;
    // });
  } else if (code === 200) {
    // 普通客户端校验，正常显示错误信息
    // message.error(msg, 2);
  } else {
    // message.error(error.msg || error, 2);
  }
}

/**
 *  初始化服务器端返回错误信息 (服务器端错误统一1XX)
 * @param error 服务器返回错误信息
 * @returns {{code: number, msg}} 封装后错误信息
 */
export function initServerError(error) {
  const { response, request } = error;
  if (request.status === 0) {
    return {
      code: 100,
      msg: '服务器开小差了~稍后再试',
    };
  }
  // 判断如果是401错误 直接跳转至登录页
  if (response.status === 401) {
    return {
      code: 101,
      msg: '登录超时，请重新登录',
    };
  }
  return {
    code: 100,
    msg: '服务器开小差了~稍后再试',
  };
}

/**
 * 初始前端验证返回错误信息 (客户端错误统一2XX)
 * @param coded 错误码 默认200
 * @param msg 需要提示给用户的错误信息
 * @param detail 详细信息
 * @returns {{code: number, msg: *, detail: Object}} 封装后错误信息
 */
export function initValidate({ code, msg, detail }) {
  return {
    code: code || 200,
    msg,
    detail,
  };
}

/**
 * 初始化客户端返回错误信息 (客户端错误统一2XX)
 * @param error 接口抛出异常时的错误信息
 * @returns {Promise.<*>} 封装后错误信息
 */
export function initClientError(error) {
  return Promise.reject(initValidate({ msg: error.desc, detail: error }));
}
