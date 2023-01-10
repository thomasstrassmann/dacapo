import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Instrument from "./Instrument";
import Asset from "../../components/Asset";

import searchNull from "../../assets/icons/search_null.svg";
import search from "../../assets/icons/search.svg";

import appStyles from "../../App.module.css";
import styles from "../../styles/InstrumentsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMore } from "../../utils/utils";

function InstrumentsPage({ feedback, filter = "" }) {
  const [instruments, setInstruments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [query, setQuery] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const { data } = await axiosReq.get(
          `/instruments/?${filter}search=${query}`
        );
        setInstruments(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timeout = setTimeout(() => {
      fetchInstruments();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, pathname, filter]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <img src={search} className={styles.SearchIcon} alt="Search" />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search for instruments or members"
          />
        </Form>

        {hasLoaded ? (
          <>
            {instruments.results.length ? (
              <InfiniteScroll
                children={instruments.results.map((instrument) => (
                  <Instrument
                    key={instrument.id}
                    {...instrument}
                    setInstruments={setInstruments}
                  />
                ))}
                dataLength={instruments.results.length}
                loader={<Asset spinner />}
                hasMore={!!instruments.next}
                next={() => fetchMore(instruments, setInstruments)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={searchNull} feedback={feedback} />
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
    
      </Col>
    </Row>
  );
}

export default InstrumentsPage;
