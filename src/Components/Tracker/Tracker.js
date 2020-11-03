import {getTrackers} from '../Api/Api';
import { useEffect, useState } from "react";
import TrackerForm from '../TrackerForm/TrackerForm';
import {ListGroup} from 'react-bootstrap';

const Tracker = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [trackers, setTrackers] = useState([]);
    
    useEffect(() => {
        
        const getTrackersAsync = async () => {
            getTrackers()
            .then(result =>  setTrackers(result.data))
            .catch(e => console.log(e))
        }
        getTrackersAsync();
      }, []);

    const addTracker = (tracker) => {
        useState({...trackers, tracker})
    }  

    return (<div>
        {
            trackers.map(tracker => 
                <ListGroup>
                    <ListGroup.Item action href={"tracker/" + tracker.id}>
                        {tracker.name}
                    </ListGroup.Item>
                </ListGroup>)
        }
        <TrackerForm />
    </div>);
}

export default Tracker;
