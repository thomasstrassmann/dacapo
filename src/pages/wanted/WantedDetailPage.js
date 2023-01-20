import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import btnStyles from "../../styles/Button.module.css";
import contactStyles from "../../styles/Contact.module.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Wanted from "./Wanted";
import BackButton from "../../components/BackButton";
import { useUser } from "../../contexts/UserContext";
import Contact from "../../components/Contact";

function WantedDetailPage() {
  const { id } = useParams();
  const [wanted, setWanted] = useState({ results: [] });
  const user = useUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: wanted }] = await Promise.all([
          axiosReq.get(`/wanted/${id}`),
        ]);
        setWanted({ results: [wanted] });
        console.log(wanted);
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
          <Wanted {...wanted.results[0]} wantedDetailPage />
        </Col>
        {user && (
          <Row className={contactStyles.Container}>
            <h3 className={contactStyles.Heading}>Contact the seller</h3>
            <Contact query="wanted"/>
          </Row>
        )}
      </Row>
      <div className={btnStyles.NavButtonsContainer}>
        <BackButton />
      </div>
    </>
  );
}

export default WantedDetailPage;
