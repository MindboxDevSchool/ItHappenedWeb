import {
  getTrackers,
  createTracker,
  deleteTracker,
} from "../Api/Api";
import { useEffect, useState } from "react";
import TrackerForm from "../TrackerForm/TrackerForm";
import { Table, Modal, Button, Alert } from "react-bootstrap";
import "./Tracker.css";
import TrackerRow from "../TrackerRow/TrackerRow";

const Tracker = () => {
  const [id, setId] = useState("");
  const [trackers, setTrackers] = useState([]);
  const [show, setShow] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeErrorMessage = () => {
    setTimeout(() => {
      setIsError(false);
    }, 6000);
  };

  useEffect(() => {
    const getTrackersAsync = async () => {
      await getTrackers()
        .then((result) => setTrackers(result.data))
        .catch((e) => {
          setErrorMessage(e.response.data.ErrorMessage ||
            e.response.data.title + JSON.stringify(e.response.data.errors));
          setIsError(true);
        });
    };
    getTrackersAsync();
  }, []);

  const addTracker = async (trackerBody) => {
    await createTracker(trackerBody)
      .then((result) => {
        trackerBody.id = result.data.id;
        setTrackers([...trackers, trackerBody]);
      })
      .catch((e) => {
        setErrorMessage(e.response.data.ErrorMessage ||
          e.response.data.title + JSON.stringify(e.response.data.errors));
        setIsError(true);
      });
  };

  const onDeleteTracker = async () => {
    await deleteTracker(id)
      .then((result) => {
        setTrackers(trackers.filter((tr) => tr.id != id));
      })
      .catch((e) => {
        setErrorMessage(e.response.data.ErrorMessage ||
          e.response.data.title + JSON.stringify(e.response.data.errors));
        setIsError(true);
      });
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
              key={tracker.id}
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
      {isError && (
        <Alert variant="danger">
          {errorMessage} {closeErrorMessage()}
        </Alert>
      )}
    </div>
  );
};

export default Tracker;
