import './App.css';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import Main from './Components/Main/Main';
import {Navbar, Nav} from 'react-bootstrap';
import { Route, Switch } from "react-router";
import { BrowserRouter } from 'react-router-dom';
import Tracker from './Components/Tracker/Tracker';
import Events from './Components/Events/Events';
import Login from './Components/RegistrationForm/Login';
import {getUserCredentials} from './Components/Api/Api';
import Logout from './Components/RegistrationForm/Logout';

function App() {
  console.log(getUserCredentials().name);
  console.log(getUserCredentials().token);
  return (
    <BrowserRouter>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="home">It happened</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/registration">Registration</Nav.Link>
          <Nav.Link href="/login">LogIn</Nav.Link>
          <Nav.Link href="/logout">LogOut</Nav.Link>
          <Nav.Link href="/trackers">Trackers</Nav.Link>
          <Nav.Link href="/statistics">Statistics</Nav.Link>
        </Nav>
        </Navbar>
        <Switch>
           <Route path="/home" component={Main} />
           <Route path="/registration" component={RegistrationForm} />
           <Route path="/login" component={Login} />
           <Route path="/logout" component={Logout} />
           <Route path="/tracker/:id" component={Events} />
           <Route path="/trackers" component={Tracker} />
       </Switch>
    </BrowserRouter>
  );
}

export default App;

