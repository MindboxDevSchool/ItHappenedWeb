import { useAuth } from "../../Context/auth";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Logout = (props) => {
  const { setAuthToken } = useAuth();
  const history = useHistory();

  function logUserOut() {
    setAuthToken();
    props.changeLoggedOutState(true);
  }

  const routeChange = () => {
    history.push("/home");
  };

  return (
    <div>
      <Button
        variant="primary"
        type="submit"
        onClick={(e) => (logUserOut(), routeChange())}
      >
        LogOut
      </Button>
    </div>
  );
};

export default Logout;
