import React from 'react'
import { useDispatch } from 'react-redux'

import { addRestaurantAction } from '../../shared/actions/restaurant'
import FormRestaurant from './FormRestaurant'

import { history } from '../../shared/store'

const AddRestaurant = () => {
  const dispatch = useDispatch()
  const onSubmit = (data, reset) => {
    history.push('/admin')
    dispatch(addRestaurantAction(data))
  }

  return <FormRestaurant onSubmit={onSubmit} />
}

export default AddRestaurant
