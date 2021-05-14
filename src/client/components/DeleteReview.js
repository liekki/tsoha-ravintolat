import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { deleteReviewAction } from '../actions/restaurant'

import { Form, Submit } from './Styles'

const DeleteReview = () => {
  const dispatch = useDispatch()
  const csrfToken = useSelector((state) => state.user.csrfToken)
  let { reviewId } = useParams()

  const { register, handleSubmit, setValue } = useForm()

  setValue('csrf_token', csrfToken, { shouldValidate: false })
  setValue('id', reviewId, { shouldValidate: false })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    dispatch(deleteReviewAction(reviewId, data))
  }

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <input type="hidden" readOnly {...register('csrf_token')} />
      <input type="hidden" readOnly {...register('id')} />
      <Submit type="submit" value="Poista" style={{ marginLeft: 0 }} />
    </Form>
  )
}
export default DeleteReview
