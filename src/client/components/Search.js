import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import sortBy from 'lodash/orderBy'
import reverse from 'lodash/reverse'
import styled from 'styled-components'

import { Section, Table, Row, Th, Td, FormField, FormFieldLabel, FormFieldInput } from './Styles'

import { getRestaurantsAction } from '../actions/restaurant'

const SearchBox = styled(FormFieldInput)``

const Field = styled(FormField)`
  max-width: 500px;
  margin: 0 auto;
`

const Search = () => {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('')
  const restaurants = useSelector((state) => state.restaurant.list).filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.description.toLowerCase().includes(filter.toLowerCase())
  )
  const topRestaurants = reverse(sortBy(restaurants, (r) => r.average_rating || 0))

  useEffect(() => {
    dispatch(getRestaurantsAction())
  }, [])

  return (
    <>
      <Section>
        <div>
          <h1>Hae suosikkiravintolaasi Kumpulasta!</h1>
        </div>
      </Section>
      <Section>
        <div>
          <Field>
            <FormFieldLabel htmlFor="search">Syötä hakusanat</FormFieldLabel>
            <SearchBox
              id="search"
              type="text"
              value={filter}
              onChange={(evt) => setFilter(evt.target.value)}
            />
          </Field>
          {topRestaurants.length > 0 && (
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
          )}
        </div>
      </Section>
    </>
  )
}

export default Search
