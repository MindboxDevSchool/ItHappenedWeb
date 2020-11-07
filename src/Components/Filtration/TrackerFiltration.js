import FiltrationForm from '../Filtration/FiltrationForm'
import EventReadonlyRow from '../Filtration/EventReadonlyRow'
import { getFilteratedEvents, getTracker } from '../Api/Api';
import { useState, useEffect } from 'react';
import { Table } from "react-bootstrap";

import { useParams } from "react-router-dom";

const TrackerFiltration = () => {
    const authorizedRequestConfig = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }; //TODO resolve authorizedRequestConfig in api 

    const [events, setEvents] = useState([]);
    const { trackerId } = useParams();
    const [tracker, setTracker] = useState({});

    const onFilteration = async (filterParam) => {
        console.log(filterParam)
        await getFilteratedEvents(trackerId, filterParam, authorizedRequestConfig)
            .then(result => {
                setEvents([...events, result.data]);
            })
            .catch(error => console.log(error.response));
    }

    useEffect(() => {

        const getTrackerAsync = async () => {
            getTracker(trackerId, authorizedRequestConfig)
                .then(result => setTracker(result.data))
                .catch(e => console.log(e))
        }
        getTrackerAsync();

    }, []);


    return (<div><br />
        <h2>{tracker.name}</h2>

        <FiltrationForm onFilteration={onFilteration} />

        <Table striped hover variant="dark">
            <tbody>
                {
                    events.map(event => <EventReadonlyRow event={event} />)
                }
            </tbody>
        </Table>

    </div>)
}


export default TrackerFiltration;