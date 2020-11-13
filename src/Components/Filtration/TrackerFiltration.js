import FiltrationForm from '../Filtration/FiltrationForm'
import EventReadonlyRow from '../Filtration/EventReadonlyRow'
import { getFilteratedEvents } from '../Api/Api';
import { useState } from 'react';
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";

const TrackerFiltration = () => {

    const [events, setEvents] = useState([]);
    const { trackerId } = useParams();


    const onFilteration = async (filterParam) => {
        await getFilteratedEvents(trackerId, filterParam)
            .then(result => setEvents(result.data))
            .catch(error => console.log(error.response));
    }

    return (<div><br />
        {/* <h2>{tracker.name}</h2> */}
        <FiltrationForm onFilteration={onFilteration} />
        <Table striped hover variant="dark">
            <tbody>
                {
                    events.map(event => {
                        return <EventReadonlyRow  {...event} />
                    })
                }
            </tbody>
        </Table>
    </div>)
}


export default TrackerFiltration;