import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Instrument from "./Instrument";

function InstrumentPage() {
  const { id } = useParams();
  const [instrument, setInstrument] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: instrument }] = await Promise.all([
          axiosReq.get(`/instruments/${id}`),
        ]);
        setInstrument({ results: [instrument] });
        console.log(instrument);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Instrument {...instrument.results[0]} setInstruments={setInstrument} instrumentPage />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default InstrumentPage;
