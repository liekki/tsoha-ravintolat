import React from 'react'
import { NavLink as Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
      <h2>Kirjaudu sisään</h2>

      <p>
        Jos sinulla ei ole tunnusta, voit{' '}
        <Link to="/register" exact>
          rekisteröityä käyttäjäksi
        </Link>
      </p>

      <form method="post" action="">
        Käyttäjätunnus:
        <input type="text" name="username" />
        <br />
        Salasana:
        <input type="password" name="password" />
        <br />
        <input type="submit" value="Kirjaudu" />
      </form>
    </>
  )
}

export default Login
