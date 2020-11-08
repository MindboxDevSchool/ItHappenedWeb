import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import DateFnsUtils from '@date-io/moment';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';


const FiltrationForm = ({ onFilteration }) => {
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [scaleFrom, setScaleFrom] = useState("");
    const [scaleTo, setScaleTo] = useState("");
    const [ratingFrom, setRatingFrom] = useState("");
    const [ratingTo, setRatingTo] = useState("");
    const [commentSubstring, setComment] = useState("");
    // const [gpsLatLeftCorner, setGpsLatLeftCorner] = useState("");
    // const [gpsLngLeftCorner, setGpsLngLeftCorner] = useState("");
    // const [gpsLatRightCorner, setGpsLatRightCorner] = useState("");
    // const [gpsLngRightCorner, setGpsLngRightCorner] = useState("");

    return <Form onSubmit=
        {e => {
            e.preventDefault();
            let filterParams =  {
                // "FromDateTime": dateFrom,
                // "ToDateTime": dateTo,
                "ScaleLowerLimit": scaleFrom ? Number(scaleFrom) : null,
                "ScaleUpperLimit": scaleTo ? Number(scaleTo) : null,
                "LowerLimitRating": ratingFrom ? Number(ratingFrom) : null,
                "UpperLimitRating": ratingTo ? Number(ratingTo) : null,
                "SubstringForMatching": commentSubstring != "" ? commentSubstring : null
                // "GpsLatLeftCorner": Number(gpsLatLeftCorner),
                // "GpsLngLeftCorner": Number(gpsLngLeftCorner),
                // "GpsLatRightCorner": Number(gpsLatRightCorner),
                // "GpsLngRightCorner": Number(gpsLngRightCorner)
            };
            return onFilteration(filterParams);
        }}>

        <div class="row">
            {/* <div class="col">
                <label>From Date</label>
            </div>
            <div class="col"><MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker value={dateFrom} onChange={setDateFrom} maxDate={Date.now()} />
            </MuiPickersUtilsProvider>
            </div>
            <div class="w-100">

            </div>
            <div class="col">
                <label>To Date</label>
            </div>
            <div class="col"> <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker value={dateTo} onChange={setDateTo} maxDate={Date.now()} />
            </MuiPickersUtilsProvider>
            </div> */}
        </div>

        <Form.Control placeholder="From Scale" value={scaleFrom} onChange={e => setScaleFrom(e.target.value)} />
        <Form.Control placeholder="To Scale" value={scaleTo} onChange={e => setScaleTo(e.target.value)} />
        <Form.Control placeholder="From Rating" value={ratingFrom} onChange={e => setRatingFrom(e.target.value)} />
        <Form.Control placeholder="To Rating" value={ratingTo} onChange={e => setRatingTo(e.target.value)} />
        <Form.Control placeholder="Comment substring" value={commentSubstring} onChange={e => setComment(e.target.value)} />
        {/* <Form.Control placeholder="Gps Latitude Down Left Corner" value={gpsLatLeftCorner} onChange={e => setGpsLatLeftCorner(e.target.value)} />
        <Form.Control placeholder="Gps Longitude Down Left Corner" value={gpsLngLeftCorner} onChange={e => setGpsLngLeftCorner(e.target.value)} />
        <Form.Control placeholder="Gps Latitude Top Upper Corner" value={gpsLatRightCorner} onChange={e => setGpsLatRightCorner(e.target.value)} />
        <Form.Control placeholder="Gps Longitude Top Upper Corner" value={gpsLngRightCorner} onChange={e => setGpsLngRightCorner(e.target.value)} />  */}
        <span> Accept Filter </span>
        <Button type="submit" variant="outline-secondary" className="submitButton">
            <img src={process.env.PUBLIC_URL + '/img/submit.png'} className="buttonIcon" />
        </Button>
    </Form>;
}

const Clean = (obj) => {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

export default FiltrationForm;