
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import coolcamp from '../../assets/coolcamp.png'
import './Navigation.css';

function Navigation() {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <div className='navlinks'>
        <p className='nav-button'>Near Me</p>
        <p className='nav-button'>About</p>
        <p className='nav-button'>Earn CoolCash</p>
        <p className='nav-button'>Start Hosting</p>
        <NavLink to="/login" className="nav-button">Log In</NavLink>
        <NavLink to="/signup" className="sign-up-button">Sign Up</NavLink>
      </div>
    );
  }

  return (
      <div className='navbar'>
        <NavLink exact to="/" className='home-button'><img className='logo' src={coolcamp} alt="HomePage"/></NavLink>
        {sessionLinks}
      </div>
  );
}

export default Navigation;