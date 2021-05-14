import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import StarRatings from 'react-star-ratings'

import { getRestaurantById, features as getFeatures } from '../api/restaurant'
import { getRestaurantAction, addReviewAction } from '../actions/restaurant'

import FormReview from './FormReview'

import { Section } from './Styles'

import { history } from '../store'

const Restaurant = () => {
  let { restaurantId } = useParams()
  const restaurant = useSelector((state) => state.restaurant.view)
  const [features, setFeatures] = useState()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.identity)

  useEffect(async () => {
    const features = await getFeatures()
    setFeatures(features?.features)
    dispatch(getRestaurantAction(restaurantId))
  }, [])

  const onSubmit = (data, reset, setRating) => {
    reset()
    setRating(0)
    window.scrollTo(0, 0)
    dispatch(addReviewAction(restaurantId, data))
  }

  return restaurant && features ? (
    <>
      <Section>
        <div>
          <h1>
            {restaurant.name}
            <br />{' '}
            <StarRatings
              rating={parseFloat(restaurant.average_rating) || 0}
              starDimension="40px"
              starSpacing="5px"
              starRatedColor="#FFCD3A"
            />
          </h1>
        </div>
      </Section>
      <Section>
        <div>
          <table>
            <tbody>
              <tr>
                <th>Ravintolan kuvaus</th>
                <td>{restaurant.description}</td>
              </tr>
              <tr>
                <th>Oikeudet</th>
                <td>{restaurant.rights}</td>
              </tr>
              <tr>
                <th>Ominaisuudet</th>
                <td>
                  {features
                    .filter((f) => restaurant.features[f.id])
                    .map((f) => f.name)
                    .join(', ')}
                </td>
              </tr>
              <tr>
                <th>Arvostelujen ka.</th>
                <td>
                  {restaurant.reviews.length > 0 ? (
                    <span>
                      {restaurant.average_rating} ({restaurant.reviews.length} kpl)
                    </span>
                  ) : (
                    <span>
                      <em>Ei arvosteluja</em>
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>
      <Section>
        <div>
          <h2>Kommentit ja arviot</h2>
          {restaurant.reviews.length > 0 ? (
            restaurant.reviews.map((r) => {
              return (
                <React.Fragment key={r.id}>
                  <StarRatings
                    rating={parseInt(r.rating)}
                    starDimension="15px"
                    starSpacing="0px"
                    starRatedColor="#FFCD3A"
                  />
                  <p>
                    &quot;{r.comment}&quot; -<em>{r.username}</em>
                    <br />
                    {user?.is_admin && (
                      <NavLink to={`/admin/review/edit/${r.id}`}>poista kommentti</NavLink>
                    )}
                  </p>
                </React.Fragment>
              )
            })
          ) : (
            <p>
              <em>Ei arvosteluja</em>
            </p>
          )}
          <h2>Arvioi ravintola</h2>
          {user ? (
            <FormReview onSubmit={onSubmit} />
          ) : (
            <p>
              <NavLink to="/login">Kirjaudu sisään</NavLink> arvioidaksesi ravintoloita
            </p>
          )}
        </div>
      </Section>
    </>
  ) : null
}

export default Restaurant
