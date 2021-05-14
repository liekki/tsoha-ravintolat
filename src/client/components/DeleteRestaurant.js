import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import find from 'lodash/find'

import { deleteRestaurantAction } from  '../../shared/actions/restaurant'
import { getRestaurantById } from '../../shared/api/restaurant'

import { Form, FormField, FormFieldInput, FormFieldLabel, Submit } from './Styles'

const DeleteRestaurant = () => {
  const dispatch = useDispatch()
  const csrfToken = useSelector((state) => state.user.csrfToken)
  let { restaurantId } = useParams()

  const { register, handleSubmit, setValue } = useForm()

  setValue('csrf_token', csrfToken, { shouldValidate: false })
  setValue('id', restaurantId, { shouldValidate: false })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    dispatch(deleteRestaurantAction(data))
  }

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <input type="hidden" readOnly {...register('csrf_token')} />
      <input type="hidden" readOnly {...register('id')} />
      <Submit type="submit" value="Poista" style={{ marginLeft: 0 }} />
    </Form>
  )
}
export default DeleteRestaurant
