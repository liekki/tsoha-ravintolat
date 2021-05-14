import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { loginAction } from '../../shared/actions/user'

import {
  Section,
  Form,
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldErrors,
  Submit,
} from './Styles'

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string(),
})

const Login = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })
  setValue('csrf_token', state.csrfToken, { shouldValidate: false })
  const onErrors = (errors) => console.error(errors)
  const handleLogin = (data) => {
    dispatch(loginAction(data))
  }
  return (
    <>
      <Section>
        <div>
          <h1>Kirjaudu sisään!</h1>
        </div>
      </Section>
      <Section>
        <div>
          <Form method="post" action="/api/login" onSubmit={handleSubmit(handleLogin, onErrors)}>
            <input type="hidden" {...register('csrf_token')} />
            <FormField>
              <FormFieldLabel htmlFor="username">Käyttäjätunnus</FormFieldLabel>
              <FormFieldInput id="username" {...register('username')}></FormFieldInput>
              {errors?.username && <FormFieldErrors>{errors.username.message}</FormFieldErrors>}
            </FormField>
            <FormField>
              <FormFieldLabel htmlFor="password">Salasana</FormFieldLabel>
              <FormFieldInput
                type="password"
                id="password"
                {...register('password')}
              ></FormFieldInput>
              {errors?.password && <FormFieldErrors>{errors.password.message}</FormFieldErrors>}
            </FormField>
            <Submit name="submit" type="submit" value="Kirjaudu" />
          </Form>
          <p>
            Jos sinulla ei ole tunnusta, voit{' '}
            <Link to="/register" exact>
              rekisteröityä
            </Link>
          </p>
        </div>
      </Section>
    </>
  )
}

export default Login
