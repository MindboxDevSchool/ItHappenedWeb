import { useEffect, useState } from 'react';
import FiltrationForm from "./FiltrationForm";
import { Table } from "react-bootstrap";
import EventRow from '../EventRow/EventRow';
import {getFilteration, getTracker } from '../Api/Api';
import { useParams } from "react-router-dom";

const Filtration = () => {
    const [events, setEvents] = useState([]);
    const [tracker, setTracker] = useState({});
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const { trackerId } = useParams();
    const [id, setId] = useState("");

    const authorizedRequestConfig = {headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },};
    

    const onFilterationSubmit = async (filterBody) => {
        console.log(filterBody)
        await getFilteration(trackerId, filterBody, authorizedRequestConfig)
            .then(result => {
                setEvents(result.data);
            })
            .catch(error => console.log(error.response));
    }

    useEffect(() => {   
        const getTrackerAsync = async () => {
            getTracker(trackerId, authorizedRequestConfig)
                .then(result => setTracker(result.data))
                .catch(e => console.log(e))
        }
        const getFiltertionAsync = async (filterParam) => {
            getFilteration(trackerId, filterParam, authorizedRequestConfig)
                .then(result => setEvents(result.data))
                .catch(e => console.log(e))
        }
        getTrackerAsync();
        getFiltertionAsync();
    }, []);


    const showModal = (trackerId) => {
        setId(trackerId);
        handleShow();
    };

    let i = 1;  
    return (<div>
        <FiltrationForm onFilteration={onFilterationSubmit} /> 

        <Table striped hover variant="dark">
            <tbody>
                {
                    events.map(event => <EventRow rowNumber={i++} event={event} showModal={showModal} tracker={tracker}/>)
                }
            </tbody>
        </Table>
    </div>)

}

export default Filtration;