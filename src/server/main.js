import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

const APP_PORT = process.env.APP_PORT || 1234
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
  res.sendFile(APP_PATH + '/index.html')
})

app.listen(APP_PORT, () => {
  console.log(`Server listening on port ${APP_PORT}`)
})
