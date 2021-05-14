import {
  RESTAURANT_ADD,
  RESTAURANT_UPDATE,
  RESTAURANT_DELETE,
  RESTAURANTS_GET,
  RESTAURANTS_GET_ALL,
  RESTAURANT_REVIEW_ADD,
  RESTAURANT_REVIEW_DELETE,
} from '../constants/action-types'

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

export function deleteRestaurantAction(payload) {
  return {
    type: RESTAURANT_DELETE,
    payload,
  }
}

export function getRestaurantsAction() {
  return {
    type: RESTAURANTS_GET_ALL,
  }
}

export function getRestaurantAction(id) {
  return {
    type: RESTAURANTS_GET,
    id,
  }
}

export function addReviewAction(id, payload) {
  return {
    type: RESTAURANT_REVIEW_ADD,
    payload,
    id,
  }
}

export function deleteReviewAction(id, payload) {
  return {
    type: RESTAURANT_REVIEW_DELETE,
    id,
    payload,
  }
}
