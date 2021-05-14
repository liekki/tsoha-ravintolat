import initialState from './initial-state'
import * as actionTypes from '../../shared/constants/action-types'

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
    case actionTypes.RESTAURANTS_GET:
      return {
        ...state,
        view: null,
      }
    case actionTypes.RESTAURANTS_GET_SUCCESS:
      return {
        ...state,
        view: action.restaurant.data,
      }
    default:
      return state
  }
}

export default restaurant
