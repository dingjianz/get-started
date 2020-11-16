import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const whiteList = ['/api/v1/login']

axios.defaults.timeout = 5000
axios.defaults.withCredentials = true //允许跨越时携带cookie并不是加上就能跨域
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const ajax = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/242697' : ''
})

// console.log(document.cookie)

ajax.interceptors.request.use(config => {
  if (!whiteList.includes(config.url)) {
    config.data = {
      ...config.data,
      authToken: window.localStorage.getItem('authToken') || 'textToken'
    }
  }
  return config
})

ajax.interceptors.response.use(resp => {
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    // 全局处理错误
    message.error(resp.data.errMsg)
  }
})

export default ajax