import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
export const UserContext = createContext();
export const SetUserContext = createContext();

export const useUser = () => useContext(UserContext);
export const useSetUser = () => useContext(SetUserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setUser((prevUser) => {
            if (prevUser) {
              history.push("/login");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setUser((prevUser) => {
              if (prevUser) {
                history.push("/login");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};
