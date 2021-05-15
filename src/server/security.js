import crypto, { randomBytes } from 'crypto'

export const generatePassword = (length) => Math.random().toString(36).slice(-length)

export async function hashPasswordAsync(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex')

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}

export async function checkHashedPasswordAsync(password, hash) {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':')
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err)
      resolve(key == derivedKey.toString('hex'))
    })
  })
}

export function initializeSession(req, res, next) {
  if (!req.signedCookies.session) {
    const csrfToken = randomBytes(100).toString('base64')
    const session = { csrf_token: csrfToken }
    res.cookie('session', JSON.stringify(session), {
      httpOnly: true,
      signed: true,
      sameSite: true,
    })
    req.csrf_token = csrfToken
  }
  next()
}

export function checkCsrfToken(req, res, next) {
  if (req.signedCookies.session) {
    const session = JSON.parse(req.signedCookies.session)
    if (session.csrf_token !== req.body.payload.csrf_token) {
      res.status(403).json({ message: 'CSRF tokens did not match' })
    } else {
      next()
    }
  } else {
    next()
  }
}
