import React from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Card, Media } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";
import { axiosRes } from "../../api/axiosDefaults";

import styles from "../../styles/Instrument.module.css";
import appStyles from "../../App.module.css";
import instrumentsStyles from "../../styles/InstrumentsPage.module.css";
import bookmarks from "../../assets/icons/bookmarks.svg";
import removeBookmarks from "../../assets/icons/bookmark_remove.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { EditDropdown } from "../../components/EditDropdown";
import { capitalize, truncate } from "../../utils/utils";

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
    updated,
    instrumentPage,
    setInstruments,
  } = props;

  const user = useUser();
  const history = useHistory();
  const is_owner = user?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/instruments/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/instruments/${id}/edit`);
  };

  const handleBookmark = async () => {
    try {
      const { data } = await axiosRes.post("/bookmarks/", { instrument: id });
      setInstruments((prevInstruments) => ({
        ...prevInstruments,
        results: prevInstruments.results.map((instrument) => {
          return instrument.id === id
            ? {
                ...instrument,
                bookmarks_count: instrument.bookmarks_count + 1,
                bookmark_id: data.id,
              }
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
            ? {
                ...instrument,
                bookmarks_count: instrument.bookmarks_count - 1,
                bookmark_id: null,
              }
            : instrument;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Card
        className={`${styles.Card} ${
          instrumentPage ? styles.DetailSize : styles.ListSize
        }`}
      >
        <Card.Body>
          <Media className={styles.HeaderContainer}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_avatar} height={`${instrumentPage ? 144 : 48}`} />
              <span className={appStyles.Owner}>{owner}</span>
            </Link>
            <div className={styles.HeaderOptions}>
              <div>Updated:{updated}</div>
              {is_owner && instrumentPage && (
              <div className={styles.Settings}>
                  <EditDropdown
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
                )}
            </div>
          </Media>
        </Card.Body>
        <hr className={styles.Line}></hr>

        {instrumentPage ? (
          <div className={styles.TeaserDetail}>
            <Card.Title>{title}</Card.Title>
            <Card.Img src={image} alt={title} className={styles.Image} />
          </div>
        ) : (
          <Link to={`/instruments/${id}`} className={styles.TeaserList}>
            <Card.Title className={styles.Title}>{truncate(title)}</Card.Title>
            <Card.Img
              src={image}
              alt={title}
              className={instrumentsStyles.Image}
            />
          </Link>
        )}

        <hr className={styles.Line}></hr>
        {instrumentPage && (
          <div className={styles.BookmarkContainer}>
            {bookmark_id ? (
              <div
                onClick={handleRemoveBookmark}
                className={styles.HandleBookmark}
              >
                <img src={removeBookmarks} alt="Remove Bookmark" />
                <span>Remove Bookmark</span>
              </div>
            ) : user ? (
              <div onClick={handleBookmark} className={styles.HandleBookmark}>
                <img src={bookmarks} alt="Bookmark" />
                <span>Bookmark instrument</span>
              </div>
            ) : (
              <p>Log in to bookmark an instrument!</p>
            )}
            <span>Bookmarked in total: {bookmarks_count}</span>
          </div>
        )}
        <Card.Body className={styles.Subtext}>
          {category && (
            <Card.Text>
              <strong>Category:</strong> {capitalize(category)}
            </Card.Text>
          )}
          {brand && (
            <Card.Text>
              <strong>Brand:</strong> {brand}
            </Card.Text>
          )}
          {price && (
            <Card.Text>
              <strong>Price:</strong> {price} €
            </Card.Text>
          )}
          {instrumentPage && description && (
            <Card.Text>
              <strong>Description:</strong> {description}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default Instrument;
