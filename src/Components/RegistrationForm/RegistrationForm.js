import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { registerUser } from "../Api/Api";
import { Link, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { useAuth } from "../../Context/auth";
import {
  useStyles,
  PASSWORD_PATTERN,
  LOGIN_PATTERN,
  reqdFieldMsg,
  invalidPwdMsg,
} from "./Login";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Button, LinearProgress } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import Grid from "@material-ui/core/Grid";
import Alert from "@material-ui/lab/Alert";

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
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegistrationForm = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { setAuthToken } = useAuth();
  const classes = useStyles();

  const postRegistration = async (values) => {
    await registerUser(values.login, values.password)
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
          onSubmit={postRegistration}
          initialValues={{
            login: "",
            password: "",
            passwordConfirmation: "",
          }}
        >
          {({ isSubmitting, submitForm }) => {
            return (
              <>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
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
                  <Field
                    component={TextField}
                    type="password"
                    label="Confirm password"
                    name="passwordConfirmation"
                    placeholder="Enter password again"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                  {isSubmitting && <LinearProgress />}
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    fullWidth
                    className={classes.submit}
                  >
                    Register
                  </Button>
                </Form>

                <Grid item>
                  <Link to="/login">"Already have an account? Sign In"</Link>
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

export default RegistrationForm;
