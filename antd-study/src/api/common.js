import axios from 'axios'

export const uploadImg = (params) => {
  return axios.post('http://up.imgapi.com', params)
}