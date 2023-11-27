import csrfFetch from "./csrf"
import { recieveReviews } from "./reviews"

const RECIEVE_CAMPSITES = 'campsites/recieveCampsites'
const RECIEVE_CAMPSITE = 'campsites/recieveCampsite'

//------------------Action Creators---------------------//

export const recieveCampsite = campsite => {
    return {
        type: RECIEVE_CAMPSITE,
        campsite
    }
}

export const recieveCampsites = campsites => {
    return {
        type: RECIEVE_CAMPSITES,
        campsites
    }
}

//-------------------Thunk Action Creators-----------------//

export const fetchCampsites = () => async (dispatch) => {
    const res = await csrfFetch('/api/campsites')
    const campsites = await res.json()
    dispatch(recieveCampsites(campsites))    
}

export const fetchCampsite = (campsiteId) => async (dispatch) => {
    const res = await csrfFetch(`/api/campsites/${campsiteId}`)
    const data = await res.json()
    dispatch(recieveCampsite(data.campsite))
    dispatch(recieveReviews(data.reviews))
}

//--------------------Reducer-------------------------------//

const campsiteReducer = (state = {}, action) => {
    const nextState = Object.assign({}, Object.freeze(state))
    switch (action.type) {
        case RECIEVE_CAMPSITES:
            return {...nextState, ...action.campsites}
        case RECIEVE_CAMPSITE:
            nextState[action.campsite.id] = action.campsite
            return nextState
        default:
            return state;
    }
}

export default campsiteReducer