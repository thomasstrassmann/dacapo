import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useUser } from "../../contexts/UserContext";


const ProfilesOverview = () => {
  const [profileData, setProfileData] = useState({
    // profiles rating to be implemented here
    pageProfile: { results: [] },
    followedProfiles: { results: [] },
  });
  const { followedProfiles } = profileData;
  const user = useUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          followedProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [user]);

  return (
    <Container className={appStyles.Content}>
      {followedProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {followedProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfilesOverview;