import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import appStyles from "../../App.module.css";
import styles from "../../styles/Profile.module.css";
import Asset from "../../components/Asset";

import Profile from "../profiles/Profile";
import { useUser } from "../../contexts/UserContext";
import { axiosReq } from "../../api/axiosDefaults";
import { useProfile } from "../../contexts/ProfileContext";

const FollowedUsers = () => {
  const [followedUsers, setFollowedUsers] = useState({ results: [] });
  const user = useUser();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const profile = useProfile();

  useEffect(() => {
    const profilesArray = [];
    const idArray = [];

    if (user) {
      const fetchData = async () => {
        try {
          const [{ data: followedUsers }] = await Promise.all([
            axiosReq.get(`/followers/?owner=${user.pk}`),
          ]);
          setFollowedUsers(followedUsers);
          getSubscriptions(followedUsers.results);

          async function getSubscriptions(followedUsers) {
            followedUsers.map((entry) => {
              idArray.push(entry.followed_user);
            });

            const responses = await Promise.all(
              idArray.map(async (profileId) => {
                const res = await axiosReq.get(`/profiles/${profileId}/`);
                profilesArray.push(res.data);
              })
            );
            setSubscriptions(profilesArray);
          }
          setHasLoaded(true);
        } catch (err) {
          console.log(err);
        }
      };
      setHasLoaded(false);
      const timeout = setTimeout(() => {
        fetchData();
      }, 800);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [user, setFollowedUsers, profile]);

  return (
    <Container className={appStyles.Content}>
      <h2 className="text-center my-2">My subscriptions</h2>
      {hasLoaded ? (
        <>
          <div className={styles.ProfilesContainer}>
            {subscriptions.map((profile) => (
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

export default FollowedUsers;
