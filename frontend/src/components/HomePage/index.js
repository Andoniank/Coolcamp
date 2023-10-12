import React from 'react'
import './HomePage.css'
import camping from '../../assets/camping.jpg'

const HomePage = () => {
    return (
        <div className='home-page'>
            <div className='centered-content'> 
                <div className='text'>
                    <h1>Find yourself outside</h1>
                    <p>Reserve beautiful private RV spots and campsites - found only on Coolcamp</p>
                </div>
                <div className='image-container'>
                    <img className='camping-image' src={camping} alt=""></img>
                    <div className='search-form'>
                        <form>
                            <input type='text' />
                            <input type='date' />
                            <input type='text' />
                            <input type='submit' value='Search'/>
                        </form>
                    </div>
                </div>
                
            </div> 
        </div>
    )
}

export default HomePage