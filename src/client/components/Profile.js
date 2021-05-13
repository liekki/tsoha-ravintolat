import React from 'react'
import { useSelector } from 'react-redux'
import { Section } from './Styles'

import FormAddRestaurant from './FormAddRestaurant'

const Profile = () => {
  const user = useSelector((state) => state.user?.identity)
  return (
    <>
      <Section>
        <div>
          <h1>Hei, {user.username}!</h1>
        </div>
      </Section>
      <Section>
        <div>
          {user.is_admin && (
            <>
              <p>Koska olet pääkäyttäjä, voit tältä sivulta hallita järjestelmän ravintoloita.</p>

              <h2>Lisää ravintola</h2>
              <FormAddRestaurant />
            </>
          )}
        </div>
      </Section>
    </>
  )
}

export default Profile
