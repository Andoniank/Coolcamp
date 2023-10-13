import {useDispatch, useSelector} from 'react-redux'
import './CampsiteIndex.css'
import { useEffect } from 'react'
import { fetchCampsites } from '../../store/campsites'

const CampsiteIndex = () => {
    const campsites = useSelector(state => state.campsites)
    const campsitesArray = Object.values(campsites)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCampsites())
    }, [dispatch])

    return (
        <div className='campsite-index'>
            <h1>Campsite Index</h1>
            {campsitesArray.map((campsite) => {
                return (
                    <div>
                        <ul>
                            <li>Name: {campsite.name}</li>
                            <li>Location: {campsite.location}</li>
                            <li>Acres: {campsite.acres}</li>
                            <li>Max Guests: {campsite.max_guests}</li>
                            <li>Daily Rates: {campsite.daily_rates}</li>
                            <li>Lodging: {campsite.lodging}</li>
                            <li>RV: {campsite.rv}</li>
                            <li>Tents: {campsite.tents}</li>
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export default CampsiteIndex