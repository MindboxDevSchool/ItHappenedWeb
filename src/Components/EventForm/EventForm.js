import {useState} from 'react';
import {Form,Button, Col, FormControl} from 'react-bootstrap';
import submit from './icons/submit.png';
import './EventForm.css';
import  { DateTimePicker,MuiPickersUtilsProvider }  from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';


const EventForm = ({onAdd, tracker}) => {
    console.log(tracker);
    const [photo, setPhoto] = useState("");
    const [scale, setScale] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("")
    const [selectedDate, handleDateChange] = useState(new Date());

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

    const toBase64 = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setPhoto(reader.result);
        reader.onerror = error => console.log((error));
    }

    return <Form onSubmit=
            {e => {e.preventDefault(); onAdd(
              {"comment": comment, 
                "scale": scale ? Number(scale) : null,
                "rating": rating ? Number(rating) : null,
                "happensDate" : selectedDate,
                "photo" : photo ? photo : null
                });}}>

                <Form.Row>
                    {
                        isScaleRequired ?            
                            <Col xs={1}>
                                <Form.Control placeholder="Scale" value={scale} onChange={e => setScale(e.target.value)}/>
                            </Col> : null
                    }

                    <Col xs={2}>
                    <Form.Control placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)}/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)}/>
                    </Col>
                    <Col>
                        <Form.File label="Photo" lang="en" custom type="file"  
                            onChange={e => toBase64(e.target.files[0])}/>
                    </Col>
                    <Col xs={4}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>
                    </Col>
                    <Button type="submit" variant="outline-secondary" className="submitButton">
                        <img src={submit} className="buttonIcon"/>
                    </Button>
                </Form.Row>
        </Form>;

}

export default EventForm;
