import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { loginUser } from "../Api/Api";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../Context/auth";

function Login() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken } = useAuth();

  const postLogin = async () => {
    await loginUser(login, password)
      .then((result) => {
        if (result.status === 200) {
          setAuthToken(result.data.token);
          setLoggedIn(true);
        } else {
          setIsError(true);
        }
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Card>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          postLogin();
        }}
      >
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <Link to="/registration">Don't have an account?</Link>
      {isError && (
        <span>The username or password provided were incorrect!</span>
      )}
    </Card>
  );
}

export default Login;
