import { query, transaction } from './driver/pg'
import zipObject from 'lodash/zipObject'

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

export async function deleteRestaurant(id) {
  const result = await query(`UPDATE restaurants SET deleted_at = $1 WHERE id = $2`, ['now', id])

  return result
}

export async function getRestaurants() {
  const result = await query(
    `SELECT r.*, ROUND(AVG(r2.rating), 2) AS average_rating FROM restaurants r LEFT JOIN reviews r2 ON r2.restaurant_id = r.id WHERE r.deleted_at IS NULL GROUP BY r.id;`
  )
  return result.rows
}

export async function getRestaurantById(id) {
  const restaurant = await query(
    `SELECT r.*, ROUND(AVG(r2.rating), 2) AS average_rating FROM restaurants r LEFT JOIN reviews r2 ON r2.restaurant_id = r.id WHERE r.id = $1 AND r.deleted_at IS NULL AND r2.deleted_at IS NULL GROUP BY r.id;`,
    [id]
  )

  const features = await query(
    `SELECT feature_id FROM restaurant_feature WHERE restaurant_id = $1`,
    [restaurant.rows[0].id]
  )

  const reviews = await query(
    `SELECT r.*, u.username FROM reviews r INNER JOIN users u ON r.user_id = u.id WHERE r.restaurant_id = $1 AND r.deleted_at IS NULL ORDER BY r.created_at DESC`,
    [id]
  )

  return {
    ...restaurant.rows[0],
    rights: restaurant.rows[0].rights || '',
    reviews: reviews.rows,
    features: zipObject(
      features.rows.map((f) => f.feature_id),
      features.rows.map((_) => true)
    ),
  }
}

export async function addReview(id, userId, { comment, rating }) {
  const result = await query(
    `INSERT INTO reviews (restaurant_id, user_id, comment, rating, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, userId, comment, rating, 'now()', 'now()']
  )
  return result
}

export async function deleteReview(id) {
  const result = await query(`UPDATE reviews SET deleted_at = $1 WHERE id = $2 RETURNING *`, [
    'now()',
    id,
  ])
  return result.rows[0]
}
