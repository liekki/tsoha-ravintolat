import { all, fork } from 'redux-saga/effects'

import { watchRegister } from './register-saga'
import { watchLogin, watchLoginSuccess, watchLogout } from './login-saga'
import { watchAddRestaurant } from './restaurant-saga'

export default function* startForeman() {
  yield all([
    fork(watchRegister),
    fork(watchLogin),
    fork(watchLoginSuccess),
    fork(watchLogout),
    fork(watchAddRestaurant),
  ])
}
