import './Footer.css'
import { NavLink } from 'react-router-dom'
import github from '../../assets/github.png'
import linkedin from '../../assets/linkedin.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer1'>
                <p className='message'>Checkout my other content:</p>
                <a target='blank' href="https://github.com/Andoniank"><img className='github' src={github} alt="" /></a>
                <a target='blank' href="https://www.linkedin.com/in/krikor-andonian-6bb906b0/"><img className='linkedin' src={linkedin} alt="" /></a>
            </div> 
            <div>
                <p className='footer2'>the pictures displayed in this project do not belong to me</p>
            </div>
        </div>
    )
}

export default Footer