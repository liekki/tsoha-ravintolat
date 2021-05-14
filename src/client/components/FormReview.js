import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'
import StarRatings from 'react-star-ratings'
import styled from 'styled-components'

import * as schema from '../../shared/schema'

import {
  Form,
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldTextarea,
  FormFieldErrors,
  FormFieldNote,
  FormFieldSelect,
  FormFieldOption,
  FormFieldCheckboxCollection,
  FormFieldCheckboxContainer,
  FormFieldCheckbox,
  Submit,
} from './Styles'

const StarRatingContainer = styled.div`
  flex-basis: 70%;
`

const FormReview = ({ onSubmit, values }) => {
  const csrfToken = useSelector((state) => state.user.csrfToken)
  const [rating, setRating] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema.review),
  })

  setValue('csrf_token', csrfToken, { shouldValidate: false })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    onSubmit(data, reset, setRating)
  }

  const changeRating = (rating) => {
    setValue('rating', rating)
    setRating(rating)
  }

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <input type="hidden" {...register('csrf_token')} defaultValue={0} />
      <FormField>
        <FormFieldLabel htmlFor="comment">Arviosi</FormFieldLabel>
        <FormFieldInput type="hidden" {...register('rating')} />
        <StarRatingContainer>
          <StarRatings
            rating={rating}
            starDimension="40px"
            starSpacing="5px"
            starRatedColor="#FFCD3A"
            starHoverColor="#e0a909"
            changeRating={changeRating}
          />
        </StarRatingContainer>
        {errors?.rating && <FormFieldErrors>{errors.rating.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="comment">Kommentti</FormFieldLabel>
        <FormFieldTextarea id="comment" {...register('comment')}></FormFieldTextarea>
        {errors?.comment && <FormFieldErrors>{errors.comment.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <Submit type="submit" value="Tallenna" />
      </FormField>
    </Form>
  )
}

export default FormReview
