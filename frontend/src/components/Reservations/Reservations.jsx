import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import * as reservationActions from '../../store/reservations'
import { Modal } from "../../context/Modal"
import LoginFormPage from "../LoginformPage"
import './Reservations.css'
import success from '../../assets/success.png'

const Reservations = () => {
    const {campsiteId} = useParams()
    const sessionUser = useSelector(state => state.session.user)
    const campsite = useSelector(state => (state.campsites[campsiteId]))
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const dispatch = useDispatch()
    
    const ratesCalc = () => {
        return campsite.dailyRates * campsite.maxGuests
    }

    const ratesPlusService = () => {
        return ratesCalc() + 25
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!sessionUser) {
            setShowLoginModal(true)
        } else {
            const userId = sessionUser.id
            setShowSuccessModal(true)
            return dispatch(reservationActions.createReservation({startDate, endDate, userId, campsiteId}))
        }
        
    }

    return (
        <>
            <div className="reservation-display">
                <h3 className="rates">${ratesPlusService()}<p className="total"> total</p></h3>
                <p className="reservation-max-guests">for {campsite.maxGuests} guests</p>
                <form className='reservation-form' onSubmit={handleSubmit}>
                    
                        <input className="reservation-input" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <br />
                    
                        <input className='reservation-input' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        <br />
                    <button className="reservation-submit">Reserve</button>
                </form>
                <p className='charged-yet'>you won't be charged yet</p>
                <div className="total-with-guests"><p>{campsite.maxGuests} guests</p><p>${ratesCalc()}.00</p></div>
                <div className="service"><p>Service Fee</p><p>$25.00</p></div>
                <div className="total"><p>Total</p><p>${ratesPlusService()}.00</p></div>
                {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginFormPage />
                </Modal>
                )}
                {showSuccessModal && (
                <Modal onClose={() => setShowSuccessModal(false)}>
                    <div className="success-modal">
                        <img className="success-img" src={success} alt="" />
                        <p className="success">Happy Camping!</p>
                    </div>
                </Modal>
                )}
            </div>
        </>
    )
}

export default Reservations