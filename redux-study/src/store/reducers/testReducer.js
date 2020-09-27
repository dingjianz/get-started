import actionType from '../actions/actionType'

const initState = {
  value: '默认值'
}

const testReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.TEST_ACTION:
      return {
        ...state,
        value: action.payload.value
      }
    default:
      return state;
  }
}

export default testReducer;