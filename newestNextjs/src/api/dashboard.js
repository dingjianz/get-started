import http from '@utils/http';

const getDashboardList = () => http.get('/api/v1/dashboard');
const getDashboardDetail = () => http.get(`/api/v1/getdetail`);

export { getDashboardList, getDashboardDetail };
