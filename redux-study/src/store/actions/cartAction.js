import actionType from './actionType'

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
