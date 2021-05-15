import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Table, Row, Td, Th, ControlButton } from './Styles'

const ListFeatures = () => {
  const features = useSelector((state) => state.feature.list)

  return (
    <Table>
      <thead>
        <Row>
          <Th>Nimi</Th>
          <Th>Toiminnot</Th>
        </Row>
      </thead>
      <tbody>
        {features.length > 0 &&
          features.map((f) => {
            return (
              <Row key={f.id}>
                <Td>{f.name}</Td>
                <Td>
                  <ControlButton to={`/admin/feature/edit/${f.id}`}>Muokkaa</ControlButton>
                  <ControlButton to={`/admin/feature/delete/${f.id}`}>Poista</ControlButton>
                </Td>
              </Row>
            )
          })}
      </tbody>
    </Table>
  )
}

export default ListFeatures
