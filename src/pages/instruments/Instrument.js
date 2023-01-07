import React from "react";
import styles from "../../styles/Post.module.css";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";


const Instrument = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_avatar,
    bookmarks_count,
    bookmarks_id,
    title,
    description,
    image,
    price,
    category,
    created,
    updated,
    instrumentPage,
  } = props;

  const user = useUser();
  const is_owner = user?.username === owner;

  return (
    <>
    </>
  );
};

export default Instrument;