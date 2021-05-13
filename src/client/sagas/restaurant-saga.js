import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../constants/action-types'

import { addRestaurant, getRestaurants } from '../api/restaurant'

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
    yield put({ type: types.USER_REGISTER_ERROR, e })
  }
}

function* sendGetRestaurantsRequest(action) {
  try {
    const response = yield call(getRestaurants)
    if (!response.error) {
      yield put({ type: types.RESTAURANTS_GET_SUCCESS, message: response.message })
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

export function* watchGetRestaurants() {
  yield takeLatest(types.RESTAURANTS_GET, sendGetRestaurantsRequest)
}
