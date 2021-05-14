import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import sortBy from 'lodash/orderBy'
import reverse from 'lodash/reverse'

import { Section, Table, Row, Th, Td } from './Styles'

import { getRestaurantsAction } from  '../../shared/actions/restaurant'

const Top = () => {
  const dispatch = useDispatch()
  const restaurants = useSelector((state) => state.restaurant.list)

  const topRestaurants = reverse(sortBy(restaurants, (r) => r.average_rating || 0))

  useEffect(() => {
    dispatch(getRestaurantsAction())
  }, [])

  return (
    <>
      <Section>
        <div>
          <h1>KSK:n ranking-lista</h1>
        </div>
      </Section>
      <Section>
        <div>
          <p>
            Parhaat kaljapaikat ovat tunnetusti niitä, joissa tuntee olonsa kuin kotonaan. Tätä
            tunnetta me kaikki metsästämme etsiessämme paikkoja juoda kaljaa. KSK:n ranking-listalta
            löydät kaikki vuoden 2021 kuumimmat kaljapaikat!
          </p>
          <Table>
            <thead>
              <Row>
                <Th></Th>
                <Th>Nimi</Th>
                <Th>Arvosanojen ka.</Th>
              </Row>
            </thead>
            <tbody>
              {topRestaurants.length > 0 &&
                topRestaurants.map((r, k) => {
                  return (
                    <Row key={r.id}>
                      <Td>{k + 1}</Td>
                      <Td>
                        <NavLink to={`/view/${r.id}`}>{r.name}</NavLink>
                      </Td>
                      <Td>{r.average_rating}</Td>
                    </Row>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </Section>
    </>
  )
}

export default Top
