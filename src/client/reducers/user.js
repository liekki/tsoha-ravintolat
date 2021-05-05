import initialState from './initial-state'
import * as actionTypes from '../constants/action-types'

const user = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.USER_REGISTER_SUCCESS:
    case actionTypes.USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        msg: action.response,
      }

    case actionTypes.USER_LOGIN:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.USER_LOGIN_PROFILE_SUCCESS:
      return {
        ...state,
        identity: action.response,
      }
    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        identity: null,
      }
    case actionTypes.LOCATION_CHANGE:
      return {
        ...state,
        msg: '',
      }
    default:
      return state
  }
}

export default user
