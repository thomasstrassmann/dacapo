import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/Profile.module.css"
import Asset from "../../components/Asset";
import { useProfile } from "../../contexts/ProfileContext";

import Profile from "./Profile";


const ProfilesOverview = ({mobile}) => {
  const { followedProfiles } = useProfile();


  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      <h2 className="text-center my-2">Most popular profiles by followers - Top 5</h2>
      {followedProfiles.results.length ? (
          <>
          
            <div className={styles.ProfilesContainer}>
              {followedProfiles.results.slice(0, 5).map((profile) => (
                 <Profile key={profile.id} profile={profile} />
              ))}
            </div>
          </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfilesOverview;