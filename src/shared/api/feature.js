import fetch from 'isomorphic-fetch'
import window from 'global/window'

const API_URL = `//${window?.location?.host}/api`

export function getFeatures() {
  return fetch(`${API_URL}/features`).then((response) => response.json())
}

export function addFeature(payload) {
  return fetch(`${API_URL}/feature/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload,
    }),
  }).then((response) => response.json())
}

export function updateFeature(id, payload) {
  return fetch(`${API_URL}/feature/update/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload,
    }),
  }).then((response) => response.json())
}

export function deleteFeature(id, payload) {
  return fetch(`${API_URL}/feature/delete/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload,
    }),
  }).then((response) => response.json())
}
