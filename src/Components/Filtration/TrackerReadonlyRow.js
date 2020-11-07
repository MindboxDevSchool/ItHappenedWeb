import { Link } from 'react-router-dom';

import './TrackerReadonlyRow.css';

const TrackerReadonlyRow = ({ rowNumber, tracker }) => {
    const { id,
        name,
        customizationSettings: { isPhotoRequired },
        customizationSettings: { isRatingRequired },
        customizationSettings: { isGeotagRequired },
        customizationSettings: { isCommentRequired },
        customizationSettings: { isScaleRequired },
    } = tracker;

    return (
        <div>
            <tr>
                <td className="rowNumber">{rowNumber}</td>
                <td className="nameCell"><Link to={"filtration/" + id}>{name}</Link>
                </td>
                <td className="iconsCell">
                    <span>
                        {
                            isPhotoRequired ? <img src={process.env.PUBLIC_URL + '/img/photo.png'} className="tableIcon" /> : null
                        }
                        {
                            isScaleRequired ? <img src={process.env.PUBLIC_URL + '/img/scale.png'} className="tableIcon" /> : null
                        }
                        {
                            isRatingRequired ? <img src={process.env.PUBLIC_URL + '/img/rating.png'}  className="tableIcon" /> : null
                        }
                        {
                            isCommentRequired ? <img src={process.env.PUBLIC_URL + '/img/comments.png'}  className="tableIcon" /> : null
                        }
                        {
                            isGeotagRequired ? <img src={process.env.PUBLIC_URL + '/img/location.png'}  className="tableIcon" /> : null
                        }
                    </span>
                </td>
            </tr>
        </div>
    )
}

export default TrackerReadonlyRow;
