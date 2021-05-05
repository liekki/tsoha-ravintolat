import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loginAction } from '../actions/user'

const Login = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.user)

  const { register, handleSubmit, errors } = useForm('login')
  const onErrors = (errors) => console.error(errors)
  const handleLogin = (data) => {
    dispatch(loginAction(data.username, data.password))
  }
  return (
    <>
      <h2>Kirjaudu sisään</h2>

      <p>
        Jos sinulla ei ole tunnusta, voit{' '}
        <Link to="/register" exact>
          rekisteröityä
        </Link>
      </p>

      {state.msg && <p>{state.msg}</p>}

      <form method="post" action="" onSubmit={handleSubmit(handleLogin, onErrors)}>
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
        <input type="password" name="password" ref={register} />
        {errors.password && <p>{errors.password.message}</p>}
        <input name="submit" type="submit" value="Kirjaudu" ref={register} />
      </form>
    </>
  )
}

export default Login
