import deleteIcon from './icons/delete.png';
import commentsIcon from './icons/comments.png';
import photoIcon from './icons/photo.png';
import ratingIcon from './icons/rating.png';
import scaleIcon from './icons/scale.png';
import locationIcon from './icons/location.png';

const EventRow = ({rowNumber, event, showModal, tracker}) => {
    
    const {id, scale, rating, comment, happensDate, photo} = event;//geoTag,

    const { 
        name, 
        customizationSettings : {isPhotoRequired},
        customizationSettings : {isRatingRequired},
        customizationSettings : {isGeotagRequired},
        customizationSettings : {isCommentRequired},
        customizationSettings : {isScaleRequired},
        customizationSettings : {scaleMeasurementUnit},
        customizationSettings : {isCustomizationRequired}
        } = tracker;

    return (<>
        <tr>
        <td className="rowNumber">{rowNumber}</td>
                    {
                        <td className="scaleCell">{scale}<img src={scaleIcon} className="tableIcon"/></td>
                    }
                    {
                        <td className="ratingCell">{rating}<img src={ratingIcon} className="tableIcon"/></td> 
                    }
                    {
                        
                        <td className="commentCell">{comment}<img src={commentsIcon} className="tableIcon"/> </td>
                    }
                    {/* {
                        isGeotagRequired ? <td className="geoTagCell">{geoTag}</td> : null
                    } */}
                    {                  
                        <td><img src={`data:image/jpeg;base64,${photo}`} className="photoEvent"/></td>
                    }
            {/* <td className="changingCell">
                <img onClick={() => setChanging(!isChanging)} src={change} className="tableIcon"/>
            </td> */}
            <td className="deleteCell">
                <img onClick={() => showModal(id)} src={deleteIcon} className="tableIcon"/>
            </td>
        </tr>
              </>
        )
}

export default EventRow;

// {
//     isScaleRequired ? <td className="scaleCell">{scale}</td> : null
// }
// {
//     isRatingRequired ? <td className="ratingCell">{rating}</td> : null
// }
// {
//     isCommentRequired ? <td className="commentCell">{comment}</td> : null
// }
// {/* {
//     isGeotagRequired ? <td className="geoTagCell">{geoTag}</td> : null
// } */}
// {                  
//     isPhotoRequired ? <td><img src={`data:image/jpeg;base64,${photo}`} className="photoEvent"/></td> : null
// }