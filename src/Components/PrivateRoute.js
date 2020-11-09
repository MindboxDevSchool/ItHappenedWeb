import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../Context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  var { authToken } = useAuth();

  return (
    <Route
      {...rest}
      render={ (props) =>
         authToken === 'undefined' || authToken === undefined || authToken === null ? (<Redirect to="/login" />) : (<Component {...props} />)
      }
    />
  );
}
export default PrivateRoute;
