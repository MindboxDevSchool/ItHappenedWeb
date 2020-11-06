import {useParams} from "react-router-dom";
import {getTracker, getEvents} from '../Api/Api';
import {useEffect, useState} from 'react';
import EventForm from "../EventForm/EventForm";
import {addEvent} from '../Api/Api';

const Events = () => {
    const {trackerId} = useParams();
    console.log(trackerId);
    const [tracker, setTracker] = useState({});
    const [events, setEvents] = useState([]);
    //getTracker(trackerId).then(result => console.log(result.data))
    //const [trackers, setTrackers] = useState([]);
    useEffect(() => {      
        const getTrackerAsync = async () => {
            getTracker(trackerId)
            .then(result => setTracker(result.data))
            .catch(e => console.log(e))
        }
        getTrackerAsync();

        const getEventsAsync = async () => {
            getEvents(trackerId)
            .then(result => console.log(result.data))
            .catch(e => console.log(e))
        }

        getEventsAsync();
      }, []);

      const onAddEvent = async (eventBody) => {
        await addEvent(trackerId, eventBody)
            .then(result => {       
                eventBody.id = result.data.id;
                setEvents([...events, eventBody]);   
            })
            .catch(error => console.log(error.response));
      }

    return (<div><br />
    <EventForm  onAdd={onAddEvent}/>
        {/* <Table striped  hover variant="dark">
        <tbody>
            {              
               trackers.map(tracker => <TrackerRow rowNumber={i++} tracker={tracker} showModal={showModal}/>)
            }
        </tbody>
        </Table> */}
        
        {/* <TrackerForm onAdd={addTracker}/> */}

        {/* <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Body>
          Do you really want to delete a track? Data cannot be recovered
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={e => {onDeleteTracker();handleClose();}}>Delete</Button>
        </Modal.Footer>
      </Modal> */}

        </div>)
        }


export default Events;