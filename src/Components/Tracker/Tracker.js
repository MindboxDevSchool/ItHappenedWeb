import {getTrackers, createTracker, deleteTracker} from '../Api/Api';
import { useEffect, useState } from "react";
import TrackerForm from '../TrackerForm/TrackerForm';
import {ListGroup, Table, Modal, Button, FormCheck} from 'react-bootstrap';
import changeTracker from './icons/changeTracker.png';
import './Tracker.css';

const Tracker = () => {
    const [id, setId] = useState("");
    const [trackers, setTrackers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        
        const getTrackersAsync = async () => {
            getTrackers()
            .then(result =>  setTrackers(result.data))
            .catch(e => console.log(e))
        }
        getTrackersAsync();
      }, []);


      const addTracker = async (name) => {
        await createTracker({"name": name})
            .then(result => {         
                const createdTracker = {id: result.data.id, name: name};
                setTrackers([...trackers, createdTracker]);   
            })
            .catch(error => console.log(error.response));
      }

      const onDeleteTracker = async () => {
          await deleteTracker(id)
          .then(result => {setTrackers(trackers.filter((e) => e.id != id))})
          .catch(error => console.log(error.response))
      }

    let i = 1;

    return (<div><br />
        <Table striped  hover variant="dark">
        <tbody>
            {               
                trackers.map(tracker => 
                    <tr id={tracker.id}>
                        <td className="firstCell">{i++}</td>
                        <td className="secondCell"><a href={"tracker/" + tracker.id}>{tracker.name}</a></td>
                        <td className="thirdCell">
                            <img onClick={e => console.log(123)} src="https://img.icons8.com/color/48/000000/change.png" className="tableIcon"/>
                        </td>
                        <td className="fourthCell">
                            <img onClick={e => {setId(e.target.parentElement.parentElement.id);handleShow();}} src="https://img.icons8.com/flat_round/64/000000/delete-sign.png" className="tableIcon"/>
                        </td>
                    </tr>)
            }

        </tbody>
        </Table>
        
        <TrackerForm onAdd={addTracker}/>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Body>
          Do you really want to delete a track? Data cannot be recovered
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={e => {onDeleteTracker();handleClose();}}>Delete</Button>
        </Modal.Footer>
      </Modal>

        </div>)
        }

export default Tracker;
