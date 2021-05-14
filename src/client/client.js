import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'

import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

import configureStore, { history } from '../shared/store'
import App from './components/App'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = configureStore(preloadedState)

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
