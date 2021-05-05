import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { registerAction } from '../actions/user'

const Register = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.user)

  const { register, handleSubmit, watch, errors } = useForm()
  const onErrors = (errors) => console.error(errors)
  const handleRegistration = (data) => {
    dispatch(registerAction(data.username, data.password))

    console.log(data)
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
          <input
            type="text"
            name="username"
            ref={register({
              required: 'You must specify a username',
              minLength: {
                value: 3,
                message: 'Username must have at least 3 characters',
              },
              validate: (value) =>
                (value.length >= 3 && value.match(/^[a-z0-9_\-A-Z]+$/)) ||
                'Username must match ^[a-z0-9_-A-Z]+$',
            })}
          />
          {errors.username && <p>{errors.username.message}</p>}
          <br />
          Salasana:
          <input
            type="password"
            name="password"
            ref={register({
              required: 'You must specify a password',
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            })}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <br />
          Salasana uudelleen:
          <input
            type="password"
            name="password2"
            ref={register({
              validate: (value) => value === password.current || 'The passwords do not match',
            })}
          />
          {errors.password2 && <p>{errors.password2.message}</p>}
          <br />
          <input name="submit" type="submit" value="Kirjaudu" ref={register} />
        </form>
      )}
    </>
  )
}

export default Register
