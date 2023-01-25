import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Wanted from "./Wanted";
import Asset from "../../components/Asset";

import searchNull from "../../assets/icons/search_null.svg";

import styles from "../../styles/WantedListPage.module.css";
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

function WantedListPage({ feedback }) {
  useRedirect("loggedOut");
  
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
      Add wanted
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
                placeholder="Search for wanted item, brands or user"
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

      <Container className={appStyles.ScrollContainer}>
        {hasLoaded ? (
          <>
            {wanted.results.length ? (
              <InfiniteScroll
                style={{
                  display: "flex",
                  overflow: "hidden",
                  flexWrap: "wrap",
                  gap: "80px",
                  width: "100%",
                  justifyContent: "center",
                }}
                children={wanted.results.map((item) => (
                  <Wanted key={item.id} {...item} style={{ width: "300px" }} />
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
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
        <TopButton ref={top} />
      </div>
    </>
  );
}

export default WantedListPage;
