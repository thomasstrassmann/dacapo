import React, { useEffect, useState } from "react";
import styles from "../styles/Profile.module.css";
import Asset from "./Asset";

import Profile from "../pages/profiles/Profile";
import { useUser } from "../contexts/UserContext";
import { axiosReq } from "../api/axiosDefaults";
import { useProfile } from "../contexts/ProfileContext";

const FollowedUsers = () => {
  const user = useUser();
  const [hasLoaded, setHasLoaded] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const profile = useProfile();

  useEffect(() => {
    const profilesArray = [];
    const idArray = [];
    let followedUsers = [];

    if (user) {
      const fetchData = async () => {
        try {
          const [{ data: fetchedUsers }] = await Promise.all([
            axiosReq.get(`/followers/?owner=${user.pk}`),
          ]);
          followedUsers = fetchedUsers;
          getSubscriptions(followedUsers.results);

          async function getSubscriptions(followedUsers) {
            followedUsers.map((entry) => {
              return idArray.push(entry.followed_user);
            });

            await Promise.all(
              idArray.map(async (profileId) => {
                const res = await axiosReq.get(`/profiles/${profileId}/`);
                profilesArray.push(res.data);
              })
            );
            setSubscriptions(profilesArray);
          }
          setHasLoaded(true);
        } catch (err) {
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
  }, [user, profile]);

  return (
    <div className={styles.Subscriptions}>
      <h2 className="text-center my-2">My subscriptions</h2>
      {hasLoaded ? (
        <>
          {subscriptions.length ? (
          <div className={styles.ProfilesContainer}>
            {subscriptions.map((profile) => (
              <Profile key={profile.id} profile={profile} />
            ))}
          </div> ) : (
            <div>
              <p className="text-center">You are not following any profiles yet!</p>
            </div>
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </div>
  );
};

export default FollowedUsers;
