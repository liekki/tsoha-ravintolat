import fetch from 'isomorphic-fetch'
import window from 'global/window'

const API_URL = `//${window?.location?.host}/api`

export function features() {
  return fetch(`${API_URL}/features`).then((response) => response.json())
}

export function addRestaurant(payload) {
  console.log('from api', payload)
  return fetch(`${API_URL}/restaurant/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload,
    }),
  }).then((response) => response.json())
}

export function getRestaurants() {
  return fetch(`${API_URL}/restaurant/get`).then((response) => response.json())
}
