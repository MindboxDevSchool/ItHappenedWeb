import "./App.css";
import React, { useState } from "react";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Main from "./Components/Main/Main";
import { Navbar, Nav } from "react-bootstrap";
import { Route, Switch } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Tracker from "./Components/Tracker/Tracker";
import Events from "./Components/Events/Events";
import Login from "./Components/RegistrationForm/Login";
import Logout from "./Components/RegistrationForm/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthContext } from "./Context/auth";

function App() {
  //const existingToken = getUserCredentials().token;
  const [authToken, setAuthToken] = useState(
    useState(localStorage.getItem("token") || "")
  );

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthToken(data);
  };

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Nav>
            <Nav.Link>
              <Link className="nav-link" to="home">
                It happened
              </Link>
            </Nav.Link>
            <Nav className="mr-auto">
              <Nav.Link>
                <Link className="nav-link" to="/trackers">
                  Trackers
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="nav-link" to="/statistics">
                  Statistics
                </Link>
              </Nav.Link>
            </Nav>
          </Nav>
          <Nav className="collapse navbar-collapse justify-content-end">
            {authToken === undefined && (
              <Nav.Link>
                <Link className="nav-link" to="/login">LogIn</Link>
              </Nav.Link>
            )}
            {authToken !== undefined && (
              <Nav>
                <Nav.Item className="text-white mt-3">
                  <span>You logged in as: {localStorage.getItem("login")}</span> 
                </Nav.Item>
                <Nav.Link>
                  <Link className="nav-link" to="/logout">
                    LogOut
                  </Link>
                </Nav.Link>
              </Nav>
            )}
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/home" component={Main} />
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/tracker/:id" component={Events} />
          <PrivateRoute path="/trackers" component={Tracker} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
