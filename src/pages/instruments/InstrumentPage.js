import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import contactStyles from "../../styles/Contact.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Instrument from "./Instrument";
import BackButton from "../../components/BackButton";
import Contact from "../../components/Contact";
import { useUser } from "../../contexts/UserContext";

function InstrumentPage() {
  const { id } = useParams();
  const [instrument, setInstrument] = useState({ results: [] });
  const user = useUser();

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
      {user && (
        <Row className={contactStyles.Container}>
          <h3 className={contactStyles.Heading}>Contact the seller</h3>
          <Contact />
        </Row>
      )}
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
}

export default InstrumentPage;
