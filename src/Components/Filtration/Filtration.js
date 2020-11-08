import { getTrackers, createTracker, deleteTracker } from "../Api/Api";
import { useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import TrackerReadonlyRow from "../Filtration/TrackerReadonlyRow"
import "./Filtration.css";
const Filtration = () => {
    const [trackers, setTrackers] = useState([]);

    const authorizedRequestConfig = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    useEffect(() => {
        const getTrackersAsync = async () => {
            await getTrackers(authorizedRequestConfig)
                .then((result) => setTrackers(result.data))
                .catch((e) => console.log(e));
        };
        getTrackersAsync();
    }, []);

    let i = 1;
    return (
        <div>
            <br />
            <Table striped hover variant="dark">
                <tbody>
                    {trackers.map((tracker) => (
                        <TrackerReadonlyRow
                            rowNumber={i++}
                            tracker={tracker}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Filtration;
