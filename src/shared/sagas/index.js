import { all, fork } from 'redux-saga/effects'

import { watchRegister } from './register-saga'
import { watchLogin, watchLoginSuccess, watchLogout } from './login-saga'
import {
  watchAddRestaurant,
  watchUpdateRestaurant,
  watchDeleteRestaurant,
  watchGetRestaurants,
  watchGetRestaurant,
  watchReviewRestaurant,
  watchDeleteReviewRestaurant,
} from './restaurant-saga'
import {
  watchGetFeatures,
  watchAddFeature,
  watchUpdateFeature,
  watchDeleteFeature,
} from './feature-saga'

export default function* startForeman() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLoginSuccess),
    fork(watchLogout),
    fork(watchAddRestaurant),
    fork(watchUpdateRestaurant),
    fork(watchDeleteRestaurant),
    fork(watchGetRestaurants),
    fork(watchGetRestaurant),
    fork(watchReviewRestaurant),
    fork(watchDeleteReviewRestaurant),
    fork(watchGetFeatures),
    fork(watchAddFeature),
    fork(watchUpdateFeature),
    fork(watchDeleteFeature),
  ])
}
