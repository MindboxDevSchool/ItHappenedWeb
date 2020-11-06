import { getTrackers, createTracker, deleteTracker } from "../Api/Api";
import { useEffect, useState } from "react";
import TrackerForm from "../TrackerForm/TrackerForm";
import {
  Table,
  Modal,
  Button,
} 
from "react-bootstrap";
import "./Tracker.css";
import TrackerRow from "../TrackerRow/TrackerRow";

const Tracker = () => {
  const [id, setId] = useState("");
  const [trackers, setTrackers] = useState([]);
  const [show, setShow] = useState(false);
  const [isChanging, setChanging] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const addTracker = async (trackerBody) => {
    await createTracker(trackerBody, authorizedRequestConfig)
      .then((result) => {
        trackerBody.id = result.data.id;
        setTrackers([...trackers, trackerBody]);
      })
      .catch((error) => console.log(error.response));
  };

  const onDeleteTracker = async () => {
    console.log(trackers);
    console.log(id);

    await deleteTracker(id, authorizedRequestConfig)
      .then((result) => {
        setTrackers(trackers.filter((e) => e.id != id));
      })
      .catch((error) => console.log(error.response));

    console.log(trackers);
  };

  let i = 1;

  const showModal = (trackerId) => {
    setId(trackerId);
    handleShow();
  };

  return (
    <div>
      <br />
      <Table striped hover variant="dark">
        <tbody>
          {trackers.map((tracker) => (
            <TrackerRow
              rowNumber={i++}
              tracker={tracker}
              showModal={showModal}
            />
          ))}
        </tbody>
      </Table>

      <TrackerForm onAdd={addTracker} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          Do you really want to delete a track? Data cannot be recovered
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={(e) => {
              onDeleteTracker();
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tracker;
