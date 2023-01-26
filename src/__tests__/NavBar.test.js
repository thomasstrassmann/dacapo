import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";
import NavBar from "../components/NavBar";

test("renders NavBar when called", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  const login = screen.getByRole("link", { name: "login Login" });
  expect(login).toBeInTheDocument();
});

test("renders link of the user profile", async () => {
  render(
    <Router>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </Router>
  );

  const profile = await screen.findByText("Strings22");
  expect(profile).toBeInTheDocument();
});

test("renders correct links when signing out", async () => {
  render(
    <Router>
      <UserProvider>
        <NavBar />
      </UserProvider>
    </Router>
  );

  const logout = await screen.findByText("Logout");
  fireEvent.click(logout);

  const login = await screen.findByText("Login");
  const signUp = await screen.findByText("Sign up");

  expect(login).toBeInTheDocument();
  expect(signUp).toBeInTheDocument();
});