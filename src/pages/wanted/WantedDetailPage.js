import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Wanted from "./Wanted";

function WantedDetailPage() {
  const { id } = useParams();
  const [wanted, setWanted] = useState({ results: [] });

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
    <Row className="h-100">
      <Col lg={10}>
        <Wanted {...wanted.results[0]} wantedDetailPage />
      </Col>
    </Row>
  );
}

export default WantedDetailPage;
