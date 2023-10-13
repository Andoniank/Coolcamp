import {useDispatch, useSelector} from 'react-redux'
import './CampsiteShow.css'
import { useEffect } from 'react'
import { fetchCampsite } from '../../store/campsites'
import { useParams } from 'react-router-dom'

const CampsiteShow = () => {
    const {campsiteId} = useParams()
    const campsite = useSelector(state => (state.campsites[campsiteId]))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCampsite(campsiteId))
    }, [campsiteId, dispatch]) 

    if(!campsite) return null

    return (
        <div>
            <h1>{campsite.name}</h1>
        </div>
    )
}

export default CampsiteShow