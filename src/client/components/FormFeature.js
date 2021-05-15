import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'

import * as schema from '../../shared/schema'

import { Form, FormField, FormFieldLabel, FormFieldInput, FormFieldErrors, Submit } from './Styles'

const FormFeature = ({ onSubmit, values }) => {
  const csrfToken = useSelector((state) => state.user.csrfToken)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema.feature),
  })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    onSubmit(data, reset)
  }

  useEffect(() => {
    setValue('csrf_token', csrfToken, { shouldValidate: false })
    if (values) {
      reset(values)
    }
  }, [])

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <input type="hidden" {...register('csrf_token')} />
      <FormField>
        <FormFieldLabel htmlFor="name">Ominaisuus</FormFieldLabel>
        <FormFieldInput id="name" {...register('name')}></FormFieldInput>
        {errors?.name && <FormFieldErrors>{errors.name.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <Submit type="submit" value="Tallenna" />
      </FormField>
    </Form>
  )
}

export default FormFeature
