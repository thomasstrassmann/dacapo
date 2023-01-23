import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Container from "react-bootstrap/Container";

import btnStyles from "../../styles/Button.module.css";
import contactStyles from "../../styles/Contact.module.css";
import appStyles from "../../App.module.css";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Wanted from "./Wanted";
import BackButton from "../../components/BackButton";
import { useUser } from "../../contexts/UserContext";
import Contact from "../../components/Contact";
import Asset from "../../components/Asset";

function WantedDetailPage() {
  const { id } = useParams();
  const [wanted, setWanted] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  const user = useUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: wanted }] = await Promise.all([
          axiosReq.get(`/wanted/${id}`),
        ]);
        setWanted({ results: [wanted] });
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
          <h3 className={contactStyles.Heading}>Contact the seeker</h3>
          <Contact query="wanted" />
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
              <Wanted {...wanted.results[0]} wantedDetailPage />
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

export default WantedDetailPage;
