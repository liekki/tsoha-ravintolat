import { query, transaction } from './driver/pg'

export async function getFeatures() {
  const result = await query(`SELECT * FROM features`)
  return result.rows
}

export async function addRestaurant({ name, description, rights, latitude, longitude, features }) {
  return transaction(async (query) => {
    const result = await query(
      `INSERT INTO restaurants (name, description, rights, latitude, longitude, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [name, description, rights || null, latitude, longitude, 'now', 'now', null]
    )

    await Promise.all(
      features
        .map((value, key) => (value ? key : null))
        .filter((id) => id)
        .map((featureId) => {
          query(`INSERT INTO restaurant_feature (restaurant_id, feature_id) VALUES ($1, $2)`, [
            result.rows[0].id,
            featureId,
          ])
        })
    )

    return result
  })
}
