import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../constants/action-types'

import { register } from '../api/user'

import { history } from '../store'

function* sendRegisterRequest(action) {
  const { payload } = action
  try {
    const response = yield call(register, payload)
    if (!response.error) {
      history.push('/login')
      yield put({ type: types.USER_REGISTER_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.USER_REGISTER_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.USER_REGISTER_ERROR, e })
  }
}

export function* watchRegister() {
  yield takeLatest(types.USER_REGISTER, sendRegisterRequest)
}
