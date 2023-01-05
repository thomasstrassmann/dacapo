import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import "./api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>}/>
          <Route exact path="/login" render={() => <h1>Login</h1>}/>
          <Route exact path="/signup" render={() => <SignUpForm/>}/>
          <Route render={() => <h1>Page does not exist!</h1>}/>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
