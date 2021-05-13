import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Message = styled.div`
  padding: 10px;
  border: 2px solid #007ac9;
  background: #c0e6ff;
`

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px 42px;
  line-height: 1.5;
`

const Page = (props) => {
  const messages = useSelector((state) => state.message.stack)

  return (
    <div>
      {messages.length > 0 && (
        <Container>
          {messages.map((m) => (
            <Message>{m}</Message>
          ))}
        </Container>
      )}
      <div>{props.children}</div>
    </div>
  )
}

export default Page
