import { all, fork } from 'redux-saga/effects'

import { watchRegister } from './register-saga'

export default function* startForeman() {
  yield all([fork(watchRegister)])
}
