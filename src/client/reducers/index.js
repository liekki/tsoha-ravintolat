import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user'
import restaurant from './restaurant'
import message from './message'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    restaurant,
    message,
  })

export default createRootReducer
