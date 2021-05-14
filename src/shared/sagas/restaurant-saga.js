import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../../shared/constants/action-types'

import {
  addRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getRestaurants,
  getRestaurantById,
  addReview,
  deleteReview,
} from '../../shared/api/restaurant'

import { history } from '../../shared/store'

function* sendAddRestaurantRequest(action) {
  const { payload } = action
  try {
    const response = yield call(addRestaurant, payload)
    if (!response.error) {
      yield put({ type: types.RESTAURANT_ADD_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.RESTAURANT_ADD_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANT_ADD_ERROR, e })
  }
}

function* sendUpdateRestaurantRequest(action) {
  const { payload, id } = action
  try {
    const response = yield call(updateRestaurant, id, payload)
    if (!response.error) {
      yield put({ type: types.RESTAURANT_UPDATE_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.RESTAURANT_UPDATE_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANT_UPDATE_ERROR, e })
  }
}

function* sendDeleteRestaurantRequest(action) {
  const { payload } = action
  try {
    const response = yield call(deleteRestaurant, payload)
    if (!response.error) {
      history.push('/admin')
      yield put({ type: types.RESTAURANT_DELETE_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.RESTAURANT_DELETE_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANT_DELETE_ERROR, e })
  }
}

function* sendAddReviewRequest(action) {
  const { id, payload } = action
  try {
    const response = yield call(addReview, id, payload)
    if (!response.error) {
      yield put({ type: types.RESTAURANT_REVIEW_ADD_SUCCESS, id, message: response.message })
    } else {
      yield put({ type: types.RESTAURANT_REVIEW_ADD_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANT_REVIEW_ADD_ERROR, e })
  }
}

function* sendDeleteReviewRequest(action) {
  const { id, payload } = action
  try {
    const response = yield call(deleteReview, id, payload)
    if (!response.error) {
      history.push(`/view/${response.restaurantId}`)
      yield put({ type: types.RESTAURANT_REVIEW_DELETE_SUCCESS, id, message: response.message })
    } else {
      yield put({ type: types.RESTAURANT_REVIEW_DELETE_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANT_REVIEW_DELETE_ERROR, e })
  }
}

function* sendGetRestaurantsRequest() {
  try {
    const response = yield call(getRestaurants)
    if (!response.error) {
      yield put({ type: types.RESTAURANTS_GET_ALL_SUCCESS, restaurants: response })
    } else {
      yield put({ type: types.RESTAURANTS_GET_ALL_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANTS_GET_ALL_ERROR, e })
  }
}

function* sendGetRestaurantRequest(action) {
  const { id } = action
  try {
    const response = yield call(getRestaurantById, id)
    if (!response.error) {
      yield put({ type: types.RESTAURANTS_GET_SUCCESS, restaurant: response })
    } else {
      yield put({ type: types.RESTAURANTS_GET_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.RESTAURANTS_GET_ERROR, e })
  }
}

export function* watchAddRestaurant() {
  yield takeLatest(types.RESTAURANT_ADD, sendAddRestaurantRequest)
}

export function* watchUpdateRestaurant() {
  yield takeLatest(types.RESTAURANT_UPDATE, sendUpdateRestaurantRequest)
}

export function* watchDeleteRestaurant() {
  yield takeLatest(types.RESTAURANT_DELETE, sendDeleteRestaurantRequest)
}

export function* watchReviewRestaurant() {
  yield takeLatest(types.RESTAURANT_REVIEW_ADD, sendAddReviewRequest)
}

export function* watchDeleteReviewRestaurant() {
  yield takeLatest(types.RESTAURANT_REVIEW_DELETE, sendDeleteReviewRequest)
}

export function* watchGetRestaurants() {
  yield takeLatest(
    [
      types.RESTAURANTS_GET_ALL,
      types.RESTAURANT_ADD_SUCCESS,
      types.RESTAURANT_UPDATE_SUCCESS,
      types.RESTAURANT_DELETE_SUCCESS,
    ],
    sendGetRestaurantsRequest
  )
}

export function* watchGetRestaurant() {
  yield takeLatest(
    [types.RESTAURANTS_GET, types.RESTAURANT_REVIEW_ADD_SUCCESS],
    sendGetRestaurantRequest
  )
}
