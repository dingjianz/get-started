import actionTypes from './actionTypes'

const addCountAction = (num = 1) => {
  console.log(num)
  return {
    type: actionTypes.ADD_COUNT,
    payload: {
      num
    }
  }
}

const reduceCountAction = (num = 1) => {
  return {
    type: actionTypes.REDUCE_COUNT,
    payload: {
      num
    }
  }
}

export {
  addCountAction,
  reduceCountAction
}