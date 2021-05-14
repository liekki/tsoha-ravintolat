import fetch from 'isomorphic-fetch'
import window from 'global/window'

const API_URL = `//${window?.location?.host}/api`

export function register(payload) {
  return fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload,
    }),
  }).then((response) => response.json())
}

export function login(payload) {
  return fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload,
    }),
  }).then((response) => response.json())
}

export function logout() {
  return fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}

export function profile() {
  return fetch(`${API_URL}/profile`).then((response) => response.json())
}
