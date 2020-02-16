import { combineReducers } from 'redux'

import noticeReducer from './noticeReducer'
import userReducer from './userReducer'

export default combineReducers({
  noticeReducer,
  userReducer
})