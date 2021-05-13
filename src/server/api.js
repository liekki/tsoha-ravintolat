import { getUserById } from './db/users'

export async function addUserToRequest(req, res, next) {
  try {
    if (req.signedCookies.session) {
      const session = JSON.parse(req.signedCookies.session)
      const user = await getUserById(session.userId, { includePassword: true })
      if (user) {
        req.user = user
        req.csrf_token = session.csrf_token
      } else {
        // TODO: handle deleted user while session is active
      }
    }
    next()
  } catch (err) {
    console.error('error in addUserToRequest', err)
    res.status(500).json({
      status: 'error',
      code: 'SERVER_ERROR',
    })
  }
}

export function checkAccess(accessFn) {
  return async (req, res, next) => {
    if (await Promise.resolve(accessFn(req))) {
      next()
    } else {
      res.status(403).json({
        error: 'Kielletty',
      })
    }
  }
}
