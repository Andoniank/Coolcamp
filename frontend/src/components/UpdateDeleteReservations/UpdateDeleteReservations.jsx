import { useState } from "react"
import './UpdateDeleteReservations.css'

const UpdateDeleteReservation = ({reservation, onDelete, onUpdate}) => {
    const formattedStartDate = reservation.startDate ? reservation.startDate.split('T')[0] : '';
    const formattedEndDate = reservation.endDate ? reservation.endDate.split('T')[0] : '';
    const [startDate, setStartDate] = useState(formattedStartDate);
    const [endDate, setEndDate] = useState(formattedEndDate);
    
    const handleSubmit = (e) => {
        e.preventDefault()
        onUpdate(startDate, endDate, reservation.campsiteId, reservation.id)
    }

    return (
        <div className="reservation">
            <h3>{reservation.campsiteName}</h3>
            <form className="update-reservation" onSubmit={handleSubmit}>
                <div className="date-inputs">
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div> 
                <button className='update-cancel-button' type="submit">Update Reservation</button>
            </form>
            <button className='update-cancel-button' onClick={() => onDelete(reservation.id)}>Cancel Reservation</button>
        </div>
    )
}

export default UpdateDeleteReservation