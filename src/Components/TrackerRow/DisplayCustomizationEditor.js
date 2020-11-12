import comments from "./icons/comments.png";
import photo from "./icons/photo.png";
import rating from "./icons/rating.png";
import scale from "./icons/scale.png";
import location from "./icons/location.png";
import { Field } from "formik";
import { FormCheck } from "react-bootstrap";
import "./TrackerRow.css";

const DisplayCustomizationEditor = () => {
  return (
    <>
      <div>
        <img src={photo} alt="photoImage" className="tableIcon" />
        <FormCheck className="pl-1">
          <Field type="checkbox" alt="checkbox" name="isEditedTrackerPhotoRequired"></Field>
        </FormCheck>
      </div>
      <div>
        <img src={scale} alt="scale" className="tableIcon" />
        <FormCheck className="pl-1">
          <Field type="checkbox" name="isEditedTrackerScaleRequired"></Field>
        </FormCheck>
      </div>
      <div>
        <img src={rating} alt="rating" className="tableIcon" />
        <FormCheck className="pl-1">
          <Field type="checkbox" name="isEditedTrackerRatingRequired"></Field>
        </FormCheck>
      </div>
      <div>
        <img src={comments} alt="comments" className="tableIcon" />
        <FormCheck className="pl-1">
          <Field type="checkbox" name="isEditedTrackerCommentRequired"></Field>
        </FormCheck>
      </div>
      <div>
        <img src={location} alt="location" className="tableIcon" />
        <FormCheck className="pl-1">
          <Field type="checkbox" name="isEditedTrackerGeoTagRequired"></Field>
        </FormCheck>
      </div>
    </>
  );
};

export default DisplayCustomizationEditor;