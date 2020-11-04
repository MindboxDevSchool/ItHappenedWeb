import {useState} from 'react';
import {createTracker} from '../Api/Api';
import {Form,Button, InputGroup, FormControl} from 'react-bootstrap';

const TrackerForm = ({onAdd}) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  
  return <Form onSubmit={e => {e.preventDefault(); onAdd(name); setName("");}}>
          <InputGroup>
          <FormControl placeholder="Enter name for new tracker" value={name} onChange={e => setName(e.target.value)}/>
          <InputGroup.Append>
            <Button variant="outline-secondary">Add customization</Button>
            <Button type="submit" variant="outline-secondary">Create</Button>
          </InputGroup.Append>
        </InputGroup>
          </Form>;
    }
   
export default TrackerForm;



