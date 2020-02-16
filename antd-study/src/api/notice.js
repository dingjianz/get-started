import ajax from '../service'

export const fetchNoticeListApi = () => {
  return ajax.post('/api/v1/noticeList')
}