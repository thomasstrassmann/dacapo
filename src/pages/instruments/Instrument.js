import React from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Card, Media } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";
import { axiosRes } from "../../api/axiosDefaults";

import bookmarks from "../../assets/icons/bookmarks.svg";
import removeBookmarks from "../../assets/icons/bookmark_remove.svg";

const Instrument = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_avatar,
    bookmarks_count,
    bookmark_id,
    title,
    description,
    brand,
    image,
    price,
    category,
    created,
    updated,
    instrumentPage,
    setInstruments,
  } = props;

  const user = useUser();
  const is_owner = user?.username === owner;

  const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { instrument: id });
      setInstruments((prevInstruments) => ({
        ...prevInstruments,
        results: prevInstruments.results.map((instrument) => {
          return instrument.id === id
            ? { ...instrument, bookmarks_count: instrument.bookmarks_count + 1, bookmark_id: data.id }
            : instrument;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveBookmark = async () => {
    try {
      await axiosRes.delete(`/bookmarks/${bookmark_id}/`);
      setInstruments((prevInstruments) => ({
        ...prevInstruments,
        results: prevInstruments.results.map((instrument) => {
          return instrument.id === id
            ? { ...instrument, bookmarks_count: instrument.bookmarks_count - 1, bookmark_id: null }
            : instrument;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
    <Card.Body>
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_avatar} height={55} />
          {owner}
        </Link>
        <div>
         <span>Created:{created}</span>
          <span>Updated:{updated}</span>
          {is_owner && instrumentPage && "..."}
        </div>
      </Media>
    </Card.Body>

    <Link to={`/instruments/${id}`}>
      <Card.Img src={image} alt={title} />
    </Link>

    <Card.Body>
      {title && <Card.Title>{title}</Card.Title>}
      {category && <Card.Text>Category: {category}</Card.Text>}
      {brand && <Card.Text>Brand: {brand}</Card.Text>}
      {description && <Card.Text>{description}</Card.Text>}
      {price && <Card.Text>Price: {price}</Card.Text>}

      <div>
          {bookmark_id ? (
          <span onClick={handleRemoveBookmark}>
            <img src={removeBookmarks} alt="Remove Bookmark" /><span>Remove Bookmark</span>
          </span>
        ) : user ? (
          <span onClick={handleBookmark}>
            <img src={bookmarks} alt="Bookmark" /><span>Bookmark instrument</span>
          </span>
        ) : (
            <p>Log in to bookmark an instrument!</p>
        )}
        <p>Bookmarked in total: {bookmarks_count}</p>
      </div>
    </Card.Body>
  </Card>
);
};

export default Instrument;