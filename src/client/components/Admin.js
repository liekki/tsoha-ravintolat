import React from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Section, SubMenu, SubMenuItem } from './Styles'

import AddRestaurant from './AddRestaurant'
import EditRestaurant from './EditRestaurant'
import ListRestaurants from './ListRestaurants'
import DeleteRestaurant from './DeleteRestaurant'
import DeleteReview from './DeleteReview'
import ListFeatures from './ListFeatures'
import AddFeature from './AddFeature'
import EditFeature from './EditFeature'
import DeleteFeature from './DeleteFeature'

const Admin = () => {
  const user = useSelector((state) => state.user?.identity)
  if (!user.is_admin) return null
  const { path, url } = useRouteMatch()

  return (
    <>
      <Section>
        <div>
          <h1>Hei, {user.username}!</h1>
        </div>
      </Section>
      <Section>
        <div>
          <SubMenu>
            <SubMenuItem>
              <Link to={`${url}`}>Listaa ravintolat</Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to={`${url}/new`}>Lisää uusi ravintola</Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to={`${url}/feature`}>Listaa ominaisuudet</Link>
            </SubMenuItem>
            <SubMenuItem>
              <Link to={`${url}/feature/new`}>Lisää uusi ominaisuus</Link>
            </SubMenuItem>
          </SubMenu>
          <Switch>
            <Route exact path={path}>
              <ListRestaurants />
            </Route>
            <Route path={`${path}/edit/:restaurantId`}>
              <h2>Muokkaa ravintolaa</h2>
              <EditRestaurant />
            </Route>
            <Route path={`${path}/delete/:restaurantId`}>
              <h2>Poista ravintola</h2>
              <DeleteRestaurant />
            </Route>
            <Route path={`${path}/new`}>
              <h2>Lisää ravintola</h2>
              <AddRestaurant />
            </Route>
            <Route path={`${path}/review/edit/:reviewId`}>
              <h2>Poista kommentti</h2>
              <DeleteReview />
            </Route>
            <Route path={`${path}/feature`} exact>
              <ListFeatures />
            </Route>
            <Route path={`${path}/feature/new`} exact>
              <h2>Lisää ominaisuus</h2>
              <AddFeature />
            </Route>
            <Route path={`${path}/feature/edit/:featureId`}>
              <h2>Muokkaa ominaisuutta</h2>
              <EditFeature />
            </Route>
            <Route path={`${path}/feature/delete/:featureId`}>
              <h2>Poista ominaisuus</h2>
              <DeleteFeature />
            </Route>
          </Switch>
        </div>
      </Section>
    </>
  )
}

export default Admin
