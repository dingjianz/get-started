import actionType from "./actionType";
import { getHttp } from "../../services";

const startFetchBlogList = () => {
  return {
    type: actionType.START_FETCH_BLOG_LIST,
  };
};

const fetchBlogListSuccess = (payload) => {
  return {
    type: actionType.FETCH_BLOG_LIST_SUCCESS,
    payload,
  };
};

const fetchBlogListFailed = () => {
  return {
    type: actionType.FETCH_BLOG_LIST_FAILED,
  };
};

export const fetchBlogList = () => (dispatch, getState) => {
  dispatch(startFetchBlogList());
  getHttp("posts")
    .then((resp) => {
      if (resp.status === 200) {
        dispatch(
          fetchBlogListSuccess({
            list: resp.data,
          })
        );
      } else {
        dispatch(fetchBlogListFailed());
      }
    })
    .catch((err) => {
      dispatch(fetchBlogListFailed());
      throw err;
    });
};
