/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import * as types from '../actions/types';

const initState = {
  count: 0,
};

const countReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.ADD_COUNT:
      return {
        ...state,
        count: ++state.count,
      };
    case types.REDUCE_COUNT:
      return {
        ...state,
        count: --state.count,
      };
    default:
      return state;
  }
};

export default countReducer;
