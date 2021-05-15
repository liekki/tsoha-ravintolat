import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from '../../shared/constants/action-types'

import { getFeatures, addFeature, updateFeature, deleteFeature } from '../../shared/api/feature'

import { history } from '../../shared/store'

function* sendAddFeatureRequest(action) {
  const { payload } = action
  try {
    const response = yield call(addFeature, payload)
    if (!response.error) {
      history.push('/admin/feature')
      yield put({ type: types.FEATURE_ADD_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.FEATURE_ADD_ERROR, message: response.error })
    }
  } catch (e) {
    yield put({ type: types.FEATURE_ADD_ERROR, message: e.message })
  }
}

function* sendUpdateFeatureRequest(action) {
  const { id, payload } = action
  try {
    const response = yield call(updateFeature, id, payload)
    if (!response.error) {
      yield put({ type: types.FEATURE_UPDATE_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.FEATURE_UPDATE_ERROR, message: response.error })
    }
  } catch (e) {
    yield put({ type: types.FEATURE_UPDATE_ERROR, message: e.message })
  }
}

function* sendDeleteFeatureRequest(action) {
  const { id, payload } = action
  try {
    const response = yield call(deleteFeature, id, payload)
    if (!response.error) {
      history.push('/admin/feature')
      yield put({ type: types.FEATURE_DELETE_SUCCESS, message: response.message })
    } else {
      yield put({ type: types.FEATURE_DELETE_ERROR, message: response.error })
    }
  } catch (e) {
    yield put({ type: types.FEATURE_DELETE_ERROR, message: e.message })
  }
}
function* sendGetFeaturesRequest() {
  try {
    const response = yield call(getFeatures)
    if (!response.error) {
      yield put({
        type: types.FEATURES_GET_SUCCESS,
        message: response.message,
        features: response.features,
      })
    } else {
      yield put({ type: types.FEATURES_GET_ERROR, message: response.error })
    }
  } catch (e) {
    console.log(e)
    yield put({ type: types.FEATURES_GET_ERROR, message: e.message })
  }
}

export function* watchAddFeature() {
  yield takeLatest(types.FEATURE_ADD, sendAddFeatureRequest)
}

export function* watchUpdateFeature() {
  yield takeLatest(types.FEATURE_UPDATE, sendUpdateFeatureRequest)
}

export function* watchDeleteFeature() {
  yield takeLatest(types.FEATURE_DELETE, sendDeleteFeatureRequest)
}

export function* watchGetFeatures() {
  yield takeLatest(
    [types.FEATURE_ADD_SUCCESS, types.FEATURE_UPDATE_SUCCESS, types.FEATURE_DELETE_SUCCESS],
    sendGetFeaturesRequest
  )
}
