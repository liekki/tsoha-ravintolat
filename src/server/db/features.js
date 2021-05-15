import { query } from './driver/pg'

export async function getFeatures() {
  const result = await query(`SELECT * FROM features`)
  return result.rows
}

export async function addFeature({ name }) {
  const result = await query(`INSERT INTO features (name) VALUES ($1) RETURNING *`, [name])
  return result.rows[0]
}

export async function updateFeature(id, { name }) {
  const result = await query(`UPDATE features SET name = $1 WHERE id = $2 RETURNING *`, [name, id])

  return result.rows[0]
}

export async function deleteFeature(id) {
  const result = await query(`DELETE FROM features WHERE id = $1`, [id])

  return result
}
