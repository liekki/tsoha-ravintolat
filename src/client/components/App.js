import React from 'react'
import { NavLink as Link, Switch, Route } from 'react-router-dom'

import Login from './Login'
import Register from './Register'

const Home = () => {
  return <div>Etusivu!</div>
}

const About = () => {
  return <div>Bönthöö bönthöö bönthöö!</div>
}

const App = () => {
  return (
    <>
      <div>
        <Link className="link" activeClassName="link--active" to="/" exact={true}>
          etusivu
        </Link>
        <Link className="_link" activeClassName="link--active" to="/about" exact={true}>
          lisätietoa
        </Link>

        <Link className="_link" activeClassName="link--active" to="/login" exact={true}>
          login
        </Link>
      </div>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" exact={true} component={About} />
        <Route path="/login" exact={true} component={Login} />
        <Route path="/register" exact={true} component={Register} />
        <Route component={() => <p>404!</p>} />
      </Switch>
    </>
  )
}

export default App
