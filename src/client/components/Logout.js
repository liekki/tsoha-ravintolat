import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { logoutAction } from '../actions/user'
import { history } from '../store'

const Logout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logoutAction())
    history.push('/')
  })

  return <h2>Kirjaudutaan ulos</h2>
}

export default Logout
