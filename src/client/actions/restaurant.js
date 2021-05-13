import { RESTAURANT_ADD, RESTAURANTS_GET } from '../constants/action-types'

export function addRestaurantAction(payload) {
  return {
    type: RESTAURANT_ADD,
    payload,
  }
}

export function getRestaurantsAction() {
  return {
    type: RESTAURANTS_GET,
  }
}
