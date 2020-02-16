// 在实际的项目中，由于只有单一的store，但是状态会有很多分类，所以我们需要划分reducer，createStore的参数又只接收一个reducer，所以，redux比较聪明的提供了一个用于合并多个reducer的方法。注意：不要手动合并
import { combineReducers } from 'redux'

// 逐一引入 reducer
import cartReducer from './cartReducer'
import blogReducer from './blogReducer'

// 触发一个action, 所有的reducer都会接收到

// 导出合并后的reducer
export default combineReducers({
  // 把多个reducer作为combineReducers的参数传入，在外部就可以通过 store.getState().cartReducer来获取cartReducer里面的state
  cartReducer,
  blogReducer
})