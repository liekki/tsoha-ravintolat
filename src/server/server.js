import express from 'express'
import compression from 'compression'
import path from 'path'
import cookieParser from 'cookie-parser'

import serveApp from './serveApp'
import {
  hashPasswordAsync,
  checkHashedPasswordAsync,
  initializeSession,
  checkCsrfToken,
} from './security'
import { checkAccess, addUserToRequest } from './api'

import * as users from './db/users'
import * as restaurants from './db/restaurants'
import * as schema from '../shared/schema'

const PORT = process.env.PORT || 1234
const APP_PATH = process.env.APP_PATH || path.resolve(__dirname + '/../../dist/client')
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'dev'

const app = express()

app.use(compression({ threshold: 0 }))
app.use(cookieParser(COOKIE_SECRET))

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

app.use('/', addUserToRequest)
app.use('/', initializeSession)

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body

  const user = await users.getUserByUsername(username)
  if (user) {
    const validPassword = await checkHashedPasswordAsync(password, user.password)
    console.log(validPassword)
    if (validPassword) {
      const session = { userId: user.id }
      res.cookie('session', JSON.stringify(session), {
        httpOnly: true,
        signed: true,
        sameSite: true,
      })
      res.status(200).json({ message: 'Kirjautuminen onnistui' })
    } else {
      res.status(401).json({ error: 'Kirjautuminen epäonnistui' })
    }
  } else {
    res.status(401).json({ error: 'Kirjautuminen epäonnistui' })
  }
})

app.post('/api/logout', (req, res) => {
  res.clearCookie('session', { httpOnly: true, signed: true })
  res.status(200).json({ message: 'Uloskirjautuminen onnistui' })
})

app.post(
  '/api/restaurant/add',
  checkAccess((req) => req.user?.is_admin),
  async (req, res) => {
    const { payload } = req.body

    const isValid = await schema.restaurant.validate(payload)
    if (isValid) {
      try {
        const restaurant = await restaurants.addRestaurant(payload)
        res.status(200).send({ message: 'Ravintolan lisääminen onnistui' })
      } catch (err) {
        res.status(500).send({ error: 'Ravintolan lisääminen epäonnistui' })
      }
    } else {
      res.status(400).json({ error: 'Invalid restaurant' })
    }
  }
)

app.get(
  '/api/profile',
  checkAccess((req) => !!req.user),
  (req, res) => {
    res.status(200).json({
      ...req.user,
      password: null,
    })
  }
)

app.get(
  '/api/features',
  checkAccess((req) => req.user.is_admin),
  async (req, res) => {
    const features = await restaurants.getFeatures()
    res.status(200).json({
      features,
    })
  }
)

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
