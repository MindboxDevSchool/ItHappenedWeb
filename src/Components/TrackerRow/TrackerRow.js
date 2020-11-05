import {getTrackers, createTracker, deleteTracker} from '../Api/Api';
import { useEffect, useState } from "react";
import TrackerForm from '../TrackerForm/TrackerForm';
import {ListGroup, Table, Modal, Button, FormCheck, Form, FormControl} from 'react-bootstrap';
import change from './icons/change.png';
import deleteIcon from './icons/delete.png';
import './TrackerRow.css';
import { Link } from 'react-router-dom';
import comments from './icons/comments.png';
import photo from './icons/photo.png';
import rating from './icons/rating.png';
import scale from './icons/scale.png';
import location from './icons/location.png';

const TrackerRow = ({rowNumber, tracker, showModal}) => {

    const [id, setId] = useState(tracker.id);
    const [name, setName] = useState(tracker.name);
    const [isChanging, setChanging] = useState(false);
    const [isCustomizationRequired, setCustomizationRequired] = useState(tracker.customizationSettings.isCustomizationRequired);
    const [isRatingRequired, setRatingRequired] = useState(tracker.customizationSettings.isRatingRequired);
    const [isGeotagRequired, setGeoTagRequired] = useState(tracker.customizationSettings.isGeotagRequired);
    const [isCommentRequired, setCommentRequired] = useState(tracker.customizationSettings.isCommentRequired);
    const [isScaleRequired, setScaleRequired] = useState(tracker.customizationSettings.isScaleRequired);
    const [isPhotoRequired, setPhotoRequired] = useState(tracker.customizationSettings.isCustomizationRequired);
    const [scaleMeasurementUnit, setScaleMeasurementUnit] = useState(tracker.customizationSettings.scaleMeasurementUnit);

    return (<>
    <tr>
    <td className="rowNumber">{rowNumber}</td>
        <td className="nameCell">
            {
                isChanging ? <FormControl value={name} onChange={e => setName(e.target.value)} className="tableCellInput"/> : 
                <Link to={"tracker/" + tracker.id}>{name}</Link>
            }
            </td>
            <td className="iconsCell">
                <span>
                {                  
                    isPhotoRequired ? <img src={photo} className="tableIcon"/> : null
                }
                {
                    isScaleRequired ? <img src={scale} className="tableIcon"/> : null
                }
                {
                    isRatingRequired ? <img src={rating} className="tableIcon"/> : null
                }
                {
                    isCommentRequired ? <img src={comments} className="tableIcon"/> : null
                }
                {
                    isGeotagRequired ? <img src={location} className="tableIcon"/> : null
                }
                </span>

            </td>
        <td className="changingCell">
            <img onClick={() => setChanging(!isChanging)} src={change} className="tableIcon"/>
        </td>
        <td className="deleteCell">
            <img onClick={() => showModal(id)} src={deleteIcon} className="tableIcon"/>
        </td>
    </tr>
          </>
    )
} 

export default TrackerRow;


// id,
// name, 
// customizationSettings : 
// {
//     isPhotoRequired, 
//     isScaleRequired, 
//     isRatingRequired, 
//     isGeotagRequired, 
//     isCommentRequired, 
//     scaleMeasurementUnit
// } }, rowNumber