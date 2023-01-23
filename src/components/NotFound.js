import React from "react";
import search_null from "../assets/icons/search_null.svg";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={search_null}
        feedback={`We are sorry, but this page does not exist. Please check the url!`}
      />
    </div>
  );
};

export default NotFound;