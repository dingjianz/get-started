import actionTypes from '../actions/actionType'
const initState = {
  isLoading: false,
  list: []
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionTypes.NOTICE_READ:
      let newList = state.list.map(item => {
        if (action.payload.readType==='allRead') { // 标记为全部已读
          item.hasRead = true
        } else if (item.id===action.payload.id) { // 标记为某个文章已读
          item.hasRead = true
        }
        return item
      })
      return {
        ...state,
        list: newList
      }
    case actionTypes.START_NOTICE_POST:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.END_NOTICE_POST:
      return {
        ...state,
        isLoading: false
      }
    case actionTypes.FETCH_NOTICE_LIST:
      return {
        ...state,
        list: action.payload.list
      }
    default:
      return state
  }
}