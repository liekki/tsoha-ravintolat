import fs from 'fs'
import React from 'react'
import path from 'path'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import configureStore from '../client/store'
import App from '../client/components/App'

export default (req, res) => {
  const documentMarkup = fs.readFileSync(path.resolve(__dirname, '../../dist/client/index.html'), {
    encoding: 'utf8',
  })
  const partialState = {
    user: {
      identity: req.user || null,
    },
  }
  const store = configureStore(partialState, req.url)

  const appMarkup = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.originalUrl}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState()

  const documentWithAppMarkup = documentMarkup
    .replace('%APP%', `<div id="app">${appMarkup}</div>`)
    .replace(
      '%STATE%',
      `
    <script type="text/javascript">
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
    </script>
  `
    )

  res.contentType('text/html')
  res.status(200)
  return res.send(documentWithAppMarkup)
}
