import {useState} from 'react';
import {Form,Button, Col, FormControl} from 'react-bootstrap';
import submit from './icons/submit.png';
import './EventForm.css';
import  { DateTimePicker,MuiPickersUtilsProvider }  from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';


const EventForm = ({onAdd}) => {

    const [date, setDate] = useState("");
    const [photo, setPhoto] = useState({});
    const [scale, setScale] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("")
    const [selectedDate, handleDateChange] = useState(new Date());

    const toBase64 = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => console.log(reader.result);
        reader.onerror = error => console.log((error));
    }

    return <Form onSubmit=
            {e => {e.preventDefault(); onAdd(
              {"comment": comment, 
                "scale": Number(scale),
                "rating": Number(rating),
                "happensDate" : selectedDate,
                "photo" : photo
                });}}>

                <Form.Row>
                    <Col>
                    <Form.Control placeholder="Scale" value={scale} onChange={e => setScale(e.target.value)}/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)}/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Comment" value={comment} onChange={e => setComment(e.target.value)}/>
                    </Col>
                    <Col>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={selectedDate} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>
                    </Col>
                    <Col>
                        <Form.File label="Photo" lang="en" custom type="file" accept=".png" 
                            onChange={e => toBase64(e.target.files[0])}/>
                    </Col>
                    <Button type="submit" variant="outline-secondary" className="submitButton">
                        <img src={submit} className="buttonIcon"/>
                    </Button>
                </Form.Row>
        </Form>;

}

export default EventForm;

// public DateTimeOffset HappensDate { get; set; }
// public string Photo { get; set; }
// public double? Scale { get; set; }
// public double? Rating { get; set; }
// public GeoTagRequest GeoTag { get; set; }
// public string Comment { get; set; }