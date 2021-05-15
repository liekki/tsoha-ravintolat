import initialState from './initial-state'
import * as actionTypes from '../../shared/constants/action-types'

const message = (state = initialState.message, action) => {
  switch (action.type) {
    case actionTypes.MESSAGE_ADD:
    case actionTypes.RESTAURANT_ADD_SUCCESS:
    case actionTypes.RESTAURANT_ADD_ERROR:
    case actionTypes.USER_LOGIN_ERROR:
    case actionTypes.RESTAURANT_UPDATE_SUCCESS:
    case actionTypes.RESTAURANT_UPDATE_ERROR:
    case actionTypes.RESTAURANT_DELETE_SUCCESS:
    case actionTypes.RESTAURANT_DELETE_ERROR:
    case actionTypes.RESTAURANT_REVIEW_ADD_ERROR:
    case actionTypes.RESTAURANT_REVIEW_ADD_SUCCESS:
    case actionTypes.RESTAURANT_REVIEW_DELETE_SUCCESS:
    case actionTypes.RESTAURANT_REVIEW_DELETE_ERROR:
    case actionTypes.USER_REGISTER_SUCCESS:
    case actionTypes.USER_REGISTER_ERROR:
    case actionTypes.FEATURE_ADD_ERROR:
    case actionTypes.FEATURE_ADD_SUCCESS:
    case actionTypes.FEATURE_UPDATE_ERROR:
    case actionTypes.FEATURE_UPDATE_SUCCESS:
    case actionTypes.FEATURE_DELETE_ERROR:
    case actionTypes.FEATURE_DELETE_SUCCESS:
      return {
        ...state,
        stack: state.stack.concat(action.message),
      }
    case actionTypes.LOCATION_CHANGE:
    case actionTypes.MESSAGE_CLEAR:
    case actionTypes.RESTAURANT_UPDATE:
      return {
        ...state,
        stack: [],
      }
    default:
      return state
  }
}

export default message
