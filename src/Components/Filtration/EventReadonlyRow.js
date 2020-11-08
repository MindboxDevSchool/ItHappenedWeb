
const EventReadonlyRow = ( { comment, happensDate, id, rating, scale} ) => {
    return (<>
        <tr>
            {
                    <td className="scaleCell">{scale}     {/* append measurement unit */}
                        <img src={process.env.PUBLIC_URL + '/img/scale.png'} className="tableIcon" />
                    </td>
            }
            {
                    <td className="ratingCell">{rating}
                        <img src={process.env.PUBLIC_URL + '/img/rating.png'} className="tableIcon" />
                    </td>
            }
            {
                    <td className="commentCell">{comment}
                        <img src={process.env.PUBLIC_URL + '/img/comments.png'} className="tableIcon" />
                    </td>
            }
            {/* <td>
                {happensDate.toString().slice(0, 16).replace('T', ' ')}
                <img src={process.env.PUBLIC_URL + '/img/timetable.png'} className="tableIcon" />
            </td> */}
        </tr>
    </>
    )
}

export default EventReadonlyRow;
