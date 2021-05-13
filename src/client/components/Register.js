import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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
  const state = useSelector((state) => state.user)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onErrors = (errors) => console.error(errors)
  const handleRegistration = (data) => {
    dispatch(registerAction(data.username, data.password))
  }

  const password = useRef({})
  password.current = watch('password', '')

  return (
    <>
      <h2>Rekisteröidy</h2>

      {state.msg && <p>{state.msg}</p>}

      <p>
        Jos sinulla on jo tunnus, voit{' '}
        <Link to="/login" exact>
          kirjautua sisään
        </Link>
      </p>

      {state.loading ? (
        <div>Ladataan</div>
      ) : (
        <form method="post" action="" onSubmit={handleSubmit(handleRegistration, onErrors)}>
          Käyttäjätunnus:
          <input {...register('username')} />
          {errors.username && <p>{errors.username.message}</p>}
          <br />
          Salasana:
          <input type="password" {...register('password')} />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          Salasana uudelleen:
          <input type="password" {...register('password2')} />
          {errors.password2 && <p>{errors.password2.message}</p>}
          <br />
          <input name="submit" type="submit" value="Tallenna" />
        </form>
      )}
    </>
  )
}

export default Register
