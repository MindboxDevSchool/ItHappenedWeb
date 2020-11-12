import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import * as yup from "yup";
import { loginUser } from "../Api/Api";
import { useAuth } from "../../Context/auth";
import { Formik, Form, Field } from "formik";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Alert from '@material-ui/lab/Alert'

export const PASSWORD_PATTERN = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,32}$/;
export const LOGIN_PATTERN = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$/;
export const reqdFieldMsg = "This is a required field";
export const invalidPwdMsg =
  "Password must contain at least eight characters, at least one letter and one number.";
const invalidLoginMsg =
  "Login must be alphanumeric characters (a-zA-Z0-9), only symbols: . - _ are allowed separated by alphanumeric";
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

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { setAuthToken } = useAuth();
  const classes = useStyles();

  const postLogin = async (values) => {
    await loginUser(values.login, values.password)
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Formik
          validationSchema={schema}
          onSubmit={postLogin}
          initialValues={{
            login: "",
            password: "",
          }}
        >
          {({ isSubmitting, submitForm }) => {
            return (
              <>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Form className={classes.form}>
                  <Field
                    component={TextField}
                    name="login"
                    type="text"
                    label="Login"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  <br />
                  <Field
                    component={TextField}
                    type="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {isSubmitting && <LinearProgress />}
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                    className={classes.submit}
                  >
                    Sign in
                  </Button>
                </Form>

                <Grid item>
                  <Link to="/registration" variant="body2">
                    "Don't have an account? Sign Up"
                  </Link>
                </Grid>
                {isError && <Alert severity="warning">{errorMessage}</Alert>}
              </>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
};

export default Login;
