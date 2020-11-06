import {useState} from 'react';
import {Form,Button, Col, FormControl} from 'react-bootstrap';
//import './TrackerForm.css';
import submit from './icons/submit.png';

const EventForm = ({onAdd}) => {

// public DateTimeOffset HappensDate { get; set; }
// public string Photo { get; set; }
// public double? Scale { get; set; }
// public double? Rating { get; set; }
// public GeoTagRequest GeoTag { get; set; }
// public string Comment { get; set; }
    const [date, setDate] = useState("");
    const [photo, setPhoto] = useState("");
    const [scale, setScale] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("")

    return <Form onSubmit=
            {e => {e.preventDefault(); onAdd(
              {"comment": comment, 
                "scale": Number(scale),
                "rating": Number(rating)
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
                    {/* <Col xs={7}>
                    <Form.Control placeholder="Date" />
                    </Col> */}
                    <Button type="submit" variant="outline-secondary">
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