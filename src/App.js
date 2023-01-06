import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import "./api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();
export const SetUserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        <div className={styles.App}>
          <NavBar />
          <Container className={styles.Main}>
            <Switch>
              <Route exact path="/" render={() => <h1>Home</h1>} />
              <Route exact path="/login" render={() => <LoginForm />} />
              <Route exact path="/signup" render={() => <SignUpForm />} />
              <Route render={() => <h1>Page does not exist!</h1>} />
            </Switch>
          </Container>
        </div>
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
