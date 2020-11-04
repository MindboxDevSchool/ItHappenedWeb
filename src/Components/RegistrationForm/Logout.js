import React from "react";
import {useAuth} from '../../Context/auth'
import {Button} from 'react-bootstrap';

const Logout = () => {

  const { setAuthToken } = useAuth();

  function logUserOut() {
    setAuthToken();
  }

  return <div>
          <Button variant="primary" type="submit" onClick =  { e => logUserOut() } >
            LogOut
          </Button>
        </div>
}

export default Logout;
//onClick =  { logUserOut.bind(this) }