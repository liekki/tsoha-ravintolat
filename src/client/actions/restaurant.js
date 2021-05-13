import { RESTAURANT_ADD, RESTAURANT_UPDATE, RESTAURANTS_GET_ALL } from '../constants/action-types'

export function addRestaurantAction(payload) {
  return {
    type: RESTAURANT_ADD,
    payload,
  }
}

export function updateRestaurantAction(id, payload) {
  return {
    type: RESTAURANT_UPDATE,
    payload,
    id,
  }
}

export function getRestaurantsAction() {
  return {
    type: RESTAURANTS_GET_ALL,
  }
}
