import actionTypes from '../actions/actionType'
import { $localStorage, $sessionStorage } from '../../utils'

const isLogin = (
  Boolean($localStorage.get('authToken')) || Boolean($sessionStorage.get('authToken'))
)

const userInfo = (
  $localStorage.get('userInfo') || $sessionStorage.get('userInfo')
)

const initState = {
  ...userInfo,
  isLogin,
  isLoading: false
}

export default (state = initState, action) => {
  switch(action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        isLoading: true
      }
    case actionTypes.LOGIN_SUCCESS:
      const userInfo = action.payload.userInfo
      return {
        ...state,
        ...userInfo,
        isLogin: true,
        isLoading: false
      }
    case actionTypes.LOGIN_FAILED:
      return {
        id: '',
        displayName: '',
        avatar: '',
        role: '',
        isLogin: false,
        isLoading: false
      }
    case actionTypes.CHANGE_AVATAR:
      return {
        ...state,
        avatar: action.payload.imgUrl
      }
    default:
      return state
  }
}