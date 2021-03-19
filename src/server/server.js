import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from '../client/components/App'

const PORT = process.env.PORT || 1234
const APP_PATH = process.env.APP_PATH || path.resolve(__dirname + '/../../dist/client')

const app = express()

app.use(
  '/static',
  express.static(APP_PATH, {
    maxAge: '1y',
    setHeaders: function (res, path) {
      if (path === `${APP_PATH}/js/app.js`) {
        res.setHeader('Cache-Control', 'public, max-age=0')
      }
    },
  })
)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/robots.txt', (req, res) => {
  res.type('text/plain').status(200).send('User-Agent: *\nDisallow: /api')
})

app.use('*', (req, res) => {
  const documentMarkup = fs.readFileSync(path.resolve(__dirname, '../../dist/client/index.html'), {
    encoding: 'utf8',
  })
  const appMarkup = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <App />
    </StaticRouter>
  )

  console.log(appMarkup)
  const documentWithAppMarkup = documentMarkup.replace(
    '<div id="app"></div>',
    `<div id="app">${appMarkup}</div>`
  )

  res.contentType('text/html')
  res.status(200)
  return res.send(documentWithAppMarkup)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
