import { useState } from "react";
import {
  Form,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import "../TrackerForm/TrackerForm.css";
import minus from "../TrackerForm/icons/minus.png";
import plus from "../TrackerForm/icons/plus.png";
import submit from "../TrackerForm/icons/submit.png";

const TrackerEditor = (props) => {
  const [name, setName] = useState("");
  const [isCustomizationRequired, setCustomizationRequired] = useState(false);
  const [isRatingRequired, setRatingRequired] = useState(false);
  const [isGeotagRequired, setGeoTagRequired] = useState(false);
  const [isCommentRequired, setCommentRequired] = useState(false);
  const [isScaleRequired, setScaleRequired] = useState(false);
  const [isPhotoRequired, setPhotoRequired] = useState(false);
  const [scaleMeasurementUnit, setScaleMeasurementUnit] = useState("");
  const [isEdited, setEdited] = useState(false);

  const btnVariant = "outline-secondary";

  const closeSuccessMessage = () => {
    setTimeout(() => {
      setEdited(false);
    }, 6000);
  };
  //TODO: 1.Need to make error handling from api
  //      2.Now to edit always have to change name or api gives error that tracker with such name already exist
  //      but page shows success message. 
  const successMessage = "Editing successful";

  return (
    <>
    <div>
      <br />
      <h2>Old tracker name: {props.location.trackerName}</h2>
      </div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          props.location.handleEdit(
            {
              name: name,
              customizationSettings: {
                scaleMeasurementUnit: scaleMeasurementUnit,
                isPhotoRequired: isPhotoRequired,
                isScaleRequired: isScaleRequired,
                isRatingRequired: isRatingRequired,
                isGeotagRequired: isGeotagRequired,
                isCommentRequired: isCommentRequired,
                isCustomizationRequired: isCustomizationRequired,
              },
            },
            props.location.trackerId
          );

          setEdited(true);
        }}
      >
        <div>
          <br/>
          <h5>Enter new tracker name and customization settings:</h5>
        </div>
        <InputGroup>
          <FormControl
            placeholder="Enter name for a new tracker"
            minLength="3"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputGroup.Append>
            <Button
              variant="outline-secondary"
              onClick={(e) =>
                setCustomizationRequired(!isCustomizationRequired)
              }
            >
              {isCustomizationRequired ? "Delete" : "Add"} customization
            </Button>
            <Button type="submit" variant="outline-secondary">
              <img src={submit} className="buttonIcon" />
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <br />
        <InputGroup
          className={isCustomizationRequired ? "showItem" : "hiddenItem"}
        >
          <Button
            variant={btnVariant}
            onClick={(e) => setPhotoRequired(!isPhotoRequired)}
          >
            <img src={isPhotoRequired ? plus : minus} className="buttonIcon" />{" "}
            Photo
          </Button>
          <Button
            variant={btnVariant}
            onClick={(e) => setRatingRequired(!isRatingRequired)}
          >
            <img src={isRatingRequired ? plus : minus} className="buttonIcon" />{" "}
            Rating
          </Button>
          <Button
            variant={btnVariant}
            onClick={(e) => setGeoTagRequired(!isGeotagRequired)}
          >
            <img src={isGeotagRequired ? plus : minus} className="buttonIcon" />{" "}
            Geotag
          </Button>
          <Button
            variant={btnVariant}
            onClick={(e) => setCommentRequired(!isCommentRequired)}
          >
            <img
              src={isCommentRequired ? plus : minus}
              className="buttonIcon"
            />{" "}
            Comment
          </Button>
          <Button
            variant={btnVariant}
            onClick={(e) => setScaleRequired(!isScaleRequired)}
          >
            <img src={isScaleRequired ? plus : minus} className="buttonIcon" />{" "}
            Scale
          </Button>
          <FormControl
            placeholder="Scale measurement"
            disabled={!isScaleRequired}
            value={scaleMeasurementUnit}
            onChange={(e) => setScaleMeasurementUnit(e.target.value)}
          />
        </InputGroup>
      </Form>
      {isEdited && (
        <Alert variant="success">
          {successMessage} {closeSuccessMessage()}
        </Alert>
      )}
    </>
  );
};

export default TrackerEditor;
