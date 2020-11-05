import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import { Button } from "react-bootstrap";

const Logout = () => {
  const { setAuthToken } = useAuth();
  const history = useHistory();

  function logUserOut() {
    setAuthToken();
  }

  const routeChange = () => {
    history.push("/home");
  };

  return (
    <div>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => {logUserOut(); routeChange()}}
      >
        LogOut
      </Button>
    </div>
  );
};

export default Logout;
