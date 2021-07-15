import axios from 'axios';

export const uploadImg = (params) => {
  return axios.post('http://up.imgapi.com', params);
};
export const testApi = () => {
  return axios.get('http://127.0.0.1:8010');
};
