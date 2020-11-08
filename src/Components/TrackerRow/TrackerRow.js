import deleteIcon from './icons/delete.png';
import './TrackerRow.css';
import { Link } from 'react-router-dom';
import comments from './icons/comments.png';
import photo from './icons/photo.png';
import rating from './icons/rating.png';
import scale from './icons/scale.png';
import location from './icons/location.png';

const TrackerRow = ({ rowNumber, tracker, showModal }) => {

    const { id,
        name,
        customizationSettings: { isPhotoRequired },
        customizationSettings: { isRatingRequired },
        customizationSettings: { isGeotagRequired },
        customizationSettings: { isCommentRequired },
        customizationSettings: { isScaleRequired },
        customizationSettings: { scaleMeasurementUnit },
        customizationSettings: { isCustomizationRequired }
    } = tracker;

    return (<>
        <tr>
            <td className="rowNumber">{rowNumber}</td>
            <td className="nameCell">
                <Link to={"tracker/" + id}>{name}</Link>
            </td>
            <td className="iconsCell">
                <span>
                    {
                        isPhotoRequired ? <img src={photo} className="tableIcon" /> : null
                    }
                    {
                        isScaleRequired ? <img src={scale} className="tableIcon" /> : null
                    }
                    {
                        isRatingRequired ? <img src={rating} className="tableIcon" /> : null
                    }
                    {
                        isCommentRequired ? <img src={comments} className="tableIcon" /> : null
                    }
                    {
                        isGeotagRequired ? <img src={location} className="tableIcon" /> : null
                    }
                </span>
            </td>
            {/* <td className="changingCell">
            <img onClick={() => setChanging(!isChanging)} src={change} className="tableIcon"/>
        </td> */}
            <td className="deleteCell">
                <img onClick={() => showModal(id)} src={deleteIcon} className="tableIcon" />
            </td>
        </tr>
    </>
    )
}

export default TrackerRow;
