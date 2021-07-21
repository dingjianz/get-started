import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import rootReducer from './reducers';

export default createStore(rootReducer, applyMiddleware(thunk));
