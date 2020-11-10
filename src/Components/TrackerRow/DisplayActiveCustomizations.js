import comments from "./icons/comments.png";
import photo from "./icons/photo.png";
import rating from "./icons/rating.png";
import scale from "./icons/scale.png";
import location from "./icons/location.png";
import "./TrackerRow.css";

const DisplayActiveCustomizations = (props) => {
    return (
        <span>
            {props.trackerSettings.isPhotoRequired ? (
              <img src={photo} alt="photo" className="tableIcon" />
            ) : null}
            {props.trackerSettings.isScaleRequired ? (
              <img src={scale} alt="scale " className="tableIcon" />
            ) : null}
            {props.trackerSettings.isRatingRequired ? (
              <img src={rating} alt="rating" className="tableIcon" />
            ) : null}
            {props.trackerSettings.isCommentRequired ? (
              <img src={comments} alt="comments" className="tableIcon" />
            ) : null}
            {props.trackerSettings.isGeotagRequired ? (
              <img src={location} alt="location" className="tableIcon" />
            ) : null}
          </span>
    )
}

export default DisplayActiveCustomizations;