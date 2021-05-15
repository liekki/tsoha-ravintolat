import fs from 'fs'
import React from 'react'
import path from 'path'
import ReactDOMServer, { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'

import { getFeatures } from './db/features'
import configureStore from '../shared/store'
import App from '../client/components/App'

export default async (req, res) => {
  const documentMarkup = fs.readFileSync(path.resolve(__dirname, '../../dist/client/index.html'), {
    encoding: 'utf8',
  })
  const partialState = {
    user: {
      identity: req.user ? { ...req.user, password: null } : null,
      csrfToken: req.csrf_token,
    },
    feature: {
      list: await getFeatures(),
    },
  }
  const store = configureStore(partialState, req.url)
  const sheet = new ServerStyleSheet()

  try {
    const appMarkup = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouter location={req.originalUrl}>
            <App />
          </StaticRouter>
        </Provider>
      )
    )

    const styleTags = sheet.getStyleTags()
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
      .replace('%STYLES%', styleTags)

    res.contentType('text/html')
    res.status(200)
    return res.send(documentWithAppMarkup)
  } catch (error) {
    // handle error
    console.error(error)
  } finally {
    sheet.seal()
  }
}
