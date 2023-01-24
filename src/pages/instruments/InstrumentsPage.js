import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Instrument from "./Instrument";
import Asset from "../../components/Asset";

import searchNull from "../../assets/icons/search_null.svg";

import styles from "../../styles/InstrumentsPage.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMore } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import TopButton from "../../components/TopButton";
import BackButton from "../../components/BackButton";
import { useRedirect } from "../../hooks/useRedirect";

function InstrumentsPage({ feedback, filter = "", instrumentsPage }) {
  useRedirect("loggedOut");

  const [instruments, setInstruments] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useUser();
  const [query, setQuery] = useState("");
  const top = React.createRef();

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
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timeout = setTimeout(() => {
      fetchInstruments();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, pathname, filter, user]);

  const addInstrumentIcon = (
    <Link className={styles.AddInstrument} to="/instruments/create">
      Add instrument
    </Link>
  );

  return (
    <>
      <Container className={styles.SearchAddContainer}>
        <Row className="d-flex justify-content-center">
          <Col lg={8}>
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                placeholder="Search for instruments, brands or users"
                ref={top}
              />
            </Form>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center">
            {user && instrumentsPage && addInstrumentIcon}
          </Col>
        </Row>
      </Container>

      <Container className={appStyles.ScrollContainer}>
        {hasLoaded ? (
          <>
            {instruments.results.length ? (
              <InfiniteScroll
                style={{
                  display: "flex",
                  overflow: "hidden",
                  flexWrap: "wrap",
                  gap: "80px",
                  width: "100%",
                  justifyContent: "center",
                }}
                children={instruments.results.map((instrument) => (
                  <Instrument
                    key={instrument.id}
                    {...instrument}
                    setInstruments={setInstruments}
                    style={{ width: "300px" }}
                  />
                ))}
                dataLength={instruments.results.length}
                loader={<Asset spinner />}
                hasMore={!!instruments.next}
                next={() => fetchMore(instruments, setInstruments)}
              />
            ) : (
              <Container>
                <Asset src={searchNull} feedback={feedback} />
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Container>
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
        <TopButton ref={top} />
      </div>
    </>
  );
}

export default InstrumentsPage;
