import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Row, Td, Th, ControlButton } from './Styles'

import { getRestaurantsAction } from '../../shared/actions/restaurant'

const ListRestaurants = () => {
  const restaurants = useSelector((state) => state.restaurant.list)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRestaurantsAction())
  }, [])

  return (
    <Table>
      <thead>
        <Row>
          <Th>Nimi</Th>
          <Th>Lokaatio</Th>
          <Th>Toiminnot</Th>
        </Row>
      </thead>
      <tbody>
        {restaurants.length > 0 &&
          restaurants.map((r) => {
            return (
              <Row key={r.id}>
                <Td>{r.name}</Td>
                <Td>
                  ({r.latitude},{r.longitude})
                </Td>
                <Td>
                  <ControlButton to={`/admin/edit/${r.id}`}>Muokkaa</ControlButton>
                  <ControlButton to={`/admin/delete/${r.id}`}>Poista</ControlButton>
                </Td>
              </Row>
            )
          })}
      </tbody>
    </Table>
  )
}

export default ListRestaurants
