import React from "react";
import { Button } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";
import arrow_up from "../assets/icons/arrow_up.svg";

const TopButton = React.forwardRef((props, ref) => {
  const toTop = () => {
    ref.current.focus();
  };

  return (
    <>
      <Button
        onClick={toTop}
        className={`d-lg-none ${btnStyles.TopButtonMobile}`}
      >
        <img src={arrow_up} alt="Back to top"></img>
      </Button>

      <Button
        onClick={toTop}
        className={`d-none d-lg-block ${btnStyles.TopButton}`}
      >
        <img src={arrow_up} alt="Back to top"></img>
      </Button>
    </>
  );
});

export default TopButton;
