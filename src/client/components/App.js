import React from 'react'
import { NavLink as Link, Switch, Route } from 'react-router-dom'

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
      </div>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/about" exact={true} component={About} />
      </Switch>
    </>
  )
}

export default App
