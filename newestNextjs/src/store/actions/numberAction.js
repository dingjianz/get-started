import * as types from './types';

// add number
const addNumberAction = (payload) => ({
  type: types.ADD_NUMBER,
  payload,
});

// reduce number
const reduceNumberAction = (payload) => {
  return {
    type: types.REDUCE_NUMBER,
    payload,
  };
};

// add character
const addCharacterAction = (payload) => {
  return {
    type: types.ADD_CHARACTER,
    payload,
  };
};

export { addNumberAction, reduceNumberAction, addCharacterAction };
