import * as types from './types';

// add count
const addCountAction = (payload) => ({
  type: types.ADD_COUNT,
  payload,
});

// reduce count
const reduceCountAction = (payload) => {
  console.log(1123424);
  return {
    type: types.REDUCE_COUNT,
    payload,
  };
};

export { addCountAction, reduceCountAction };
