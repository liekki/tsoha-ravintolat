import React, { useEffect } from 'react'
import { NavLink, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Section, SubMenu, SubMenuItem } from './Styles'

import { getRestaurantsAction } from '../actions/restaurant'

import AddRestaurant from './AddRestaurant'
import EditRestaurant from './EditRestaurant'
import ListRestaurants from './ListRestaurants'
import DeleteRestaurant from './DeleteRestaurant'
import DeleteReview from './DeleteReview'

const Profile = () => {
  const user = useSelector((state) => state.user?.identity)
  if (!user.is_admin) return null

  const restaurants = useSelector((state) => state.restaurant.list)
  const { path, url } = useRouteMatch()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRestaurantsAction())
  }, [])

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
          </SubMenu>
          <Switch>
            <Route exact path={path}>
              <ListRestaurants restaurants={restaurants} />
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
          </Switch>
        </div>
      </Section>
    </>
  )
}

export default Profile
