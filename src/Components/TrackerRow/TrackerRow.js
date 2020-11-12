import deleteIcon from "./icons/delete.png";
import changeIcon from "./icons/change.png";
import "./TrackerRow.css";
import {
  Form,
  Button,
  FormControl,
  InputGroup,
  Collapse,
  Toast,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import { editTracker } from "../../Components/Api/Api";
import DisplayActiveCustomizations from "./DisplayActiveCustomizations";
import DisplayCustomizationEditor from "./DisplayCustomizationEditor";

const TrackerRow = (props) => {
  const [trackerName, setTrackerName] = useState(props.tracker.name);
  const [trackerSettings, setTrackerSettings] = useState(
    props.tracker.customizationSettings
  );
  const [
    isEditCustomizationBtnPressed,
    setEditCustomizationBtnPressed,
  ] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditOpen, setEditOpen] = useState(false);

  const authorizedRequestConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  const onEditTracker = async (editedTracker, trackerId) => {
    await editTracker(trackerId, editedTracker, authorizedRequestConfig)
      .then((result) => {
        if (result.status === 200) {
          setTrackerName(editedTracker.name);
          setTrackerSettings(editedTracker.customizationSettings);
        }
      })
      .catch((e) => {
        setErrorMessage(
          e.response.data.ErrorMessage ||
            e.response.data.title + JSON.stringify(e.response.data.errors)
        );
        setIsError(true);
      });
  };

  const sendSubmit = (values) => {
    onEditTracker(
      {
        name: values.newName,
        customizationSettings: {
          isPhotoRequired: values.isEditedTrackerPhotoRequired,
          isRatingRequired: values.isEditedTrackerRatingRequired,
          isGeotagRequired: values.isEditedTrackerGeoTagRequired,
          isCommentRequired: values.isEditedTrackerCommentRequired,
          isScaleRequired: values.isEditedTrackerScaleRequired,
          isCustomizationRequired: values.isEditedTrackerCustomizationRequired,
          scaleMeasurementUnit: values.editedTrackerScaleMeasurementUnit,
        },
      },
      props.tracker.id
    );
  };

  return (
    <>
      <tr>
        <td className="rowNumber">{props.rowNumber}</td>
        <td className="nameCell">
          <Link to={"tracker/" + props.tracker.id}>{trackerName}</Link>
          {isError && (
            <div className="container">
              <Toast onClose={() => setIsError(false)} show={isError}>
                <Alert variant="dark">
                  <Toast.Header>{errorMessage}</Toast.Header>
                  <Toast.Body></Toast.Body>
                </Alert>
              </Toast>
            </div>
          )}
        </td>
        <td className="iconsCell">
          <DisplayActiveCustomizations
            trackerSettings={trackerSettings}
          ></DisplayActiveCustomizations>
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
            onClick={() => props.showModal(props.tracker.id)}
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
                newName: props.tracker.name,
                isEditedTrackerCustomizationRequired:
                  props.tracker.customizationSettings.isCustomizationRequired,
                isEditedTrackerPhotoRequired:
                  props.tracker.customizationSettings.isPhotoRequired,
                isEditedTrackerCommentRequired:
                  props.tracker.customizationSettings.isCommentRequired,
                isEditedTrackerScaleRequired:
                  props.tracker.customizationSettings.isScaleRequired,
                isEditedTrackerRatingRequired:
                  props.tracker.customizationSettings.isRatingRequired,
                isEditedTrackerGeoTagRequired:
                  props.tracker.customizationSettings.isGeotagRequired,
                editedTrackerScaleMeasurementUnit: "",
              }}
            >
              {({ handleSubmit, handleChange, handleBlur, values }) => {
                return (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <InputGroup>
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
                        <InputGroup.Append>
                          <Button
                            variant="outline-primary"
                            onClick={() =>
                              setEditCustomizationBtnPressed(
                                !isEditCustomizationBtnPressed
                              )
                            }
                          >
                            Edit customization
                          </Button>
                        </InputGroup.Append>
                        <InputGroup.Append>
                          <Button
                            type="submit"
                            onClick={() => {
                              setEditOpen(!isEditOpen);
                              setEditCustomizationBtnPressed(
                                !isEditCustomizationBtnPressed
                              );
                            }}
                          >
                            Confirm
                          </Button>
                        </InputGroup.Append>
                      </InputGroup>
                      <InputGroup>
                        {isEditCustomizationBtnPressed && (
                          <DisplayCustomizationEditor></DisplayCustomizationEditor>
                        )}
                      </InputGroup>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </Collapse>
    </>
  );
};

export default TrackerRow;
