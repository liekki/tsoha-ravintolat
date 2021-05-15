import { FEATURE_ADD, FEATURE_UPDATE, FEATURE_DELETE } from '../../shared/constants/action-types'

export function addFeatureAction(payload) {
  return {
    type: FEATURE_ADD,
    payload,
  }
}

export function updateFeatureAction(id, payload) {
  return {
    type: FEATURE_UPDATE,
    id,
    payload,
  }
}

export function deleteFeatureAction(id, payload) {
  return {
    type: FEATURE_DELETE,
    id,
    payload,
  }
}
