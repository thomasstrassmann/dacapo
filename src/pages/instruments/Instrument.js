import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";


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
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/instruments/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
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
      // console.log(err);
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
      // console.log(err);
    }
  };

  const handleHover = () => {
    setIsHovered(!isHovered)
  };

  const bookmarkSection = (
    <>
      <div className={styles.BookmarkContainer}>
        {bookmark_id ? (
          <div onClick={handleRemoveBookmark} className={styles.HandleBookmark}>
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
    </>
  );

  return (
    <>
      {instrumentPage ? (
        <Card
          className={`${styles.Card} ${styles.DetailSize}`}>
          <Card.Body>
            <Media className={styles.HeaderContainer}>
              <Link to={`/profiles/${profile_id}`}>
                <Avatar
                  src={profile_avatar}
                  height={144}
                />
                <span className={appStyles.Owner}>{owner}</span>
              </Link>
              <div className={styles.HeaderOptions}>
                <div>Updated:{updated}</div>
                {is_owner && (
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
          <div className={styles.TeaserDetail}>
            <Card.Title>{title}</Card.Title>
            <Card.Img src={image} alt={title} className={styles.Image} />
          </div>
          <div>{bookmarkSection}</div>
          <Card.Body className={styles.SubtextDetail}>
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
                <strong>Price:</strong> {price}€
              </Card.Text>
            )}
            {description && (
              <Card.Text>
                <strong>Description:</strong> {description}
              </Card.Text>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Card
          className={`${styles.Card} ${styles.ListSize} ${isHovered ? styles.AnimateBorder : ""}`} onMouseEnter={handleHover} onMouseLeave={handleHover}>
          <Card.Body className="p-0">
            <Media className={styles.HeaderContainer}>
              <Link to={`/profiles/${profile_id}`}>
                <Avatar
                  src={profile_avatar}
                  height={48}
                />
                <span className={appStyles.Owner}>{owner}</span>
              </Link>
              <div className={styles.HeaderOptions}>
                <div>Updated:{updated}</div>
              </div>
            </Media>
            <hr className={styles.Line}></hr>
            <Link to={`/instruments/${id}`} className={styles.TeaserList}>
              <Card.Title className={styles.Title}>
                {truncate(title)}
              </Card.Title>
              <Card.Img
                src={image}
                alt={title}
                className={instrumentsStyles.Image}
              />
              <div className={styles.Subtext}>
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
                    <strong>Price:</strong> {price}€
                  </Card.Text>
                )}
              </div>
            </Link>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Instrument;
