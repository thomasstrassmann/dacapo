import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { axiosReq } from "../api/axiosDefaults";

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
      <SetProfileContext.Provider value={setProfile}>
        {children}
      </SetProfileContext.Provider>
    </ProfileContext.Provider>
  );
};
