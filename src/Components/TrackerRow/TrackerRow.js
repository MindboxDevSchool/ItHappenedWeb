import deleteIcon from "./icons/delete.png";
import changeIcon from "./icons/change.png";
import "./TrackerRow.css";
import {
  FormCheck,
  Form,
  Button,
  FormControl,
  InputGroup,
  Collapse,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import comments from "./icons/comments.png";
import photo from "./icons/photo.png";
import rating from "./icons/rating.png";
import scale from "./icons/scale.png";
import location from "./icons/location.png";
import { useState } from "react";

const TrackerRow = (props) => {
  const [tracker, setTracker] = useState(props.tracker);
  const [trackerName, setTrackerName] = useState(props.tracker.name);
  const [isPhotoRequired2, setPhotoRequired2] = useState(false);
  const [isCommentRequired2, setCommentRequired2] = useState(false);
  const [isRatingRequired2, setRatingRequired2] = useState(false);
  const [isScaleRequired2, setScaleRequired2] = useState(false);
  const [isGeoTagRequired2, setGeoTagRequired2] = useState(false);

  const [x, setX] = useState(false);

  const soldCheckbox = ({ target: { checked } }) => {
    console.log(isPhotoRequired2, checked);
    setPhotoRequired2(checked);
  };


  const [isEditOpen, setEditOpen] = useState(false);
  const {
    id,
    name,
    customizationSettings: { isPhotoRequired },
    customizationSettings: { isRatingRequired },
    customizationSettings: { isGeotagRequired },
    customizationSettings: { isCommentRequired },
    customizationSettings: { isScaleRequired },
    customizationSettings: { scaleMeasurementUnit },
    customizationSettings: { isCustomizationRequired },
  } = tracker;

  var editedName;
  var photoOption;
  return (
    <>
      <tr>
        <td className="rowNumber">{props.rowNumber}</td>
        <td className="nameCell">
          <Link to={"tracker/" + id}>{name}</Link>
        </td>
        <td className="iconsCell">
          <span>
            {isPhotoRequired ? <img src={photo} className="tableIcon" /> : null}
            {isScaleRequired ? <img src={scale} className="tableIcon" /> : null}
            {isRatingRequired ? (
              <img src={rating} className="tableIcon" />
            ) : null}
            {isCommentRequired ? (
              <img src={comments} className="tableIcon" />
            ) : null}
            {isGeotagRequired ? (
              <img src={location} className="tableIcon" />
            ) : null}
          </span>
        </td>
        <td className="changingCell">
          <Button
            onClick={() => setEditOpen(!isEditOpen)}
            aria-controls="example-collapse-text"
            aria-expanded={isEditOpen}
          >
            <img src={changeIcon} alt="change" className="tableIcon" />
          </Button>
        </td>
        <td className="deleteCell">
          <img
            onClick={() => props.showModal(id)}
            src={deleteIcon}
            alt="delete"
            className="tableIcon"
          />
        </td>
      </tr>

      <Collapse in={isEditOpen}>
        <tr>
          <td className="rowNumber"></td>
          <td className="nameCell">
            <Form onSubmit={e => {
              e.preventDefault();
              props.onEdit({name: "New edited name22", 
                "customizationSettings": {
                    "scaleMeasurementUnit" : "lb",
                    "isPhotoRequired" : true,
                    "isScaleRequired" : true,
                    "isRatingRequired" : false,
                    "isGeotagRequired" : false,
                    "isCommentRequired" : false,
                    "isCustomizationRequired" : false
                    }}, tracker.id);
            }}
            >
              <FormControl
                placeholder="edited name"
                minLength="3"
                required
                value={editedName}
              />
              <Button
                onClick={() => setEditOpen(!isEditOpen)}
                aria-controls="example-collapse-text"
                aria-expanded={isEditOpen}
              >
                Add customization
              </Button>
              <InputGroup>
                <div>
                  <img src={photo} className="tableIcon" />
                  <FormCheck id="photoBox" type="checkbox" checked={isPhotoRequired2} onChange={soldCheckbox}></FormCheck>
                </div>
                <div>
                  <img src={scale} className="tableIcon" />
                  <FormCheck type="checkbox" ></FormCheck>
                </div>
                <div>
                  <img src={rating} className="tableIcon" />
                  <FormCheck type="checkbox"></FormCheck>
                </div>
                <div>
                  <img src={comments} className="tableIcon" />
                  <FormCheck type="checkbox"></FormCheck>
                </div>
                <div>
                  <img src={location} className="tableIcon" />
                  <FormCheck type="checkbox"></FormCheck>
                </div>
                <InputGroup.Append>
                  <Button variant="outline-secondary" type="submit">Confirm</Button>
                </InputGroup.Append>
            </InputGroup>
            </Form>
          </td>
          <td className="iconsCell"></td>
          <td className="changingCell"></td>
          <td className="deleteCell"></td>
        </tr>
      </Collapse>
    </>
  );
};

export default TrackerRow;
