import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css"


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Instrument from "./Instrument";
import BackButton from "../../components/BackButton";

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
    <>
      <Row className="h-100">
        <Col>
          <Instrument
            {...instrument.results[0]}
            setInstruments={setInstrument}
            instrumentPage
          />
        </Col>
      </Row>
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
}

export default InstrumentPage;
