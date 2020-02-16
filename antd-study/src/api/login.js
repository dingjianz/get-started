import ajax from '../service'

export const loginApi = (params) => {
  return ajax.post('/api/v1/login', params)
}