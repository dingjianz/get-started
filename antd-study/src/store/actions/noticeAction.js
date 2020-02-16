import actionTypes from './actionType'
import { fetchNoticeListApi } from '../../api/notice'

const startNotice = () => {
  return {
    type: actionTypes.START_NOTICE_POST
  }
}
const endNotice = () => {
  return {
    type: actionTypes.END_NOTICE_POST
  }
}

// 标记已读
export const noticeRead = (id, readType = null) => dispatch => {
  dispatch(startNotice())
  // 模拟服务端异步请求
  setTimeout(() => {
    dispatch({
      type: actionTypes.NOTICE_READ,
      payload: {
        id,
        readType 
      }
    })
    dispatch(endNotice())
  }, 1200)
}

// 获取notice消息列表
export const fetchNoticeList = () => dispatch => {
  dispatch(startNotice())
  fetchNoticeListApi().then(res => {
    dispatch({
      type: actionTypes.FETCH_NOTICE_LIST,
      payload: {
        list: res.list
      }
    })
  })
  dispatch(endNotice())
}