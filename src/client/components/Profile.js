import React from 'react'
import { useSelector } from 'react-redux'
import { Section } from './Styles'

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
        <div>😎</div>
      </Section>
    </>
  )
}

export default Profile
