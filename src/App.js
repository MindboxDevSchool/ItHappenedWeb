import "./App.css";
import React, { useState } from "react"
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import Main from "./Components/Main/Main";
import { Navbar, Nav } from "react-bootstrap";
import { Route, Switch} from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import Tracker from "./Components/Tracker/Tracker";
import Events from "./Components/Events/Events";
import Login from "./Components/RegistrationForm/Login";
import { getUserCredentials } from "./Components/Api/Api";
import Logout from "./Components/RegistrationForm/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthContext } from "./Context/auth";

function App() {
  console.log(getUserCredentials().name);
  console.log(getUserCredentials().token);

  const existingToken = getUserCredentials().token;
  const [authToken, setAuthToken] = useState(existingToken);
  
  const setToken = (data) => {
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
  }
  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <BrowserRouter>

        <Navbar bg="dark" variant="dark">
        <Nav.Link><Link to="home">It happened</Link></Nav.Link>
          <Nav className="mr-auto">
            <Nav.Link>< Link to="/registration">Registration</Link></Nav.Link>
            <Nav.Link><Link to="/login">LogIn</Link></Nav.Link>
            <Nav.Link><Link to="/logout">LogOut</Link></Nav.Link>
            <Nav.Link><Link to="/trackers">Trackers</Link></Nav.Link>
            <Nav.Link><Link to="/statistics">Statistics</Link></Nav.Link>
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
