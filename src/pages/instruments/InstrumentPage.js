import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import appStyles from "../../App.module.css";
import { axiosReq } from "../../api/axiosDefaults";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Instrument() {
  const [instrument, setInstrument] = useState({ results: [] });
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: instrument }] = await Promise.all([
          axiosReq.get(`/instruments/${id}`),
        ]);
        setInstrument({ results: [instrument] });
        console.log(instrument);
      } catch (err) {
        console.log(instrument);
      }
    };
    handleMount();
  }, [id, instrument]);

  return (
    <>
      <p>Instrument component</p>
    </>
  );
}

export default Instrument;
