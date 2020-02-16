import axios from 'axios'
import { message } from 'antd'

const isDev = process.env.NODE_ENV === 'development'

const whiteList = ['/api/v1/login']

const ajax = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/242697' : ''
})

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