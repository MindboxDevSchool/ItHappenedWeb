import {getTrackers, createTracker, deleteTracker} from '../Api/Api';
import { useEffect, useState } from "react";
import TrackerForm from '../TrackerForm/TrackerForm';
import {ListGroup, Table, Modal, Button, FormCheck, Form, FormControl} from 'react-bootstrap';
import change from './icons/change.png';
import deleteIcon from './icons/delete.png';
import './Tracker.css';
import { Link } from 'react-router-dom';
import TrackerRow from '../TrackerRow/TrackerRow';

const Tracker = () => {

    const [id, setId] = useState("");
    const [trackers, setTrackers] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        
        const getTrackersAsync = async () => {
            getTrackers()
            .then(result =>  setTrackers(result.data))
            .catch(e => console.log(e))
        }
        getTrackersAsync();
      }, []);


      const addTracker = async (trackerBody) => {
        await createTracker(trackerBody)
            .then(result => {       
                trackerBody.id = result.data.id;
                setTrackers([...trackers, trackerBody]);   
            })
            .catch(error => console.log(error.response));
      }

      const onDeleteTracker = async () => {

          await deleteTracker(id)         
          .then(result => {setTrackers(trackers.filter((e) => e.id != id))})
          .catch(error => console.log(error.response))
          
      }

    let i = 1;

    const showModal = (trackerId) => {
        setId(trackerId);
        handleShow();
    }

    return (<div><br />
        <Table striped  hover variant="dark">
        <tbody>
            {              
               trackers.map(tracker => <TrackerRow rowNumber={i++} tracker={tracker} showModal={showModal}/>)
            }
        </tbody>
        </Table>
        
        <TrackerForm onAdd={addTracker}/>

        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
        <Modal.Body>
          Do you really want to delete a track? Data cannot be recovered
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={e => {onDeleteTracker();handleClose();}}>Delete</Button>
        </Modal.Footer>
      </Modal>

        </div>)
        }

export default Tracker;








// import {getTrackers, createTracker, deleteTracker} from '../Api/Api';
// import { useEffect, useState } from "react";
// import TrackerForm from '../TrackerForm/TrackerForm';
// import {ListGroup, Table, Modal, Button, FormCheck, Form, FormControl} from 'react-bootstrap';
// import change from './icons/change.png';
// import deleteIcon from './icons/delete.png';
// import './Tracker.css';
// import { Link } from 'react-router-dom';

// const Tracker = () => {
//     const [id, setId] = useState("");
//     const [trackers, setTrackers] = useState([]);
//     const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
    
//     useEffect(() => {
        
//         const getTrackersAsync = async () => {
//             getTrackers()
//             .then(result =>  setTrackers(result.data))
//             .catch(e => console.log(e))
//         }
//         getTrackersAsync();
//       }, []);


//       const addTracker = async (trackerBody) => {
//         await createTracker(trackerBody)
//             .then(result => {         
//                 const createdTracker = {id: result.data.id, name: trackerBody.name};
//                 setTrackers([...trackers, createdTracker]);   
//             })
//             .catch(error => console.log(error.response));
//       }

//       const onDeleteTracker = async () => {
//           await deleteTracker(id)
//           .then(result => {setTrackers(trackers.filter((e) => e.id != id))})
//           .catch(error => console.log(error.response))
//       }

//     let i = 1;

//     return (<div><br />
//         <Table striped  hover variant="dark">
//         <tbody>
//             {               
//                 trackers.map(tracker => 
//                     <tr id={tracker.id}>
//                         <td className="firstCell">{i++}</td>
//                         <td className="secondCell"><Link to={"tracker/" + tracker.id}>{tracker.name}</Link></td>
//                         <td><FormControl placeholder="enter new name" className="hiddenItem tableCellInput"/></td>
//                         <td className="thirdCell">
//                             <img onClick={e => console.log(123)} src={change} className="tableIcon"/>
//                         </td>
//                         <td className="fourthCell">
//                             <img onClick={e => {setId(e.target.parentElement.parentElement.id);handleShow();}} src={deleteIcon} className="tableIcon"/>
//                         </td>
//                     </tr>)
//             }

//         </tbody>
//         </Table>
        
//         <TrackerForm onAdd={addTracker}/>

//         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} >
//         <Modal.Body>
//           Do you really want to delete a track? Data cannot be recovered
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={e => {onDeleteTracker();handleClose();}}>Delete</Button>
//         </Modal.Footer>
//       </Modal>

//         </div>)
//         }

// export default Tracker;
