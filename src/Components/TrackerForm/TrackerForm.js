import { useState } from 'react';
import { Form, Button, InputGroup, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import './TrackerForm.css';
import minus from './icons/minus.png'
import plus from './icons/plus.png';
import submit from './icons/submit.png';

const btnVariant = "outline-secondary";

const TrackerForm = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [isCustomizationRequired, setCustomizationRequired] = useState(false);
  const [isRatingRequired, setRatingRequired] = useState(false);
  const [isGeotagRequired, setGeoTagRequired] = useState(false);
  const [isCommentRequired, setCommentRequired] = useState(false);
  const [isScaleRequired, setScaleRequired] = useState(false);
  const [isPhotoRequired, setPhotoRequired] = useState(false);
  const [scaleMeasurementUnit, setScaleMeasurementUnit] = useState("");

  return <Form onSubmit={e => {
    e.preventDefault();
    onFilter(
      {
        "name": name,
        "customizationSettings": {
          "scaleMeasurementUnit": scaleMeasurementUnit,
          "isPhotoRequired": isPhotoRequired,
          "isScaleRequired": isScaleRequired,
          "isRatingRequired": isRatingRequired,
          "isGeotagRequired": isGeotagRequired,
          "isCommentRequired": isCommentRequired,
          "isCustomizationRequired": isCustomizationRequired
        }
      }
    ); setName("");
  }}>

    <InputGroup>
      <FormControl placeholder="Enter name for a new tracker" value={name} onChange={e => setName(e.target.value)} />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={e => setCustomizationRequired(!isCustomizationRequired)}>
          {isCustomizationRequired ? "Delete" : "Add"} customization
          </Button>
        <Button type="submit" variant="outline-secondary">
          <img src={submit} className="buttonIcon" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
    <br />
    <InputGroup className={isCustomizationRequired ? "showItem" : "hiddenItem"}>
      <Button variant={btnVariant} onClick={e => setPhotoRequired(!isPhotoRequired)}>
        <img src={isPhotoRequired ? plus : minus} className="buttonIcon" /> Photo
          </Button>
      <Button variant={btnVariant} onClick={e => setRatingRequired(!isRatingRequired)}>
        <img src={isRatingRequired ? plus : minus} className="buttonIcon" /> Rating
          </Button>
      <Button variant={btnVariant} onClick={e => setGeoTagRequired(!isGeotagRequired)}>
        <img src={isGeotagRequired ? plus : minus} className="buttonIcon" /> Geotag
          </Button>
      <Button variant={btnVariant} onClick={e => setCommentRequired(!isCommentRequired)}>
        <img src={isCommentRequired ? plus : minus} className="buttonIcon" /> Comment
          </Button>
      <Button variant={btnVariant} onClick={e => setScaleRequired(!isScaleRequired)}>
        <img src={isScaleRequired ? plus : minus} className="buttonIcon" /> Scale
          </Button>
      <FormControl placeholder="Scale measurement"
        disabled={!isScaleRequired} value={scaleMeasurementUnit} onChange={e => setScaleMeasurementUnit(e.target.value)} />
    </InputGroup>
  </Form>;
}

export default TrackerForm;


