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
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function InstrumentsPage({ feedback, filter = "", instrumentsPage }) {
  const [instruments, setInstruments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useUser();
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

  const addInstrumentIcon = (
    <Link className={styles.AddInstrument} to="/instruments/create">
      Add Instrument
    </Link>
  );

  return (
    <Container>
    <Row className="h-100">
      <Col lg={7}>
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

      <Col lg={5} className={styles.fixedNavigation}>
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
        {user && instrumentsPage && addInstrumentIcon}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
    </Container>
  );
}

export default InstrumentsPage;
