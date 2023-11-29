import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormPage from '../LoginformPage';
import SignupFormPage from '../SignupFormPage';
import { Modal } from '../../context/Modal'
import ProfileButton from './ProfileButton';
import coolcamp from '../../assets/coolcamp.png'
import coolcamplogo from '../../assets/Coolcamp-logos_transparent.png'
import './Navigation.css';


function Navigation() {
  const sessionUser = useSelector(state => state.session.user);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
        <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='navlinks'>
          <button className='nav-button' onClick={() => setShowLoginModal(true)}>Log In</button>
          {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
              <LoginFormPage />
          </Modal>
          )}
          <button className='sign-up-button' onClick={() => setShowSignUpModal(true)}>Sign Up</button>
          {showSignUpModal && (
          <Modal onClose={() => setShowSignUpModal(false)}>
              <SignupFormPage />
          </Modal>
          )}
      </div>
    );
  }

  return (
      <div className='navbar'>
        <div className='left-nav'>
          <NavLink exact to="/" className='home-button'><img className='logo' src={coolcamplogo} alt="HomePage"/></NavLink>
        </div>
        {sessionLinks}
      </div>
  );
}

export default Navigation;