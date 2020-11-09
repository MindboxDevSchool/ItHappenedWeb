import deleteIcon from "./icons/delete.png";
import changeIcon from "./icons/change.png";
import "./TrackerRow.css";
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Collapse,
  FormLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import comments from "./icons/comments.png";
import photo from "./icons/photo.png";
import rating from "./icons/rating.png";
import scale from "./icons/scale.png";
import location from "./icons/location.png";
import { useState } from "react";
import { Formik, Field } from "formik";
import { editTracker } from "../../Components/Api/Api";

const TrackerRow = (props) => {
  const [tracker, setTracker] = useState(props.tracker);
  const [trackerName, setTrackerName] = useState(props.tracker.name);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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

  const authorizedRequestConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const onEditTracker = async (editedTracker, trackerId) => {
    await editTracker(trackerId, editedTracker, authorizedRequestConfig)
      .then((result) => {
        var t = result;
      })
      .catch((e) => {
        setErrorMessage(e.response.data.ErrorMessage);
        setIsError(true);
      });
  };

  const sendSubmit = (values) => {
    onEditTracker(
      {
        name: values.newName,
        customizationSettings: {
          isPhotoRequired: values.isPhotoRequired3,
          isRatingRequired: values.isRatingRequired3,
          isGeotagRequired: values.isGeoTagRequired3,
          isCommentRequired: values.isCommentRequired3,
          isScaleRequired: values.isScaleRequired3,
          isCustomizationRequired: values.isCustomizationRequired3,
          scaleMeasurementUnit: values.scaleMeasurementUnit3,
        },
      },
      props.tracker.id
    );
    //setTrackerName(values.newName);
  };

  return (
    <>
      <tr>
        <td className="rowNumber">{props.rowNumber}</td>
        <td className="nameCell">
          <Link to={"tracker/" + id}>{trackerName}</Link>
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
            <Formik
              onSubmit={sendSubmit}
              initialValues={{
                newName: "",
                isCustomizationRequired3: false,
                isPhotoRequired3: false,
                isCommentRequired3: false,
                isScaleRequired3: false,
                isRatingRequired3: false,
                isGeoTagRequired3: false,
                scaleMeasurementUnit3: "",
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                errors,
              }) => {
                return (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <FormControl
                        type="text"
                        name="newName"
                        placeholder="edited name"
                        minLength="3"
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newName}
                      />

                      <InputGroup>
                        <div>
                          <FormLabel>Require customization</FormLabel>
                          <Field
                            type="checkbox"
                            name="isCustomizationRequired3"
                          ></Field>
                        </div>
                        <div>
                          <img src={photo} className="tableIcon" />
                          <Field
                            type="checkbox"
                            name="isPhotoRequired3"
                          ></Field>
                        </div>
                        <div>
                          <img src={scale} className="tableIcon" />
                          <Field
                            type="checkbox"
                            name="isScaleRequired3"
                          ></Field>
                        </div>
                        <div>
                          <img src={rating} className="tableIcon" />
                          <Field
                            type="checkbox"
                            name="isRatingRequired3"
                          ></Field>
                        </div>
                        <div>
                          <img src={comments} className="tableIcon" />
                          <Field
                            type="checkbox"
                            name="isCommentRequired3"
                          ></Field>
                        </div>
                        <div>
                          <img src={location} className="tableIcon" />
                          <Field
                            type="checkbox"
                            name="isGeoTagRequired3"
                          ></Field>
                        </div>
                        <InputGroup.Append>
                          <Button variant="outline-secondary" type="submit">
                            Confirm
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Form>
                  </>
                );
              }}
            </Formik>
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
