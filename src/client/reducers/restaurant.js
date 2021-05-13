import initialState from './initial-state'
import * as actionTypes from '../constants/action-types'

const restaurant = (state = initialState.restaurant, action) => {
  switch (action.type) {
    case actionTypes.RESTAURANT_ADD:
      return {
        ...state,
      }
    case actionTypes.RESTAURANTS_GET_ALL_SUCCESS:
      return {
        ...state,
        list: action.restaurants.data,
      }
    default:
      return state
  }
}

export default restaurant
