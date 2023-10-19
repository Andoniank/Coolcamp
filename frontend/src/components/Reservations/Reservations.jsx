import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import * as reservationActions from '../../store/reservations'
import { Modal } from "../../context/Modal"
import LoginFormPage from "../LoginformPage"
import './Reservations.css'

const Reservations = () => {
    const {campsiteId} = useParams()
    const sessionUser = useSelector(state => state.session.user)
    
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [showModal, setShowModal] = useState(false)
    const dispatch = useDispatch()
    


    const handleSubmit = (e) => {
        e.preventDefault()
        if(!sessionUser) {
            setShowModal(true)
        } else {
            const userId = sessionUser.id
            return dispatch(reservationActions.createReservation({startDate, endDate, userId, campsiteId}))
        }
        
    }

    return (
        <>
            <div>
                <h3>Reserve this Campsite Today!</h3>
                <form className='reservation-form' onSubmit={handleSubmit}>
                    
                        <input className="reservation-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <br />
                    
                        <input className='reservation-input' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        <br />
                    <button className="reservation-submit">Reserve</button>
                </form>
                {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginFormPage />
                </Modal>
                )}
            </div>
        </>
    )
}

export default Reservations