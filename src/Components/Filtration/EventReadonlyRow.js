
const EventReadonlyRow = ({ rowNumber, event }) => {

    const { id, scale, rating, comment, happensDate, photo } = event;// geotra

    return (<>
        <div>
            <td className="rowNumber">{rowNumber}</td>
            {
                scale ?
                    <td className="scaleCell">{scale}     {/* append measurement unit */}
                        <img src={process.env.PUBLIC_URL + '/img/scale.png'} className="tableIcon" />
                    </td>
                    : null
            }
            {
                rating ?
                    <td className="ratingCell">{rating}
                        <img src={process.env.PUBLIC_URL + '/img/rating.png'} className="tableIcon" />
                    </td>
                    : null
            }
            {
                comment ?
                    <td className="commentCell">{comment}
                        <img src={process.env.PUBLIC_URL + '/img/comments.png'} className="tableIcon" />
                    </td>
                    : null
            }
            <td>
                {happensDate.toString().slice(0, 16).replace('T', ' ')}
                <img src={process.env.PUBLIC_URL + '/img/timetable.png'} className="tableIcon" />
            </td>
        </div>
    </>
    )
}

export default EventReadonlyRow;
