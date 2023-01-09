import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useUser } from "../../contexts/UserContext";
import { Button } from "react-bootstrap";

const Profile = (props) => {
  const { profile, mobile, imageSize = 50 } = props;
  const { id, following_id, avatar, owner } = profile;

  const user = useUser(); 
  const is_owner = user?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={avatar} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          user &&
          !is_owner &&
          (following_id ? (
            <Button
              className={btnStyles.Button}
              onClick={() => {}}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={btnStyles.Button}
              onClick={() => {}}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;