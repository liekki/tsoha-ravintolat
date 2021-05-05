import React from 'react'
import { NavLink as Link, Switch, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import { logoutAction } from '../actions/user'
import { history } from '../store'

const Home = () => {
  return <div>Etusivu!</div>
}

const About = () => {
  return <div>Bönthöö bönthöö bönthöö!</div>
}

const App = () => {
  const user = useSelector((state) => state.user?.identity)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <Link className="link" activeClassName="link--active" to="/" exact={true}>
          etusivu
        </Link>
        <Link className="_link" activeClassName="link--active" to="/about" exact={true}>
          lisätietoa
        </Link>
        {user ? (
          <Link className="_link" activeClassName="link--active" to="/logout" exact={true}>
            logout
          </Link>
        ) : (
          <Link className="_link" activeClassName="link--active" to="/login" exact={true}>
            login
          </Link>
        )}
      </div>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" exact={true} component={About} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/logout" exact={true} component={Logout} />
        <Route path="/register" exact={true} component={Register} />
        <Route component={() => <p>404!</p>} />
      </Switch>
    </>
  )
}

export default App
