import { useParams } from "react-router-dom";
import { deleteEvent, getEvent, getEvents, getTracker} from '../Api/Api';
import { useEffect, useState } from 'react';
import EventForm from "../EventForm/EventForm";
import { addEvent } from '../Api/Api';
import { Table, Modal, Button } from "react-bootstrap";
import EventRow from '../EventRow/EventRow'

const Events = () => {

    const authorizedRequestConfig = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { trackerId } = useParams();
    const [events, setEvents] = useState([]);
    const [eventId, setId] = useState("");
    const [tracker, setTracker] = useState({});
    const [isTrackerReceived, setTrackerReceivedStatus] = useState(false);

    useEffect(() => {

        const getEventsAsync = async () => {
            getEvents(trackerId, authorizedRequestConfig)
                .then(result => setEvents(result.data))
                .catch(e => console.log(e))
        }

        const getTrackerAsync = async () => {
            getTracker(trackerId, authorizedRequestConfig)
                .then(result => 
                    {
                        setTracker(result.data);
                        setTrackerReceivedStatus(true)
                    })
                .catch(e => console.log(e))
        }

        getTrackerAsync();
        getEventsAsync();
        
    }, []);

    const onAddEvent = async (eventBody) => {
        console.log(eventBody)
        await addEvent(trackerId, eventBody, authorizedRequestConfig)
            .then(result => {
                eventBody.id = result.data.id;
                setEvents([...events, eventBody]);
            })
            .catch(error => console.log(error.response));
    }

    const onDeleteEvent = async() => {
        await deleteEvent(eventId, authorizedRequestConfig)
        .then((result) => {
            setEvents(events.filter((e) => e.id != eventId));
          })
          .catch((error) => console.log(error.response));
    }

    const showModal = (eventId) => {
        setId(eventId);
        handleShow();
      };
      console.log(tracker)
    let i = 1;  
    return (<div><br />
        <h2>{tracker.name}</h2>
        <Table striped hover variant="dark">
            <tbody>
                {
                    events.map(event => <EventRow rowNumber={i++} event={event} showModal={showModal} tracker={tracker}/>)
                }
            </tbody>
        </Table>

        {
           isTrackerReceived ? <EventForm onAdd={onAddEvent} tracker={tracker}/> : null
        }
         
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
            <Modal.Body>
                Do you really want to delete a event? Data cannot be recovered
        </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="danger" onClick={e => { onDeleteEvent(); handleClose(); }}>Delete</Button>
            </Modal.Footer>
        </Modal>

    </div>)
}


export default Events;