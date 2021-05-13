import initialState from './initial-state'
import * as actionTypes from '../constants/action-types'

const restaurant = (state = initialState.restaurant, action) => {
  switch (action.type) {
    case actionTypes.RESTAURANT_ADD:
      return {
        ...state,
        working: true,
      }
    default:
      return state
  }
}

export default restaurant
