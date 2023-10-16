import {useDispatch, useSelector} from 'react-redux'
import './CampsiteShow.css'
import { useEffect } from 'react'
import { fetchCampsite } from '../../store/campsites'
import { useParams } from 'react-router-dom'
import campsitedemo2 from '../../assets/campsitedemo2.jpg'
import heart from '../../assets/heart.png'

const CampsiteShow = () => {
    const {campsiteId} = useParams()
    const campsite = useSelector(state => (state.campsites[campsiteId]))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCampsite(campsiteId))
    }, [campsiteId, dispatch]) 

    if(!campsite) return null

    return (
        <div className='campsite-show'>
            <div className='show-header'>
                <h1 className='show-title'>{campsite.name}</h1>
                <p className='show-location'>95% · 323 reviews · {campsite.location}</p>
                <button className='save'><img className='save-icon' src={heart} alt="" />Save</button>
            </div>
            <div className='show-img-div'>
                <img className='show-img' src={campsitedemo2} alt="" />
            </div>
            <div className='show-details'>
                <h2>{campsite.acres} acres hosted by John Doe</h2>
                <p className='includes'>{campsite.lodging ? 'Lodging ·' : ''} {campsite.rv? 'RVs ·' : ''} {campsite.tents ? 'Tents' : ''}</p>
                <p className='show-description'>{campsite.description}</p>
            </div>
            <div className='activities-features'>
                <h2>Activities</h2>
                    <ul>
                        <li>biking</li>
                    </ul>
            </div>
        </div>
    )
}

export default CampsiteShow