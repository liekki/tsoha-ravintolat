import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Table, Row, Td, Th } from './Styles'

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
                  <Link to={`/admin/feature/edit/${f.id}`}>edit</Link> /{' '}
                  <Link to={`/admin/feature/delete/${f.id}`}>delete</Link>
                </Td>
              </Row>
            )
          })}
      </tbody>
    </Table>
  )
}

export default ListFeatures
