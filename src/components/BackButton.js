import React from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import btnStyles from "../styles/Button.module.css";
import arrow_back from "../assets/icons/arrow_back.svg";

const BackButton = (props) => {
  const history = useHistory();

  return (
    <>
      <Button
        onClick={history.goBack}
        className={`d-flex ${btnStyles.BackButton}`}
      >
        <img src={arrow_back} alt="Go back"></img>
      </Button>
    </>
  );
};

export default BackButton;
