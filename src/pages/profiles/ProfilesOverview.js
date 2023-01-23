import React from "react";
import styles from "../../styles/Profile.module.css";
import Asset from "../../components/Asset";
import { useProfile } from "../../contexts/ProfileContext";

import Profile from "./Profile";

const ProfilesOverview = ({ mobile }) => {
  const { followedProfiles } = useProfile();

  return (
    <>
      <h2 className="text-center mb-2">Top 5 profiles by followers</h2>
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
