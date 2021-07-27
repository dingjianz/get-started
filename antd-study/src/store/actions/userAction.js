import actionTypes from './actionType';
import { loginApi } from '../../api/login';
import { $localStorage, $sessionStorage } from '../../utils';

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START,
  };
};
const loginSuccess = (userInfo) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: {
      userInfo,
    },
  };
};

const loginFailed = () => {
  return {
    type: actionTypes.LOGIN_FAILED,
  };
};

// 登录
export const loginFn = (params) => (dispatch) => {
  dispatch(loginStart());
  loginApi(params)
    .then((res) => {
      const { authToken, ...userInfo } = res; // 将authToken从res中抽离出，userInfo中就无authToken
      if (params.remember === true) {
        $localStorage.set('authToken', authToken);
        $localStorage.set('userInfo', userInfo);
        $sessionStorage.remove('authToken');
        $sessionStorage.remove('userInfo');
      } else {
        $sessionStorage.set('authToken', authToken);
        $sessionStorage.set('userInfo', userInfo);
        $localStorage.remove('authToken');
        $localStorage.remove('userInfo');
      }
      dispatch(loginSuccess(res));
    })
    .catch((err) => {
      dispatch(loginFailed());
      throw err;
    });
};

// 退出登录
export const loginOut = () => (dispatch) => {
  $localStorage.remove('authToken');
  $localStorage.remove('userInfo');
  $sessionStorage.remove('authToken');
  $sessionStorage.remove('userInfo');

  // 实际项目中，还要向服务端发送退出登录请求
  dispatch(loginFailed());
};

// 改变 avatar 头像
export const changeAvatar = (imgUrl) => (dispatch) => {
  const Obj = $localStorage.get('userInfo') || $sessionStorage.get('userInfo');
  const userInfo = {
    ...Obj,
    avatar: imgUrl,
  };
  if ($localStorage.get('userInfo')) {
    $localStorage.set('userInfo', userInfo);
  } else if ($sessionStorage.get('userInfo')) {
    $sessionStorage.set('userInfo', userInfo);
  }
  dispatch({
    type: actionTypes.CHANGE_AVATAR,
    payload: {
      imgUrl,
    },
  });
};
