import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReduces from './reducers'

export default createStore(rootReduces, 
  applyMiddleware(thunk))