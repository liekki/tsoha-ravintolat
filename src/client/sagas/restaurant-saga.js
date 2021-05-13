import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../constants/action-types'

import { addRestaurant, updateRestaurant, getRestaurants } from '../api/restaurant'

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

export function* watchAddRestaurant() {
  yield takeLatest(types.RESTAURANT_ADD, sendAddRestaurantRequest)
}

export function* watchUpdateRestaurant() {
  yield takeLatest(types.RESTAURANT_UPDATE, sendUpdateRestaurantRequest)
}

export function* watchGetRestaurants() {
  yield takeLatest(
    [types.RESTAURANTS_GET_ALL, types.RESTAURANT_ADD_SUCCESS, types.RESTAURANT_UPDATE_SUCCESS],
    sendGetRestaurantsRequest
  )
}
