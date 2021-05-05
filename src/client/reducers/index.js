import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import user from './user'

const reducers = { reducer: { user } }

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
  })

export default createRootReducer
