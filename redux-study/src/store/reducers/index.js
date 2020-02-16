import { combineReducers } from 'redux'

import cartReducer from './cartReducer'

// 触发一个action， 所有的reducer都会接收到
export default combineReducers({
  cartReducer
})