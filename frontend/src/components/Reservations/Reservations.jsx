import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
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
    const [numberOfNights, setnumberOfNights] = useState(1)
    const dispatch = useDispatch()
    const today = new Date().toISOString().split('T')[0]

    useEffect(() => {
        if (startDate && endDate) {
            const numberOfDays = calculateNumberOfNights();
            setnumberOfNights(numberOfDays);
        }
    }, [startDate, endDate]);

    const getNextDay = (date) => {
        const result = new Date(date);
        result.setDate(result.getDate() + 1);
        return result.toISOString().split('T')[0];
    }

    const calculateNumberOfNights = () => {
        const oneDay = 1000 * 60 * 60 * 24;
        const dateObj1 = new Date(startDate);
        const dateObj2 = new Date(endDate);

        const differenceInTime = dateObj2.getTime() - dateObj1.getTime();
        return Math.round(differenceInTime / oneDay);
    }

    const ratesCalc = () => {
        const numberOfDays = calculateNumberOfNights();
        return numberOfDays * campsite.dailyRates;
    }

    const ratesPlusService = () => {
        return ratesCalc() + 25
    }

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setEndDate('');
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
                <h3 className="rates">${ratesPlusService() ? ratesPlusService() : (campsite.dailyRates + 25)}<p className="total"> total</p></h3>
                <p className="reservation-max-guests">for {campsite.maxGuests} guests</p>
                <form className='reservation-form' onSubmit={handleSubmit}>
                    
                        <input 
                            className="reservation-input" 
                            type="date" 
                            value={startDate} 
                            min={today} 
                            onChange={handleStartDateChange} 
                        />
                        <br />
                        <input 
                            className='reservation-input' 
                            type="date" 
                            value={endDate} 
                            min={startDate ? getNextDay(startDate) : ''} 
                            onChange={(e) => setEndDate(e.target.value)}
                            disabled={!startDate}
                        />
                        <br />
                    <button className="reservation-submit" disabled={!startDate || !endDate}>Reserve</button>
                </form>
                <p className='charged-yet'>you won't be charged yet</p>
                <div className="total-with-guests"><p> {numberOfNights} nights ({campsite.maxGuests} guests)</p><p>${ratesCalc() ? ratesCalc() : campsite.dailyRates}.00</p></div>
                <div className="service"><p>Service Fee</p><p>$25.00</p></div>
                <div className="total"><p>Total</p><p>${ratesPlusService() ? ratesPlusService() : (campsite.dailyRates + 25)}.00</p></div>
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