import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../../shared/constants/action-types'

import { login, logout, profile } from '../../shared/api/user'
import { history } from '../../shared/store'

function* sendLoginRequest(action) {
  const { payload } = action
  try {
    const response = yield call(login, payload)
    if (!response.error) {
      history.push('/')
      yield put({
        type: types.USER_LOGIN_SUCCESS,
        message: response.message,
        csrfToken: response.csrfToken,
      })
    } else {
      yield put({ type: types.USER_LOGIN_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.USER_LOGIN_ERROR, message: e.message })
  }
}

function* sendProfileRequest() {
  try {
    const response = yield call(profile)
    if (!response.error) {
      yield put({ type: types.USER_LOGIN_PROFILE_SUCCESS, response })
    } else {
      yield put({ type: types.USER_LOGIN_PROFILE_ERROR, response })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.USER_LOGIN_PROFILE_ERROR, message: e.message })
  }
}

function* sendLogoutRequest() {
  try {
    const response = yield call(logout)
    if (!response.error) {
      yield put({ type: types.USER_LOGOUT_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.USER_LOGOUT_ERROR, message: response.error })
    }
  } catch (e) {
    yield put({ type: types.USER_LOGOUT_ERROR, message: e.message })
  }
}

export function* watchLogin() {
  yield takeLatest(types.USER_LOGIN, sendLoginRequest)
}

export function* watchLoginSuccess() {
  yield takeLatest(types.USER_LOGIN_SUCCESS, sendProfileRequest)
}

export function* watchLogout() {
  yield takeLatest(types.USER_LOGOUT, sendLogoutRequest)
}
