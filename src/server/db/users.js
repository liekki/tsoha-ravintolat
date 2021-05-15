import { query } from './driver/pg'

export async function addUser({ username, password }) {
  const result = await query(
    `
    INSERT INTO users (username, password, is_admin, created_at, updated_at, deleted_at)
    VALUES ($1, $2, false, now(), now(), null) RETURNING *`,
    [username, password]
  )
  return result.rows[0]
}

export async function getUserByUsername(username) {
  const result = await query(`SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL`, [
    username,
  ])
  return result.rows[0]
}

export async function getUserById(id) {
  const result = await query(`SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL`, [id])
  return result.rows[0]
}
