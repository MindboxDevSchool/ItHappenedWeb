import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { loginUser } from "../Api/Api";
import { Form, Button, Alert, NavLink} from "react-bootstrap";
import { useAuth } from "../../Context/auth";

const PASSWORD_PATTERN = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/;
const LOGIN_PATTERN= /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
const reqdFieldMsg = "This is a required field";
const invalidPwdMsg =
  "Password must contain at least eight characters, at least one letter and one number.";
const invalidLoginMsg =
  "Login must be alphanumeric characters (a-zA-Z0-9), only symbols: . - _ are allowed separated by alphanumeric"
const schema = yup.object({
  login: yup
    .string()
    .matches(LOGIN_PATTERN, invalidLoginMsg)
    .required(reqdFieldMsg),
  password: yup
    .string()
    .matches(PASSWORD_PATTERN, invalidPwdMsg)
    .required(reqdFieldMsg),
});

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
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
        setErrorMessage(e.response.data.ErrorMessage);
        setIsError(true);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <Formik
        validationSchema={schema}
        validateOnChange={true}
        onSubmit={postLogin}
        initialValues={{
          login: "",
          password: "",
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => {
          return (
            <>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicLogin">
                  <Form.Label>Login</Form.Label>
                  <Form.Control
                    type="text"
                    name="login"
                    placeholder="Please enter your login"
                    value={values.login}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onSubmit={setLogin(values.login)}
                    isInvalid={errors.login}
                  />
                  {touched.login && (
                    <Form.Control.Feedback type="invalid">
                      {errors.login}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Please enter a strong password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    onSubmit={setPassword(values.password)}
                    isInvalid={errors.password}
                  />
                  {touched.password && (
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Sign In
                </Button>
              </Form>
              <NavLink>
                <Link to="/registration">Don't have an account?</Link>
              </NavLink>
              {isError && (
                <Alert variant="info">
                  {errorMessage}
                </Alert>
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
}

export default Login;
