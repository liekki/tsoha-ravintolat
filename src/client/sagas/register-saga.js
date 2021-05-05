import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../constants/action-types'

import { register } from '../api/user'

function* sendRegisterRequest(action) {
  console.log('we got sum stuff', action)
  const { user, password } = action
  try {
    const response = yield call(register, user, password)
    console.log(response)
    if (!response.error) {
      yield put({ type: types.USER_REGISTER_SUCCESS, response: response.message })
    } else {
      yield put({ type: types.USER_REGISTER_ERROR, response: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.USER_REGISTER_ERROR, e })
  }
}

export function* watchRegister() {
  yield takeLatest(types.USER_REGISTER, sendRegisterRequest)
}
