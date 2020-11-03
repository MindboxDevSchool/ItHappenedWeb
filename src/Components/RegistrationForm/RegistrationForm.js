import { useState } from 'react';
import {registerUser} from '../Api/Api';
import {Form, Button} from 'react-bootstrap';

const RegistrationForm = () => {

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const saveToken = (token) => {
    localStorage.setItem("token", token);
  }

  const registrationUser = async () => {
    await registerUser(login, password, saveToken);
  }

  return <Form onSubmit={e => {e.preventDefault();registrationUser();}}>
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Login</Form.Label>
            <Form.Control type="text" placeholder="Enter login" value={login} onChange={e => setLogin(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>;

}

export default RegistrationForm;





  

 