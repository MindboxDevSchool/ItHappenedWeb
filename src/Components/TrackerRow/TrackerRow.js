
const TrackerRow = (tracker) => {
    const [name, setName] = useState(tracker.name);

    return (<>
    <tr id={tracker.id}>
        <td className="firstCell">{i++}</td>
        <td className="secondCell"><Link to={"tracker/" + tracker.id}>{name}</Link></td>
        <td><FormControl placeholder="enter new name" onChange={} className="hiddenItem tableCellInput"/></td>
        <td className="thirdCell">
            <img onClick={e => console.log(123)} src={change} className="tableIcon"/>
        </td>
        <td className="fourthCell">
            <img onClick={e => {setId(e.target.parentElement.parentElement.id);handleShow();}} src={deleteIcon} className="tableIcon"/>
        </td>
    </tr>
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
          </>
    )
} 

export default TrackerRow;