import NavBar from "./components/NavBar";
import styles from "./App.module.css";
import "./api/axiosDefaults";
import Container from "react-bootstrap/Container";
import { Switch, Route } from "react-router-dom";
import SignUpForm from "./pages/auth/SignUpForm";
import LoginForm from "./pages/auth/LoginForm";
import InstrumentPage from "./pages/instruments/InstrumentPage";
import InstrumentCreateForm from "./pages/instruments/InstrumentCreateForm"
import InstrumentsPage from "./pages/instruments/InstrumentsPage";
import { useUser } from "./contexts/UserContext";
import InstrumentEditForm from "./pages/instruments/InstrumentEditForm";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import WantedListPage from "./pages/wanted/WantedListPage";
import WantedDetailPage from "./pages/wanted/WantedDetailPage";
import WantedCreateForm from "./pages/wanted/WantedCreateForm";
import WantedEditForm from "./pages/wanted/WantedEditForm";
import Home from "./pages/home/Home";

function App() {
  const user = useUser();
  const profile_id = user?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container fluid className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/instruments" render={() => 
            <InstrumentsPage feedback="There are no results for you search. 
            Try another keyword..." instrumentsPage />}/>
          <Route exact path="/instruments/create" render={() => <InstrumentCreateForm />} />
          <Route exact path="/instruments/:id/edit" render={() => <InstrumentEditForm />} />
          <Route exact path="/instruments/:id" render={() => <InstrumentPage instrumentPage />} />
          <Route exact path="/bookmarks" render={() => 
            <InstrumentsPage feedback="There are no results for you search. 
            Try another keyword or bookmark an instrument..."
            filter={`bookmarks__owner__profile=${profile_id}&ordering=-bookmarks__created&`}/>} />
          <Route exact path="/wanted" render={() => <WantedListPage wantedListPage
          feedback="There are no wanted items for you search. Try another keyword..."/>} /> 
          <Route exact path="/wanted/create" render={()=> <WantedCreateForm />} />
          <Route exact path="/wanted/:id/edit" render={()=> <WantedEditForm />} />
          <Route exact path="/wanted/:id" render={()=> <WantedDetailPage wantedDetailPage />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route exact path="/profiles/:id/edit/username" render={() => <UsernameForm />} />
          <Route exact path="/profiles/:id/edit/password" render={() => <UserPasswordForm />} />
          <Route exact path="/profiles/:id/edit" render={() => <ProfileEditForm />} />

          <Route render={() => <h1>Page does not exist!</h1>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
