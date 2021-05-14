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
  const { payload } = req.body

  const user = await users.getUserByUsername(payload.username)
  if (user) {
    const validPassword = await checkHashedPasswordAsync(payload.password, user.password)
    if (validPassword) {
      const session = JSON.parse(req.signedCookies.session)
      res.cookie('session', JSON.stringify({ ...session, userId: user.id }), {
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
  checkCsrfToken,
  async (req, res) => {
    const { payload } = req.body

    const isValid = await schema.restaurant.validate(payload)
    if (isValid) {
      try {
        const restaurant = await restaurants.addRestaurant(payload)
        res.status(200).json({ message: 'Ravintolan lisääminen onnistui' })
      } catch (err) {
        res.status(500).json({ error: 'Ravintolan lisääminen epäonnistui' })
      }
    } else {
      res.status(400).json({ error: 'Invalid restaurant' })
    }
  }
)

app.put(
  '/api/restaurant/update/:id',
  checkAccess((req) => req.user?.is_admin),
  checkCsrfToken,
  async (req, res) => {
    const { payload } = req.body
    const id = req.params.id
    const isValid = await schema.restaurant.validate(payload)
    if (isValid) {
      try {
        const restaurant = await restaurants.updateRestaurant(id, payload)
        res.status(200).json({ message: 'Ravintolan tietojen päivittäminen onnistui' })
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Ravintolan tietojen päivittäminen epäonnistui' })
      }
    } else {
      res.status(400).json({ error: 'Invalid restaurant' })
    }
  }
)

app.delete(
  '/api/restaurant/delete/:id',
  checkAccess((req) => req.user?.is_admin),
  checkCsrfToken,
  async (req, res) => {
    const id = req.params.id
    try {
      await restaurants.deleteRestaurant(id)
      res.status(200).json({ message: 'Ravintolan poistaminen onnistui' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: 'Ravintolan poistaminen epäonnistui' })
    }
  }
)

app.get('/api/restaurant/get', async (req, res) => {
  const data = await restaurants.getRestaurants()
  res.status(200).json({ message: 'ok', data })
})

app.get('/api/restaurant/get/:id', async (req, res) => {
  const id = req.params.id
  const data = await restaurants.getRestaurantById(id)
  res.status(200).json({ message: 'ok', data })
})

app.post(
  '/api/restaurant/review/:id',
  checkAccess((req) => req.user),
  checkCsrfToken,
  async (req, res) => {
    const id = req.params.id
    const { payload } = req.body
    const { id: userId } = req.user

    const isValid = await schema.review.validate(payload)
    if (isValid) {
      try {
        await restaurants.addReview(id, userId, payload)
        res.status(200).json({ message: 'Arvion lisääminen onnistui' })
      } catch (err) {
        res.status(500).json({ error: 'Arvion lisääminen epäonnistui' })
      }
    } else {
      res.status(400).json({ error: 'Invalid review' })
    }
  }
)

app.delete(
  '/api/restaurant/review/:id',
  checkAccess((req) => req.user?.is_admin),
  checkCsrfToken,
  async (req, res) => {
    const id = req.params.id
    try {
      const result = await restaurants.deleteReview(id)
      res
        .status(200)
        .json({ message: 'Arvion poistaminen onnistui', restaurantId: result.restaurant_id })
    } catch (err) {
      res.status(500).json({ error: 'Arvion poistaminen epäonnistui' })
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

app.get('/api/features', async (req, res) => {
  const features = await restaurants.getFeatures()
  res.status(200).json({
    features,
  })
})

app.post('/api/register', checkCsrfToken, async (req, res) => {
  const { username, password } = req.body.payload

  const usernameTaken = await users.getUserByUsername(username)

  if (usernameTaken) {
    res.status(400).json({ error: 'Rekisteröinti epäonnistui, käyttäjätunnus on jo käytössä' })
  } else {
    try {
      const user = await users.addUser({
        username,
        password: await hashPasswordAsync(password),
      })
      res.status(200).json({ message: 'Rekisteröinti onnistui, voit kirjautua sisään' })
    } catch (err) {
      res.status(500).json({ error: 'Rekisteröinti epäonnistui' })
      console.log('error', err)
    }
  }
})

app.use('*', serveApp)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
