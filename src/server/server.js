import express from 'express'
import compression from 'compression'
import path from 'path'

import serveApp from './serveApp'
import { hashPasswordAsync, checkHashedPasswordAsync } from './security'

import * as users from './db/users'

const PORT = process.env.PORT || 1234
const APP_PATH = process.env.APP_PATH || path.resolve(__dirname + '/../../dist/client')

const app = express()

app.use(compression({ threshold: 0 }))

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

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/robots.txt', (req, res) => {
  res.type('text/plain').status(200).send('User-Agent: *\nDisallow: /api')
})

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body
  const user = await users.getUserByUsername(username)
  if (user) {
    const validPassword = await checkHashedPasswordAsync(password, user.password)
    if (validPassword) {
      const session = { userId: user.id }
      res.cookie('session', JSON.stringify(session), { httpOnly: true, signed: true })
      res.status(200).json({ message: 'Kirjautuminen onnistui' })
    }
  } else {
    res.status(401).json({ message: 'Kirjautuminen epäonnistui' })
  }
})

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body

  const usernameTaken = await users.getUserByUsername(username)

  if (usernameTaken) {
    res.status(400).send({ error: 'Rekisteröinti epäonnistui, käyttäjätunnus on jo käytössä' })
  } else {
    try {
      const user = await users.addUser({
        username,
        password: await hashPasswordAsync(password),
      })
      res.status(200).send({ message: 'Rekisteröinti onnistui, voit kirjautua sisään' })
    } catch (err) {
      res.status(500).send({ error: 'Rekisteröinti epäonnistui' })
      console.log('error', err)
    }
  }
})

app.use('*', serveApp)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
