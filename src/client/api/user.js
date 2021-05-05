import fetch from 'isomorphic-fetch'
import window from 'global/window'

const API_URL = `//${window?.location?.host}`

export function register(username, password) {
  console.log(API_URL, username, password)

  return fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((response) => response.json())
}
