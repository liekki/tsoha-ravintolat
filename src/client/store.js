import { createBrowserHistory, createMemoryHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createRootReducer from './reducers'
import createSagaMiddleware from 'redux-saga'

import sagas from './sagas'

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const history = isServer ? createMemoryHistory() : createBrowserHistory()

export default function configureStore(preloadedState, url) {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    isServer
      ? compose(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
      : composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
  )

  if (!isServer) {
    sagaMiddleware.run(sagas)
  }

  return store
}
