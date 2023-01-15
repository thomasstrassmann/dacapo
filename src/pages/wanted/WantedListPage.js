import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Wanted from "./Wanted";
import Asset from "../../components/Asset";

import searchNull from "../../assets/icons/search_null.svg";

import appStyles from "../../App.module.css";
import styles from "../../styles/WantedListPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMore } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import TopButton from "../../components/TopButton";

function WantedListPage({ feedback }) {
  const [wanted, setWanted] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useUser();
  const [query, setQuery] = useState("");
  const top = React.createRef();

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchWanted = async () => {
      try {
        const { data } = await axiosReq.get(`/wanted/?search=${query}`);
        setWanted(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timeout = setTimeout(() => {
      fetchWanted();
    }, 800);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, pathname]);

  const addWantedIcon = (
    <Link className={styles.AddWanted} to="/wanted/create">
      Add Wanted
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
                placeholder="Search for wanted item or user"
                ref={top}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            {user && addWantedIcon}
          </Col>
        </Row>
      </Container>

      <Container>
        {hasLoaded ? (
          <>
            {wanted.results.length ? (
              <InfiniteScroll
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "80px",
                  width: "100%",
                  justifyContent: "center",
                }}
                children={wanted.results.map((item) => (
                  <Wanted key={item.id} {...item} />
                ))}
                dataLength={wanted.results.length}
                loader={<Asset spinner />}
                hasMore={!!wanted.next}
                next={() => fetchMore(wanted, setWanted)}
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
      <TopButton ref={top}/>
    </>
  );
}

export default WantedListPage;
