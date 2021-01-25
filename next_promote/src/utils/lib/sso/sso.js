/**
 * Created by lycheng on 2018/7/13.
 *  - v1.2.1 2018-12-27 添加手机快捷登录
 *  - v1.1.1 2018-07-17 至 2018-11-28  账号密码登录
 */

import { envConfig } from 'sso-config';
import './gt';
import { Base64 } from 'js-base64';
import md5 from 'md5-js';

const SSO = (window.SSO = {
  conf: {
    url: envConfig.AUTH_SITE + 'SSOService',
  },
  state: {
    // 记录用户提交登录的参数信息
    loginInfo: {},
  },
  // 初始化用户登录标示（获取服务端cookies种到本地）
  initCookies(callback) {
    SSO.utils.sendJSONP('/login/getcookies', {}, callback);
  },
  init() {
    // 去除地址栏中的token/account_id/accountId/ssoSessionId
    window.history.replaceState(
      {},
      '',
      SSO.utils.setQueryString({
        token: '',
        account_id: '',
        accountId: '',
        ssoSessionId: '',
      })
    );
  },
  /**
   * 登录接口
   * @param accountName 用户名
   * @param accountPwd 密码
   * @param isAct 是否记住密码
   * @param jump 登录成功后的回跳
   * @param websiteName 用于对未激活账号跳转到激活页面
   * @param loginErrorCallback 登录失败后的回调函数
   * @param loginSuccessCallback 登录成功后的回调函数；默认刷新页面
   * @param loginActiveCallback 未激活账号的回调函数；默认跳转到激活页
   */
  login(
    { accountName, accountPwd, isAct = false, jump = Base64.encode(window.location.href), websiteName = 'xfyun' },
    loginErrorCallback,
    loginSuccessCallback,
    loginActiveCallback
  ) {
    // 登录结果回调，该回调由 loginJSONPCallback 执行
    loginErrorCallback && (SSO.utils.loginErrorCallback = loginErrorCallback);
    SSO.state.loginSuccessCallback = loginSuccessCallback;
    SSO.state.loginActiveCallback = loginActiveCallback;
    SSO.state.loginInfo = {
      accountName,
      accountPwd,
      isAct,
      jump,
      websiteName,
    };
    // 判断是否需要验证码
    SSO.utils.sniffCaptcher(accountName, function (resultSC) {
      if (resultSC.code === 0 && resultSC.data) {
        SSO.utils.geeTestVerifyCallback = SSO.utils.login;
        if (SSO.state.captchaObj) {
          SSO.state.captchaObj.verify();
        } else {
          SSO.utils.getGeeTestInfo();
        }
      } else {
        SSO.utils.login({});
      }
    });
  },
  mobileLogin(
    { countryCode = '86', mobile, verifyCode, jump = Base64.encode(window.location.href), isAct = false },
    loginErrorCallback,
    loginSuccessCallback
  ) {
    SSO.state.loginInfo = {
      countryCode,
      mobile,
      verifyCode,
      jump,
      isAct,
    };
    loginErrorCallback && (SSO.utils.loginErrorCallback = loginErrorCallback);
    SSO.state.loginSuccessCallback = loginSuccessCallback;
    SSO.utils.ajax(
      `${SSO.conf.url}/login/phone-quick-login`,
      {
        countryCode,
        mobile,
        verifyCode,
        jump,
        isAct,
      },
      'get',
      SSO.utils.loginJSONPCallback
    );
  },
  /**
   * 退出登录
   * @param loggedOutCallback 退出后的回调函数
   */
  logout(loggedOutCallback) {
    loggedOutCallback && (SSO.utils.loggedOutCallback = loggedOutCallback);
    SSO.utils.sendJSONP('/login/do-logout', {
      callback: 'SSO.utils.logoutJSONPCallback',
      ssoSessionId: SSO.utils.getCookie('ssoSessionId'),
      isJsonp: 'true',
    });
  },
  /**
   * 获取用户信息
   * @param userInfoJSONPCallback 获取用户信息后的回调函数
   */
  getUserInfo(userInfoJSONPCallback) {
    SSO.utils.userInfoJSONPCallback = userInfoJSONPCallback;
    SSO.utils.sendJSONP('/login/get-user', {
      callback: 'SSO.utils.userInfoJSONPCallback',
      ssoSessionId: SSO.utils.getCookie('ssoSessionId'),
      account_id: SSO.utils.getCookie('account_id'),
    });
  },
  getMobileCode({ countryCode = '86', mobile }, callback) {
    SSO.state.mobileLoginInfo = {
      countryCode,
      mobile,
    };
    SSO.utils.getMobileCodeCallback = callback;
    SSO.utils.geeTestVerifyCallback = SSO.utils.getMobileCode;
    if (SSO.state.captchaObj) {
      SSO.state.captchaObj.verify();
    } else {
      SSO.utils.getGeeTestInfo();
    }
  },
  utils: {
    /**
     * 登录
     * @param resultGT 极验的结果，没有说明极验错误，为{}说明不需要验证码
     */
    login: (resultGT) => {
      if (!resultGT) {
        SSO.utils.loginErrorCallback({
          code: -1,
          desc: '验证组件初始化失败',
          data: '',
          flag: false,
        });
        return;
      }
      let loginInfo = SSO.state.loginInfo;
      SSO.utils.ajax(
        `${SSO.conf.url}/login/check-account`,
        {
          geetest_challenge: resultGT.geetest_challenge,
          geetest_validate: resultGT.geetest_validate,
          geetest_seccode: resultGT.geetest_seccode ? Base64.encode(resultGT.geetest_seccode) : '',
          isMd5: 'true',
          isJsonp: 'ture',
          accountName: encodeURIComponent(loginInfo.accountName),
          accountPwd: md5(loginInfo.accountPwd),
          isAct: loginInfo.isAct,
        },
        'post',
        SSO.utils.loginJSONPCallback
      );
    },

    getMobileCode: (resultGT) => {
      let mobileLoginInfo = SSO.state.mobileLoginInfo;
      if (!resultGT) {
        SSO.utils.loginErrorCallback({
          code: -1,
          desc: '验证组件初始化失败',
          data: '',
          flag: false,
        });
        return;
      }
      SSO.utils.ajax(
        `${SSO.conf.url}/mobile/send-verify-code`,
        {
          countryCode: mobileLoginInfo.countryCode,
          mobile: mobileLoginInfo.mobile,
          geetest_challenge: resultGT.geetest_challenge,
          geetest_validate: resultGT.geetest_validate,
          geetest_seccode: resultGT.geetest_seccode ? Base64.encode(resultGT.geetest_seccode) : '',
        },
        'post',
        (result) => {
          SSO.utils.getMobileCodeCallback && SSO.utils.getMobileCodeCallback(result);
        }
      );
    },
    /**
     * 通过用户名判断是否需要验证码
     * @param accountName 用户名
     * @param sniffCaptchaCallback
     */
    sniffCaptcher(accountName, sniffCaptchaCallback) {
      SSO.utils.sniffCaptchaCallback = sniffCaptchaCallback;
      SSO.utils.sendJSONP('/login/if-captcha', {
        callback: 'SSO.utils.sniffCaptchaJSONPCallback',
        accountName: accountName,
        isJsonp: 'true',
      });
    },
    /**
     * 获取极验信息
     */
    getGeeTestInfo: () => {
      SSO.utils.sendJSONP('/login/gee-captcha', {
        callback: 'SSO.utils.geeTestJSONPCallback',
        isJsonp: 'ture',
      });
    },
    getCookie: (key) => {
      return document.cookie
        .split(';')
        .map((x) => (x.indexOf(key) > -1 ? x : ''))
        .join('')
        .split(key + '=')[1];
    },
    /**
     * 设置SSO的cookie
     * safari下不支持第三方cookie，必须使用浏览器顶级窗口打开才能种上
     * @param ssoSessionId
     * @param account_id
     * @param jump 种上cookie后的回跳，登录的时候传过来的
     */
    setSSOCookie: (ssoSessionId, accountId, jump = SSO.state.loginInfo.jump) => {
      let queryJson = {
        callback: '',
        ssoSessionId,
        account_id: accountId,
        isJsonp: 'false',
        url: jump,
      };
      // safari下不支持第三方cookie
      window.location.href = SSO.utils.setQueryString(queryJson, SSO.conf.url + '/login/setcookies');
    },
    setLocalCookie: (ssoSessionId, accountId) => {
      document.cookie = `ssoSessionId=${ssoSessionId}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
      document.cookie = `account_id=${accountId}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    },
    sniffCaptchaCallback: () => {
      // 显示验证码钩子函数
    },
    loginErrorCallback: () => {
      // 登录失败后的回调函数
    },
    loggedOutCallback: () => {
      // 默认退出回调
      window.location.reload();
    },
    userInfoCallback: () => {
      // 获取用户信息回调
    },
    // 极验验证成功后调用
    geeTestVerifyCallback: () => {},
    loginJSONPCallback: (result) => {
      let data = result.data;
      if (result.code === 0) {
        SSO.utils.setLocalCookie(data.ssoSessionId, data.account_id);
        if (data.isAct === '0') {
          let loginActiveCallback = SSO.state.loginActiveCallback;
          // 账号未激活
          SSO.getUserInfo(function (result) {
            let userInfo = result.data;
            let loginInfo = SSO.state.loginInfo;
            if (loginActiveCallback) {
              userInfo.ssoSessionId = data.ssoSessionId;
              userInfo.account_id = data.account_id;
              loginActiveCallback(result);
            } else {
              window.location.href =
                `${envConfig.PASSPORT}sendmail?` +
                `email=${userInfo.email}` +
                `&jump=${loginInfo.jump}` +
                `&ssoSessionId=${data.ssoSessionId}` +
                `&account_id=${data.account_id}`;
            }
          });
        } else {
          // 账号已经激活
          let loginSuccessCallback = SSO.state.loginSuccessCallback;
          if (loginSuccessCallback) {
            loginSuccessCallback(result, function () {
              SSO.utils.setSSOCookie(data.ssoSessionId, data.account_id);
            });
          } else {
            SSO.utils.setSSOCookie(data.ssoSessionId, data.account_id);
          }
        }
      } else {
        // 登录是失败
        SSO.utils.loginErrorCallback(result);
      }
    },
    sniffCaptchaJSONPCallback: (result) => {
      SSO.utils.sniffCaptchaCallback(result);
    },
    logoutJSONPCallback: (ssoSessionId) => {
      SSO.utils.setLocalCookie(ssoSessionId, '');
      SSO.utils.loggedOutCallback();
    },
    // 获取用户信息后的回调
    userInfoJSONPCallback: (result) => {
      SSO.utils.userInfoCallback(result);
    },
    // 极验回调
    geeTestJSONPCallback: (result) => {
      if (result.code === 0) {
        let data = result.data;
        initGeetest(
          {
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: true,
            product: 'bind',
          },
          (captchaObj) => {
            captchaObj
              .onReady(function () {
                SSO.state.captchaObj.verify();
              })
              .onSuccess(() => {
                SSO.utils.geeTestVerifyCallback(captchaObj.getValidate());
              })
              .onError(function () {
                SSO.utils.geeTestVerifyCallback();
              });
            SSO.state.captchaObj = captchaObj;
          }
        );
      }
    },
    /**
     * 设置地址栏中的参数
     * @param queryObj
     * @param url
     * @returns {string}
     */
    setQueryString: (queryObj, url) => {
      url = url || window.location.href;
      let urlArr = url.split('?');
      let searchArr = [];
      let searchItem;
      let searchObj = {};
      let queryStr = '';
      if (urlArr.length > 1) {
        searchArr = urlArr[1].split('&');
      }
      for (let i = 0; i < searchArr.length; i++) {
        try {
          searchItem = searchArr[i].split('=');
          searchObj[searchItem[0]] = searchItem[1];
        } catch (e) {}
      }
      for (let p in queryObj) {
        searchObj[p] = queryObj[p];
      }
      for (let p in searchObj) {
        if (searchObj[p]) {
          queryStr += `&${p}=${searchObj[p]}`;
        }
      }
      queryStr = queryStr.replace('&', '?');
      return urlArr[0] + queryStr;
    },
    sendJSONP: (url, queryJson, callback) => {
      queryJson = queryJson || {};
      queryJson._ = new Date().getTime();
      const script = document.createElement('script');
      script.src = SSO.utils.setQueryString(queryJson, SSO.conf.url + url);
      document.head.appendChild(script);
      script.onload = function () {
        callback && callback();
        document.head.removeChild(script);
      };
    },
    ajax: (url, data, method, success) => {
      // 异步对象
      var ajax = new XMLHttpRequest();
      var ajaxData = `_=${new Date().getTime()}`;
      if (data) {
        for (var p in data) {
          ajaxData += `&${p}=${data[p]}`;
        }
      }
      // get 跟post  需要分别写不同的代码
      if (method === 'get') {
        // get请求
        if (data) {
          // 如果有值
          url += '?';
          url += ajaxData;
        } else {
        }
        // 设置 方法 以及 url
        ajax.open(method, url);

        // send即可
        ajax.send();
      } else {
        ajax.open(method, url);

        // 需要设置请求报文
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        // 判断data send发送数据
        if (ajaxData) {
          // 如果有值 从send发送
          ajax.send(ajaxData);
        } else {
          // 木有值 直接发送即可
          ajax.send();
        }
      }

      // 注册事件
      ajax.onreadystatechange = function () {
        // 在事件中 获取数据 并修改界面显示
        if (ajax.readyState === 4 && ajax.status === 200) {
          try {
            success(JSON.parse(ajax.responseText));
          } catch (e) {
            success(ajax.responseText);
          }
        }
      };
    },
  },
});
SSO.init();
export default SSO;
