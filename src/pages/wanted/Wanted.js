import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { Card, Media } from "react-bootstrap";
import { useUser } from "../../contexts/UserContext";
import { axiosRes } from "../../api/axiosDefaults";

import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { EditDropdown } from "../../components/EditDropdown";
import { capitalize, truncate } from "../../utils/utils";

import styles from "../../styles/Instrument.module.css";
import appStyles from "../../App.module.css";

const Wanted = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_avatar,
    title,
    description,
    category,
    updated,
    wantedDetailPage,
  } = props;

  const user = useUser();
  const history = useHistory();
  const [isHovered, setIsHovered] = useState(false);
  const is_owner = user?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/wanted/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = () => {
    history.push(`/wanted/${id}/edit`);
  };

  const handleHover = () => {
    setIsHovered(!isHovered)
  };

  return (
    <>
      <Card
        className={`${styles.Card} ${wantedDetailPage ? styles.DetailSize : styles.ListSize}
          ${isHovered && !wantedDetailPage ? styles.AnimateBorder : ""}`} onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <Card.Body className="p-0">
          <Media className={styles.HeaderContainer}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_avatar} height={144} />
              <span className={appStyles.Owner}>{owner}</span>
            </Link>
            <div className={styles.HeaderOptions}>
              <span>Updated:{updated}</span>
              {is_owner && wantedDetailPage && (
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

        {wantedDetailPage ? (
          <div className={styles.TeaserDetail}>
            <Card.Title>{title}</Card.Title>
            <div className={`${styles.WantedInfo} ${styles.Subtext}`}>
              <p>
                <strong>Category:</strong> {category && capitalize(category)}
              </p>
              <p>
                <strong>Description:</strong> {description}
              </p>
          </div>
          </div>
        ) : (
          <Link to={`/wanted/${id}`}>
            <div className={styles.WantedInfo}>
              <Card.Title className={styles.Title}>
                {title && truncate(title)}
              </Card.Title>
              <Card.Text className={` p-0 ${styles.Subtext}`}>
                <strong>Category:</strong> {category && capitalize(category)}
              </Card.Text>
            </div>
          </Link>
        )}
      </Card>
    </>
  );
};

export default Wanted;
