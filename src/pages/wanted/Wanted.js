import React, { useState } from "react";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import Alert from "react-bootstrap/Alert";

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
  const [show, setShow] = useState(false);
  const is_owner = user?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/wanted/${id}/`);
      setShow(true);
      setTimeout(() => {
        history.goBack();
      }, 1500);
    } catch (err) {
    }
  };

  const handleEdit = () => {
    history.push(`/wanted/${id}/edit`);
  };

  const handleInside = () => {
    setIsHovered(true);
  };

  const handleOutside = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Card
        className={`${styles.Card} ${
          wantedDetailPage ? styles.DetailSize : styles.ListSize
        }
          ${isHovered && !wantedDetailPage ? styles.AnimateBorder : ""}`}
        onMouseEnter={handleInside}
        onMouseLeave={handleOutside}
      >
        <Card.Body className="p-0">
          <Media className={styles.HeaderContainer}>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_avatar} height={144} />
              <span className={appStyles.Owner}>{owner}</span>
            </Link>

            {show && (
              <Alert
                variant="success"
                onClose={() => setShow(false)}
                dismissible
              >
                <Alert.Heading>Wanted deleted successfully!</Alert.Heading>
              </Alert>
            )}

            <div className={styles.HeaderOptions}>
              <span>Updated:{updated}</span>
            </div>
          </Media>
        </Card.Body>

        {is_owner && wantedDetailPage && (
          <div className={styles.Settings}>
            <EditDropdown handleEdit={handleEdit} handleDelete={handleDelete} />
          </div>
        )}
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
