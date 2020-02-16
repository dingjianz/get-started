import actionType from './actionType'

/* 
  action有两种写法：
    【第一种】写成一个对象，这是标准的action，但是问题是不方便传递动态参数
    export const incrementAmount = {
      type: actionType.CART_AMOUNT_INCREMENT,
      payload: {
        id：4
      }
    }

    【第二种】在工作中，常用的一种方式是使用actionCreator，它是一个方法，返回一个对象，这个对象才是真正的action
*/

export const incrementAmount = (id) => {
  return  {
    type: actionType.CART_AMOUNT_INCREMENT,
    payload: {
      id
    }
  }
}


export const decrementAmount = (id) => {
  return {
    type: actionType.CART_AMOUNT_DECREMENT,
    payload: {
      id
    }
  }
}

// 异步action，使用redux-thunk之后，就可以在actionCreator里 return一个方法，参数就是dispatch

/*
  export const decrementAmountAsync = (id) => { // 异步action
  return dispatch => {
    setTimeout(() => {
      dispatch(decrementAmount(id))
    }, 2000)
  }
}
*/

export const decrementAmountAsync = id => dispatch =>{ // 异步action
  setTimeout(() => {
    dispatch(decrementAmount(id))
  }, 2000)
}
