import {useDispatch, useSelector} from 'react-redux'
import './CampsiteIndex.css'
import { useEffect, useState } from 'react'
import { fetchCampsites } from '../../store/campsites'
import campsitedemo from '../../assets/campsitedemo.webp'
import { NavLink } from 'react-router-dom'
import lodging from '../../assets/lodging.png'
import rv from '../../assets/rv.png'
import tent from '../../assets/tent.png'

const CampsiteIndex = () => {
    const campsites = useSelector(state => state.campsites)
    const campsitesArray = Object.values(campsites)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState(null)

    useEffect(() => {
        dispatch(fetchCampsites())
    }, [dispatch])

    let filteredCampsites = campsitesArray
    if (filter) {
        filteredCampsites = campsitesArray.filter(campsite => campsite[filter])
    }


    return (
        <>
            <div className='filters'>
                <button onClick={() => setFilter(filter === 'tents' ? null : 'tents')}
                className={`filters-button ${filter === 'tents' ? 'active-filter' : ''}`}>
                    <img className='filter-icon-tent' src={tent} alt="" />Campsites
                </button>
                <button onClick={() => setFilter(filter === 'lodging' ? null : 'lodging')}
                className={`filters-button ${filter === 'lodging' ? 'active-filter' : ''}`}>
                    <img className='filter-icon-lodging' src={lodging} alt="" />Lodging
                </button>
                <button onClick={() => setFilter(filter === 'rv' ? null : 'rv')}
                className={`filters-button ${filter === 'rv' ? 'active-filter' : ''}`}>
                    <img className='filter-icon-rv' src={rv} alt="" />Rvs
                </button>
            </div>
            <div className='campsite-index'>
                {filteredCampsites.map((campsite) => {
                    return (
                        <NavLink to={`/campsites/${campsite.id}`} className='campsite-link'>
                            <div className='campsite'>
                                <img className='campsite-img' src={campsitedemo} alt="" />
                                <h3 className='campsite-name'>{campsite.name}</h3>
                                <div className='campsite-details'> 
                                    <div className='campsite-L1'>
                                    <p>Sleeps {campsite.maxGuests} <span className="centered-dot">·</span> {campsite.lodging ? 'Lodging,' : ''} {campsite.rv? 'RVs,' : ''} {campsite.tents ? 'Tents' : ''}</p> 
                                    </div>
                                    <div className='campsite-L2'>
                                    <p>{campsite.acres} acres <span className="centered-dot">·</span> {campsite.location}</p>
                                    </div>
                                    <div className='campsite-L3'>
                                        <p>from <span className='daily-rates'>${campsite.dailyRates}</span><span className='night'>/night</span></p>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                })}
            </div>
        </>

    )
}

export default CampsiteIndex