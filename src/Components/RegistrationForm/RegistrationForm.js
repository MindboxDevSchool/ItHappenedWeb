import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { registerUser } from "../Api/Api";
import { Link, Redirect } from "react-router-dom";
import { Form, Button, NavLink, Alert } from "react-bootstrap";
import { useAuth } from "../../Context/auth";

const PASSWORD_PATTERN = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/;
const LOGIN_PATTERN = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
const reqdFieldMsg = "This is a required field";
const invalidPwdMsg =
  "Password must contain atleast eight characters, at least one letter and one number.";
const invalidLoginMsg =
  "Username can contain alphanumeric characters (a-zA-Z0-9), only symbols: . - _ are allowed separated by alphanumeric. Minimum username length is 5 symbols";
const schema = yup.object({
  login: yup
    .string()
    .matches(LOGIN_PATTERN, invalidLoginMsg)
    .required(reqdFieldMsg),
  password: yup
    .string()
    .matches(PASSWORD_PATTERN, invalidPwdMsg)
    .required(reqdFieldMsg),
    //.oneOf([yup.ref("passwordConfirmation"), null], "Passwords must match"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegistrationForm = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
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
        onSubmit={postRegistration}
        initialValues={{
          login: "",
          password: "",
          passwordConfirmation: "",
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
                <Form.Group controlId="formBasicRegistration">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="login"
                    placeholder="Enter user name"
                    value={values.login}
                    onBlur={handleBlur}
                    onChange={e => {
                      handleChange(e);
                      setLogin(values.login)}}
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
                <Form.Group controlId="formPasswordConfirmation">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirmation"
                    placeholder="Enter password again"
                    value={values.passwordConfirmation}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isInvalid={errors.passwordConfirmation}
                  />
                  {touched.passwordConfirmation && (
                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirmation}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Register
                </Button>
              </Form>
              <NavLink>
                <Link to="/login">Already have an account?</Link>
              </NavLink>
              {isError && <Alert variant="warning">{errorMessage}</Alert>}
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default RegistrationForm;
