import { useSelector} from "react-redux"
import './UserProfile.css'
import { deleteReservation, updateReservation } from "../../store/reservations"
import { useDispatch } from "react-redux"
import { Redirect } from "react-router-dom"
import { useEffect } from "react"
import { restoreSession } from "../../store/session"
import UpdateDeleteReservation from "../UpdateDeleteReservations/UpdateDeleteReservations"
import catsmiling from '../../assets/catsmiling.jpg'

const UserProfile = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const reservations = useSelector(state => state.reservations);
    const reservationsArray = Object.values(reservations);
    
    useEffect(() => {
        if (!reservationsArray.length) {
            dispatch(restoreSession());
        }
    }, [dispatch, reservationsArray.length]);
    
    const handleDelete = (id) => {
        dispatch(deleteReservation(id));
    };
    
    const handleUpdate = (startDate, endDate, campsiteId, id) => {
        dispatch(updateReservation({startDate, endDate, userId, campsiteId, id}));
    };
    
    if (!sessionUser) return <Redirect to="/" />;
    const userId = sessionUser.id

    return (
        <>
            <div className="user-profile">
                <div className="profile-information">
                    <img className='profile-image' src={catsmiling} alt="" />
                    <h2>{sessionUser.firstName} {sessionUser.lastName}</h2>
                    <h3>{sessionUser.email}</h3>
                    <p>Intro: Introduce yourself to the community! Add a short bio...</p>
                </div>
                <div className="reservations-list">
                    <h3>Reservations</h3>
                    {reservationsArray.map((reservation) => (
                        <UpdateDeleteReservation
                            key={reservation.id}
                            reservation={reservation}
                            onDelete={handleDelete}
                            onUpdate={handleUpdate}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
export default UserProfile