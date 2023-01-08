import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Instrument from "./Instrument";
import Asset from "../../components/Asset";

import searchNull from "../../assets/icons/search_null.svg";
import appStyles from "../../App.module.css";
import styles from "../../styles/InstrumentsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";


function InstrumentsPage({ message, filter = "" }) {

  const [instruments, setInstruments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const { data } = await axiosReq.get(`/instruments/?${filter}`);
        setInstruments(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchInstruments();
  }, [pathname, filter]);


  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {instruments.results.length ? (
              instruments.results.map((instrument) => (
                <Instrument key={instrument.id} {...instrument} setInstruments={setInstruments} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={searchNull} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default InstrumentsPage;