import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import "./api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import InstrumentPage from "./pages/instruments/InstrumentPage";
import InstrumentCreateForm from "./pages/instruments/InstrumentCreateForm"

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <h1>Home</h1>} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/instruments/create" render={() => <InstrumentCreateForm />} />
          <Route exact path="/instruments/:id" render={() => <InstrumentPage />} />
          <Route render={() => <h1>Page does not exist!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
