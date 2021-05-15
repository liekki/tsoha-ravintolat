import initialState from './initial-state'
import * as actionTypes from '../../shared/constants/action-types'

const feature = (state = initialState.feature, action) => {
  switch (action.type) {
    case actionTypes.FEATURES_GET_SUCCESS:
      return {
        ...state,
        list: action.features,
      }
    default:
      return state
  }
}

export default feature
