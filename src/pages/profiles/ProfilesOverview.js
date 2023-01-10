import React from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
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
      {followedProfiles.results.length ? (
        <>
          <p>Most popular profiles by followers</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {followedProfiles.results.slice(0, 3).map((profile) => (
                 <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            followedProfiles.results.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))
          )}
          <p>Most popular profiles by rating</p>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfilesOverview;