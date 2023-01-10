import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { followHelper, unfollowHelper } from "../utils/utils";

export const ProfileContext = createContext();
export const SetProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);
export const useSetProfile = () => useContext(SetProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    // profiles rating to be implemented here
    pageProfile: { results: [] },
    followedProfiles: { results: [] },
  });
  const user = useUser();

  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        owner: user.profile_id,
        followed_user: clickedProfile.id,
      });

      setProfile((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
        followedProfiles: {
          ...prevState.followedProfiles,
          results: prevState.followedProfiles.results.map((profile) =>
            followHelper(profile, clickedProfile, data.id)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

      setProfile((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
        followedProfiles: {
          ...prevState.followedProfiles,
          results: prevState.followedProfiles.results.map((profile) =>
            unfollowHelper(profile, clickedProfile)
          ),
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-followers_count"
        );
        setProfile((prevState) => ({
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
    <ProfileContext.Provider value={profile}>
      <SetProfileContext.Provider value={{handleFollow, handleUnfollow, setProfile}}>
        {children}
      </SetProfileContext.Provider>
    </ProfileContext.Provider>
  );
};
