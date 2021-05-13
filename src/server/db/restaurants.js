import { query, transaction } from './driver/pg'
import zipObject from 'lodash/zipObject'

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
        .filter((identity) => identity)
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

export async function updateRestaurant(
  id,
  { name, description, rights, latitude, longitude, features }
) {
  return transaction(async (query) => {
    const result = await query(
      `UPDATE restaurants SET name = $1, description = $2, rights = $3, latitude = $4, longitude = $5, updated_at = $6 WHERE id = $7`,
      [name, description, rights || null, latitude, longitude, 'now', id]
    )

    await query(`DELETE FROM restaurant_feature WHERE restaurant_id = $1`, [id])

    await Promise.all(
      features
        .map((value, key) => (value ? key : null))
        .filter((identity) => identity)
        .map((featureId) => {
          query(`INSERT INTO restaurant_feature (restaurant_id, feature_id) VALUES ($1, $2)`, [
            id,
            featureId,
          ])
        })
    )

    return result
  })
}

export async function getRestaurants() {
  const result = await query(`SELECT * FROM restaurants WHERE deleted_at IS NULL ORDER BY name ASC`)
  return result.rows
}

export async function getRestaurantById(id) {
  const restaurant = await query(
    `SELECT * FROM restaurants WHERE id = $1 AND deleted_at IS NULL ORDER BY name ASC`,
    [id]
  )

  const features = await query(
    `SELECT feature_id FROM restaurant_feature WHERE restaurant_id = $1`,
    [restaurant.rows[0].id]
  )

  return {
    ...restaurant.rows[0],
    rights: restaurant.rows[0].rights || '',
    features: zipObject(
      features.rows.map((f) => f.feature_id),
      features.rows.map((_) => true)
    ),
  }
}
