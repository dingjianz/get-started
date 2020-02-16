import actionTypes from '../actions/actionTypes'
import { fromJS } from 'immutable'

const initState = fromJS({
  count: 100
})

export default (state = initState, action ) => {
  switch(action.type) {
    case actionTypes.ADD_COUNT:
      const preCount = state.get('count')
      const newCount =  preCount + action.payload.num
      // return state.updateIn(['count'], v => v = newCount )
      return state.setIn(['count'], newCount)

    case actionTypes.REDUCE_COUNT:
      const preCount_2 = state.get('count')
      const newCount_2 =  preCount_2 - action.payload.num
      return state.update('count', v => v = newCount_2 )
      // return state.set('count', newCount_2)

    default:
      return state
  }
}