import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, Switch } from 'react-router'

import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'

import configureStore, { history } from './store'
import App from './components/App'

const store = configureStore()

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
