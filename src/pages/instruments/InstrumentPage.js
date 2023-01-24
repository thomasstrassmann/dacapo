import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import contactStyles from "../../styles/Contact.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Instrument from "./Instrument";
import BackButton from "../../components/BackButton";
import Contact from "../../components/Contact";
import Asset from "../../components/Asset";
import { useUser } from "../../contexts/UserContext";
import { useRedirect } from "../../hooks/useRedirect";

function InstrumentPage() {
  useRedirect("loggedOut");
  const { id } = useParams();
  const [instrument, setInstrument] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: instrument }] = await Promise.all([
          axiosReq.get(`/instruments/${id}`),
        ]);
        setInstrument({ results: [instrument] });
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };
    setHasLoaded(false);
    const timeout = setTimeout(() => {
      handleMount();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  const contactForm = (
    <>
      {user && (
        <Row className={contactStyles.Container}>
          <h3 className={contactStyles.Heading}>Contact the seller</h3>
          <Contact query="instruments" />
        </Row>
      )}
    </>
  );

  return (
    <>
      <Row className={`h-100 ${appStyles.Row}`}>
        {hasLoaded ? (
          <>
            <Col>
              <Instrument
                {...instrument.results[0]}
                setInstruments={setInstrument}
                instrumentPage
              />
            </Col>
            <div>{contactForm}</div>
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Row>

      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
}

export default InstrumentPage;
