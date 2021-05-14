import React from 'react'
import { Link } from 'react-router-dom'

const ListRestaurants = ({ restaurants }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nimi</th>
          <th>Lokaatio</th>
          <th>Toiminnot</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.length > 0 &&
          restaurants.map((r) => {
            return (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>
                  ({r.latitude},{r.longitude})
                </td>
                <td>
                  <Link to={`/admin/edit/${r.id}`}>edit</Link> /{' '}
                  <Link to={`/admin/delete/${r.id}`}>delete</Link>
                </td>
              </tr>
            )
          })}
      </tbody>
    </table>
  )
}

export default ListRestaurants
