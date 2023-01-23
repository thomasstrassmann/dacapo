import React from "react";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { useUser } from "../../contexts/UserContext";
import Button from "react-bootstrap/Button";
import { useSetProfile } from "../../contexts/ProfileContext";

const Profile = (props) => {
  const { profile, imageSize = 50 } = props;
  const { id, following_id, avatar, owner } = profile;

  const user = useUser();
  const { handleFollow, handleUnfollow } = useSetProfile();
  const is_owner = user?.username === owner;

  return (
    <div className={styles.ProfileAbstract}>
      <div>
        <Link className={styles.ProfileInfos} to={`/profiles/${id}`}>
          <Avatar src={avatar} height={imageSize} />
          <div className={`mx-2 ${styles.WordBreak}`}>
            <strong>{owner}</strong>
          </div>
        </Link>
      </div>

      <div className={`text-right`}>
        {user &&
          !is_owner &&
          (following_id ? (
            <Button
              className={btnStyles.TrendingButton}
              onClick={() => handleUnfollow(profile)}
            >
              unfollow
            </Button>
          ) : (
            <Button
              className={btnStyles.TrendingButton}
              onClick={() => handleFollow(profile)}
            >
              follow
            </Button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
