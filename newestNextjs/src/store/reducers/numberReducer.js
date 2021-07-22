/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import * as types from '../actions/types';

const initState = {
  number: 999,
  character: 10,
};

const numberReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case types.ADD_NUMBER:
      return {
        ...state,
        number: ++state.number,
      };
    case types.REDUCE_NUMBER:
      return {
        ...state,
        number: --state.number,
      };
    case types.ADD_CHARACTER:
      return {
        ...state,
        character: ++state.character,
      };
    default:
      return state;
  }
};

export default numberReducer;
