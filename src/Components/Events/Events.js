import { useParams } from "react-router-dom";
import { getEvent, getEvents } from '../Api/Api';
import { useEffect, useState } from 'react';
import EventForm from "../EventForm/EventForm";
import { addEvent } from '../Api/Api';
import { Table, Modal, Button } from "react-bootstrap";
const Events = () => {
    const { eventserId } = useParams();
    const [events, setEvents] = useState([]);

    const getEventAsync = async () => {
        getEvent(eventsId)
            .then(result => setEvent(result.data))
            .catch(e => console.log(e))
    }

    useEffect(() => {

        getEventAsync();

        const getEventsAsync = async () => {
            getEvents(eventsId)
                .then(result => console.log(result.data))
                .catch(e => console.log(e))
        }

        getEventsAsync();
    }, []);

    const onAddEvent = async (eventBody) => {
        await addEvent(eventsId, eventBody)
            .then(result => {
                eventBody.id = result.data.id;
                setEvents([...events, eventBody]);
            })
            .catch(error => console.log(error.response));
    }

    return (<div><br />
        <EventForm onAdd={onAddEvent} />
        <Table striped hover variant="dark">
            <tbody>
                {
                    events.map(event => <EventRow rowNumber={i++} event={event} showModal={showModal} />)
                }
            </tbody>
        </Table>

        <eventForm onAdd={addEvent} /> * /

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
            <Modal.Body>
                Do you really want to delete a events? Data cannot be recovered
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