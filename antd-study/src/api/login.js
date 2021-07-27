import ajax from '../service';

// eslint-disable-next-line import/prefer-default-export
export const loginApi = (params) => {
  return ajax.post('/api/v1/login', params);
};
