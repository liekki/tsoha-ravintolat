import React from 'react'
import { useForm } from 'react-hook-form'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Section,
  Form,
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldErrors,
  Submit,
} from './Styles'

import { registerAction } from '../actions/user'

const schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3)
    .max(8)
    .matches(/^[a-z0-9_]+$/),
  password: yup.string().required().min(6),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const Register = () => {
  const dispatch = useDispatch()
  const csrfToken = useSelector((state) => state.user.csrfToken)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  setValue('csrf_token', csrfToken, { shouldValidate: false })

  const onErrors = (errors) => console.error(errors)
  const handleRegistration = (data) => {
    dispatch(registerAction(data))
  }

  return (
    <>
      <Section>
        <div>
          <h1>Rekisteröidy</h1>
        </div>
      </Section>
      <Section>
        <div>
          <Form method="post" action="" onSubmit={handleSubmit(handleRegistration, onErrors)}>
            <input type="hidden" readOnly {...register('csrf_token')} />
            <FormField>
              <FormFieldLabel htmlFor="username">Käyttäjätunnus</FormFieldLabel>
              <FormFieldInput id="username" {...register('username')} />
              {errors?.username && <FormFieldErrors>{errors.username.message}</FormFieldErrors>}
            </FormField>
            <FormField>
              <FormFieldLabel htmlFor="password">Salasana</FormFieldLabel>
              <FormFieldInput type="password" id="password" {...register('password')} />
              {errors?.password && <FormFieldErrors>{errors.password.message}</FormFieldErrors>}
            </FormField>
            <FormField>
              <FormFieldLabel htmlFor="password2">Salasana uudelleen</FormFieldLabel>
              <FormFieldInput type="password" id="password2" {...register('password2')} />
              {errors?.password2 && <FormFieldErrors>{errors.password2.message}</FormFieldErrors>}
            </FormField>
            <Submit name="submit" type="submit" value="Tallenna" />
          </Form>
          <p>
            Jos sinulla on jo tunnus, voit{' '}
            <Link to="/login" exact>
              kirjautua sisään
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}

export default Register
