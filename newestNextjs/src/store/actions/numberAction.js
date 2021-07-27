import * as types from './types';

// add number
const addNumberAction = (payload) => ({
  type: types.ADD_NUMBER,
  payload,
});

// reduce number
const reduceNumberAction = (payload) => ({
  type: types.REDUCE_NUMBER,
  payload,
});

// add character
const addCharacterAction = (payload) => ({
  type: types.ADD_CHARACTER,
  payload,
});

// set dashboardList
const setDashboardListAction = (payload) => ({
  type: types.SET_DASHBOARDLIST,
  payload,
});

export {
  addNumberAction,
  reduceNumberAction,
  addCharacterAction,
  setDashboardListAction,
};
