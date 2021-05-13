import React, { useEffect, useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { loginAction } from '../actions/user'

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
  } = useForm({
    resolver: yupResolver(schema),
  })
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

      <form method="post" action="/api/login" onSubmit={handleSubmit(handleLogin, onErrors)}>
        Käyttäjätunnus:
        <input {...register('username')} />
        {errors.username && <p>{errors.username.message}</p>}
        <br />
        Salasana:
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
        <input name="submit" type="submit" value="Kirjaudu" />
      </form>
    </>
  )
}

export default Login
