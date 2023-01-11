import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Wanted from "./Wanted";
import Asset from "../../components/Asset";

import searchNull from "../../assets/icons/search_null.svg";
import search from "../../assets/icons/search.svg";

import appStyles from "../../App.module.css";
import styles from "../../styles/WantedListPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMore } from "../../utils/utils";
import { Link } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function WantedListPage({ feedback }) {
  const [wanted, setWanted] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const user = useUser();
  const [query, setQuery] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    const fetchWanted = async () => {
      try {
        const { data } = await axiosReq.get(
          `/wanted/?search=${query}`
        );
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
    <Container>
    <Row className="h-100">
      <Col lg={7}>
        {hasLoaded ? (
          <>
            {wanted.results.length ? (
              <InfiniteScroll
                children={wanted.results.map((item) => (
                  <Wanted
                    key={item.id}
                    {...item}
                  />
                ))}
                dataLength={wanted.results.length}
                loader={<Asset spinner />}
                hasMore={!!wanted.next}
                next={() => fetchMore(wanted, setWanted)}
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
            placeholder="Search for wanted item or user"
          />
        </Form>
        {user && addWantedIcon}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2"></Col>
    </Row>
    </Container>
  );
}

export default WantedListPage;
