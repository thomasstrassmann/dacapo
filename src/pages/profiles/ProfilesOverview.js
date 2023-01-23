import React from "react";
import styles from "../../styles/Profile.module.css";
import Asset from "../../components/Asset";
import { useProfile } from "../../contexts/ProfileContext";

import Profile from "./Profile";

const ProfilesOverview = () => {
  const { followedProfiles } = useProfile();

  return (
    <>
      <h3 className={styles.OverviewHeading}>Top 5 profiles by followers</h3>
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
    </>
  );
};

export default ProfilesOverview;
