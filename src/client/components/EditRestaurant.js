import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import find from 'lodash/find'

import { updateRestaurantAction } from '../actions/restaurant'
import FormRestaurant from './FormRestaurant'
import { getRestaurantById } from '../api/restaurant'

const EditRestaurant = () => {
  const dispatch = useDispatch()
  let { restaurantId } = useParams()

  const [restaurant, setRestaurant] = useState()

  useEffect(async () => {
    const response = await getRestaurantById(restaurantId)
    setRestaurant(response.data)
  }, [])

  if (!restaurant) return null

  const onSubmit = (data, reset) => {
    window.scrollTo(0, 0)
    dispatch(updateRestaurantAction(restaurantId, data))
  }

  return <FormRestaurant values={restaurant} onSubmit={onSubmit} />
}

export default EditRestaurant
