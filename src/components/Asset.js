import React from "react";
import styles from "../styles/Asset.module.css";
import Spinner from "react-bootstrap/Spinner";

const Asset = ({ spinner, src, feedback }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="grow" variant="danger" />}
      {src && <img src={src} alt={feedback} />}
      {feedback && <p className="mt-4 text-center">{feedback}</p>}
    </div>
  );
};

export default Asset;