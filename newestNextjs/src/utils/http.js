import axios from 'axios';
import { initServerError, initValidate, initClientError } from './error';

axios.defaults.baseURL = '/';
// 超时时间15s
axios.defaults.timeout = 15000;
// Ajax请求
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => {
    const result = response.data || {};
    if (result.code !== 0) {
      // TODO 异常处理逻辑根据项目实际情况调整
      if (result.code === 90000) {
        return Promise.reject(initValidate({ code: 101, msg: result.desc, detail: result }));
      }
      return initClientError(result);
    }
    return result.data;
  },
  (err) => {
    return Promise.reject(initServerError(err));
  }
);

export default axios;
