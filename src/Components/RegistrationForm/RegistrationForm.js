import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser } from "../Api/Api";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import { useAuth } from "../../Context/auth";

const PASSWORD_PATTERN = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/;
const LOGIN_PATTERN = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
const reqdFieldMsg = "This is a required field";
const invalidPwdMsg =
  "Password must contain atleast eight characters, at least one letter and one number.";
const invalidLoginMsg =
  "Login must be alphanumeric characters (a-zA-Z0-9), only symbols: . - _ are allowed separated by alphanumeric";
const schema = yup.object({
  login: yup
    .string()
    .matches(LOGIN_PATTERN, invalidLoginMsg)
    .required(reqdFieldMsg)
    .min(5, "Must be 5 characters or more")
    .max(20, "Must be 20 characters or less"),
  password: yup
    .string()
    .matches(PASSWORD_PATTERN, invalidPwdMsg)
    .required(reqdFieldMsg),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegistrationForm = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthToken } = useAuth();

  const postRegistration = async () => {
    await registerUser(login, password)
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
    <>
      <Formik
        validationSchema={schema}
        validateOnChange={true}
        onSubmit={postRegistration}
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
            <Card>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  postRegistration();
                }}
              >
                <Form.Group controlId="formBasicLogin">
                  <Form.Label>Username</Form.Label>
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
                  Register
                </Button>
              </Form>
              <Link to="/login">Already have an account?</Link>
              {isError && (
                <span>The username or password provided were incorrect!</span>
              )}
            </Card>
          );
        }}
      </Formik>
    </>
  );
};

export default RegistrationForm;
