import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import find from 'lodash/find'

import { updateRestaurantAction } from '../../shared/actions/restaurant'
import FormRestaurant from './FormRestaurant'
import { getRestaurantById } from '../../shared/api/restaurant'

const EditRestaurant = () => {
  const dispatch = useDispatch()
  const { restaurantId } = useParams()

  const [restaurant, setRestaurant] = useState()

  useEffect(async () => {
    const response = await getRestaurantById(restaurantId)
    setRestaurant(response.data)
  }, [])

  const onSubmit = (data, reset) => {
    window.scrollTo(0, 0)
    dispatch(updateRestaurantAction(restaurantId, data))
  }

  return restaurant ? <FormRestaurant values={restaurant} onSubmit={onSubmit} /> : null
}

export default EditRestaurant
