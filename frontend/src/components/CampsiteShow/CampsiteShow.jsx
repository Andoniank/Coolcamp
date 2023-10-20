import {useDispatch, useSelector} from 'react-redux'
import './CampsiteShow.css'
import { useEffect } from 'react'
import { fetchCampsite } from '../../store/campsites'
import { useParams } from 'react-router-dom'
import Reservations from '../Reservations/Reservations'
import heart from '../../assets/heart.png'
import * as activitiesIcons from '../../assets/Showpage/activities'
import * as naturalFeaturesIcons from '../../assets/Showpage/naturalfeatures'
import * as amenitiesIcons from '../../assets/Showpage/amenities'

const CampsiteShow = () => {
    const {campsiteId} = useParams()
    const campsite = useSelector(state => (state.campsites[campsiteId]))
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(fetchCampsite(campsiteId))
    }, [campsiteId, dispatch]) 
    
    if(!campsite) return null
    

    const activityIcon = {
        'Biking' : activitiesIcons.biking,
        'Hiking': activitiesIcons.hiking,
        "Wildlife watching": activitiesIcons.wildlifeWatching,
        "Climbing": activitiesIcons.climbing,
        "Fishing": activitiesIcons.fishing,
        "Off-roading (OHV)": activitiesIcons.offRoading,
        "Swimming": activitiesIcons.swimming,
        "Horseback riding": activitiesIcons.horsebackRiding,
        "Skiing": activitiesIcons.skiing
    }

    const naturalFeaturesIcon = {
        'Mountains': naturalFeaturesIcons.mountain,
        'River': naturalFeaturesIcons.river,
        'Forest': naturalFeaturesIcons.forest,
        'Desert': naturalFeaturesIcons.desert,
        'Canyon': naturalFeaturesIcons.canyon,
        'Lake': naturalFeaturesIcons.lake,
        'Beach': naturalFeaturesIcons.beach,
        "Ocean": naturalFeaturesIcons.ocean,
        "Field": naturalFeaturesIcons.feild,
        "Swamp": naturalFeaturesIcons.swamp
    }

    const amenitiesIcon = {
        'Campfires allowed': amenitiesIcons.campfire,
        'Toilets Available': amenitiesIcons.toilet,
        'Wifi available': amenitiesIcons.wifi,
        'Pets allowed': amenitiesIcons.pets,
        'Cooking equipment present': amenitiesIcons.cooking,
        'Bins available': amenitiesIcons.trash,
        'Showers available': amenitiesIcons.shower
    }



    return (
        <div className='campsite-show'>
            <div className='show-header'>
                <h1 className='show-title'>{campsite.name}</h1>
                <p className='show-location'>95% · 323 reviews · {campsite.location}</p>
                <button className='save'><img className='save-icon' src={heart} alt="" />Save</button>
            </div>
            <div className='show-img-div'>
                <img className='show-img' src={campsite.photoUrl} alt="" />
            </div>
            <div className='container'>

            <div className='left-container'>
                <div className='show-details'>
                    <h2 className='show-acres'>{campsite.acres} acres hosted by John Doe</h2>
                    <p className='includes'>{campsite.lodging ? 'Lodging ·' : ''} {campsite.rv? 'RVs ·' : ''} {campsite.tents ? 'Tents' : ''} · Sleeps {campsite.maxGuests}</p>
                    <p className='show-description'>{campsite.description}</p>
                </div>
                <div className='activities-features'>
                    <div className='activities'>
                        <h2 className='activities-header'>Activities</h2>
                        {campsite.activities && campsite.activities.map((activity) => {
                            return (
                                <p className='activity'><img className='activity-icon' src={activityIcon[activity]} alt=''></img> {activity}</p>
                            )
                        })}
                    </div>
                    <div className='natural-features'>
                        <h2 className='natural-features-header'>Natural Features</h2>
                        {campsite.naturalFeatures && campsite.naturalFeatures.map((naturalFeature) => {
                            return(
                                <p className='natural-feature'><img className='natural-features-icon' src={naturalFeaturesIcon[naturalFeature]} alt="" /> {naturalFeature}</p>
                            )
                            })}
                    </div>
                </div>
                <div className='amenities'>
                    <h2 className='amenities-header'>What this site offers</h2>
                    {campsite.amenities && campsite.amenities.map((amenity) => {
                        return (
                            <p className='amenity'> <img className='amenities-icon' src={amenitiesIcon[amenity]} alt="" /> {amenity}</p>
                        )
                    })}
                </div>
            </div>
            <div className='show-reservations'>
                <Reservations />
            </div>
            </div>
        </div>
    )
}

export default CampsiteShow