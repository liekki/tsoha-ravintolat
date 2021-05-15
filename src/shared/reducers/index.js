import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import user from './user'
import restaurant from './restaurant'
import message from './message'
import feature from './feature'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    restaurant,
    message,
    feature,
  })

export default createRootReducer
