
import {Form, Button} from 'react-bootstrap';

const Logout = () => {

  const logUserOut = () => {
    localStorage.setItem("token", undefined);
    localStorage.setItem("login", undefined);
  }

  return <Form onSubmit={e => { e.preventDefault(); logUserOut(); }}>
          <Button variant="primary" type="submit">
            LogOut
          </Button>
        </Form>;
}

export default Logout;





  

 