import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfilesOverview from "../profiles/ProfilesOverview";

const Trending = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <ProfilesOverview/>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Trending;
