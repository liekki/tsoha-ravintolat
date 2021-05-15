import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { deleteFeatureAction } from '../../shared/actions/feature'

import { Form, Submit } from './Styles'

const DeleteFeature = () => {
  const dispatch = useDispatch()
  const csrfToken = useSelector((state) => state.user.csrfToken)
  const { featureId } = useParams()

  const { register, handleSubmit, setValue } = useForm()

  setValue('csrf_token', csrfToken, { shouldValidate: false })
  setValue('id', featureId, { shouldValidate: false })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    dispatch(deleteFeatureAction(featureId, data))
  }

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <input type="hidden" readOnly {...register('csrf_token')} />
      <input type="hidden" readOnly {...register('id')} />
      <Submit type="submit" value="Poista" style={{ marginLeft: 0 }} />
    </Form>
  )
}
export default DeleteFeature
