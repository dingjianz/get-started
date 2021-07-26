import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session'; // sessionStorage
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
// import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

import countReducer from './countReducer';
import numberReducer from './numberReducer';

/* 
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['countR', 'numberR'],
  stateReconciler: autoMergeLevel2,
};

const countPersistConfig = {
  key: 'countReducer',
  storage,
  blacklist: ['count'],
  stateReconciler: autoMergeLevel2,
};

const numberPersistConfig = {
  key: 'numberReducer',
  storage,
  whiteList: ['number'],
  blacklist: ['character'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  countReducer: persistReducer(countPersistConfig, countReducer),
  numberReducer: persistReducer(numberPersistConfig, numberReducer),
});
*/

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['countReducer'],
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  countReducer,
  numberReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
