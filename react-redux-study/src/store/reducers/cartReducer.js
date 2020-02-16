// 为了避免 actionType重复，一般会把actionType放在一个文件里面进行统一管理，也可以避免actionType写错
import actionType from '../actions/actionType'

// 对于购物车项目来说，这里面有一个初始化的状态
const initState = [{
  id:1,
  title:'Apple',
  price:8888.66,
  amount: 10
}, {
  id:2,
  title:'Orange',
  price:4444.56,
  amount: 14
}]

// 创建购物车的reducer，reducer的固定写法是两个参数，第一个就是state并有一个初始值，第二个是action
export default (state = initState, action) => {
  // 根据不同的action.type，做出不同处理，每次返回一个新的state，返回的类型要一样
  switch (action.type) {
    case actionType.CART_AMOUNT_INCREMENT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.amount +=1
        }
        return item
      })
    case actionType.CART_AMOUNT_DECREMENT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          item.amount -=1
        }
        return item
      })
    // 一定要有default，当actionType不对的时候，就不做任何的处理，返回上一次的state
    default:
      return state
  }
}