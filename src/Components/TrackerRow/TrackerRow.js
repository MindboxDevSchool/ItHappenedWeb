import deleteIcon from "./icons/delete.png";
import changeIcon from "./icons/change.png";
import "./TrackerRow.css";
import { NavLink, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import comments from "./icons/comments.png";
import photo from "./icons/photo.png";
import rating from "./icons/rating.png";
import scale from "./icons/scale.png";
import location from "./icons/location.png";
import { useState } from "react";

const TrackerRow = (props) => {
  const[tracker, setTracker] = useState(props.tracker);

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

  const toTrackerEditor = { 
    pathname: "/editor/" + tracker.id, 
    trackerName: tracker.name,
    trackerId: tracker.id,
    handleEdit: props.onEdit,
    updateTrackerRow: setTracker
  };

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
            <Link to={toTrackerEditor}>
              <img src={changeIcon} alt="change" className="tableIcon" />
            </Link>
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
    </>
  );
}; 

export default TrackerRow;
