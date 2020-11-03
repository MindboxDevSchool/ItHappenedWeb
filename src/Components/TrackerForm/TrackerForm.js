import {useState} from 'react';
import {createTracker} from '../Api/Api';
import {Form,Button} from 'react-bootstrap';

const TrackerForm = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const addTracker = async () => {
    await createTracker({"name": name})
        .then(result => { setId(result.data.id) })
        .catch(error => console.log(error.response));
  }
  
  return <Form onSubmit={e => {e.preventDefault(); addTracker();}}>
          <Form.Group>
            {/* <Form.Label>Tracker</Form.Label> */}
            <Form.Control type="text" placeholder="Enter name for new tracker" value={name} onChange={e => setName(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Create
          </Button>
          </Form>;
    }
   
export default TrackerForm;

