import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ScrollToTop from './ScrollToTop'
import Header from './Header'
import Page from './Page'

import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import Profile from './Profile'
import Admin from './Admin'
import About from './About'
import Home from './Home'
import Restaurant from './Restaurant'
import Top from './Top'
import Search from './Search'

import { GlobalStyles, Section, Wrapper } from './Styles'

const App = () => {
  return (
    <Wrapper>
      <Header />
      <Page>
        <ScrollToTop />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/about" exact={true} component={About} />
          <Route path="/top" exact={true} component={Top} />
          <Route path="/search" exact={true} component={Search} />
          <Route path="/login" exact={true} component={Login} />
          <Route path="/logout" exact={true} component={Logout} />
          <Route path="/profile" exact={true} component={Profile} />
          <Route path="/view/:restaurantId" component={Restaurant} />
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/register" exact={true} component={Register} />
          <Route component={() => <p>404!</p>} />
        </Switch>
      </Page>
      <GlobalStyles />
    </Wrapper>
  )
}

export default App
