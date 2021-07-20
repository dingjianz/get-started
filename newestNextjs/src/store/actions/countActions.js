import * as types from "./types";

// add count
const addCountAction = (payload) => ({
  type: types.ADD_COUNT,
  payload,
});

// reduce count
const reduceCountAction = (payload) => ({
  type: types.REDUCE_COUNT,
  payload,
});

export { addCountAction, reduceCountAction };
