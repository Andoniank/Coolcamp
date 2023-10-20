import csrfFetch from "./csrf";

const RECIEVE_REVIEWS = 'reviews/recieveReviews'
const RECIEVE_REVIEW = 'reviews/recieveReview'
const REMOVE_REVIEW = 'reviews/removeReview'

//-----------------------------Action Creators-------------------------------//

export const recieveReviews = reviews => {
    return {
        type: RECIEVE_REVIEWS,
        reviews
    }
}


export const recieveReview = review => {
    return {
        type: RECIEVE_REVIEW,
        review
    }
}


export const removeReview = reviewId => {
    return {
        type: REMOVE_REVIEW,
        reviewId
    }
}


//--------------------------Thunk Action Creatirs---------------------------//


export const fetchReviews = () => async (dispatch) => {
    const res = await csrfFetch('/api/reviews')
    const reviews = await res.json()
    dispatch(recieveReviews(reviews))
}


export const fetchReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`)
    const review = await res.json()
    dispatch(recieveReview(review))
}

export const createReview = (review) => async (dispatch) => {
    const { recommend, description, userId: user_id, campsiteId: campsite_id} = review
    const res = await csrfFetch('/api/reviews', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            recommend,
            description,
            user_id,
            campsite_id
        })
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(recieveReview(data.review))
    }
}

export const updateReview = (review) => async (dispatch) => {
    const { recommend, description, userId: user_id, campsiteId: campsite_id} = review
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: JSON.stringify({
            recommend,
            description,
            user_id,
            campsite_id
        })
    })
    if(res.ok) {
        const data = await res.json()
        dispatch(recieveReview(data.review))
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "Delete"
    })
    if(res.ok) {
        dispatch(removeReview(reviewId))
    }
}


//-----------------------------Reducer-------------------------------//

const reviewReducer = (state = {}, action) => {
    const nextState = Object.assign({}, Object.freeze(state))
    switch (action.type) {
        case RECIEVE_REVIEWS:
            return action.reviews || state
        case RECIEVE_REVIEW:
            nextState[action.review.id] = action.review
            return nextState
        case REMOVE_REVIEW:
            delete nextState[action.reviewId]
            return nextState
        default:
            return state;
    }
}

export default reviewReducer