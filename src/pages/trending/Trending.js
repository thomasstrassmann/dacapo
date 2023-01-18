import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProfilesOverview from '../profiles/ProfilesOverview'

const Trending = () => {
    return (
    <>
    <Container>
        <Row>
            <ProfilesOverview/>
        </Row>
    </Container>
    </>
  )
}

export default Trending;