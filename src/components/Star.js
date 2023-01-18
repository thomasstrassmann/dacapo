import React from 'react'
import star from "../assets/icons/star.svg";
import appStyles from "../App.module.css";

const Star = () => {
  return (
        <img src={star} alt="Star" className={appStyles.Star} />
      )
}

export default Star