import csrfFetch from './csrf'

const RECIEVE_RESERVATIONS = 'reservations/recieveReservations'
const RECIEVE_RESERVATION = 'reservations/recieveReservation'
const REMOVE_RESERVATION = 'reservations/removeReservation'

//---------------------Action Creators----------------------//

export const recieveReservations = reservations => {
    return {
        type: RECIEVE_RESERVATIONS,
        reservations
    }
}

export const recieveReservation = reservation => {
    return {
        type: RECIEVE_RESERVATION,
        reservation
    }
}

export const removeReservation = reservationId => {
    return {
        type: REMOVE_RESERVATION,
        reservationId
    }
}

//t-------------------Thunk Action Creators------------------//

export const fetchReservations = () => async (dispatch) => {
    const res = await csrfFetch('/api/reservations')
    const reservations = await res.json()
    dispatch(recieveReservations(reservations))
}

export const fetchReservation = (reservationId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/${reservationId}`)
    const reservation = await res.json()
    dispatch(recieveReservation(reservation))
}

export const createReservation = (reservation) => async (dispatch) => {
    const { startDate: start_date, endDate: end_date, userId: user_id, campsiteId: campsite_id} = reservation
    const res = await csrfFetch('/api/reservations', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            start_date,
            end_date,
            user_id,
            campsite_id
        })
    })
    console.log(res)
    if(res.ok) {
        const newReservation = await res.json()
        dispatch(recieveReservation(newReservation.reservation))
        return newReservation
    }
}

export const updateReservation = (reservation) => async (dispatch) => {
    const { startDate: start_date, endDate: end_date, userId: user_id, campsiteId: campsite_id} = reservation
    const res = await csrfFetch(`/api/reservations/${reservation.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({
            start_date,
            end_date,
            user_id,
            campsite_id
        })
    })
    if (res.ok) {
        const data = await res.json()
        dispatch(recieveReservation(data.reservation))
    }
}

export const deleteReservation = (reservationId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reservations/${reservationId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
    if (res.ok) {
        dispatch(removeReservation(reservationId))
    }
}


//----------------------Reducer------------------------------//

const reservationReducer = (state = {}, action) => {
    const nextState = Object.assign({}, Object.freeze(state))
    switch (action.type) {
        case RECIEVE_RESERVATIONS:
            return action.reservations || state
        case RECIEVE_RESERVATION:
            nextState[action.reservation.id] = action.reservation
            return nextState
        case REMOVE_RESERVATION:
            delete nextState[action.reservationId]
            return nextState
        default:
            return state;
    }
}

export default reservationReducer