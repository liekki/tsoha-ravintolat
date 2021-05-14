import { Pool } from 'pg'
import Promise from 'bluebird'
import url from 'url'

const { auth, hostname, port, pathname } = url.parse(process.env.DATABASE_URL)
const [user, password] = auth.split(':')

const pool = new Pool({
  user,
  password,
  host: hostname,
  port,
  database: pathname.split('/')[1],
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 10,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 1000,
})

pool.on('error', (err) => {
  console.error('pool client error', err)
})

export async function connect() {
  return await pool.connect()
}

export function query(sql, params) {
  return Promise.resolve(pool.query(sql, params))
}

export async function transaction(fn, level = 'READ COMMITTED') {
  const client = await pool.connect()

  let released = false
  const release = () => {
    if (!released) {
      released = true
      client.release()
    }
  }

  try {
    await client.query(`BEGIN ISOLATION LEVEL ${level}`)

    let transactionFinalized = false
    const query = (sql, params) => {
      if (!transactionFinalized) {
        return Promise.resolve(client.query(sql, params))
      } else {
        throw new Error('transaction already finalized')
      }
    }

    const commit = () => {
      return query('COMMIT')
        .then(() => (transactionFinalized = true))
        .finally(() => release())
    }
    const rollback = () => {
      return query('ROLLBACK')
        .then(() => (transactionFinalized = true))
        .finally(() => release())
    }

    try {
      const result = await fn(query, commit, rollback)

      if (!transactionFinalized) {
        await commit()
      }
      return result
    } catch (err) {
      if (!transactionFinalized) {
        await rollback()
      }
      throw err
    }
  } finally {
    release()
  }
}
