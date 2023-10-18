import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import './Navigation.css'
import catsmiling from '../../assets/catsmiling.jpg'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <div className="navlinks">
        <p className='nav-button'>Trips</p>
        <p className='nav-button'>Lists</p>
        <p className='nav-button'>Inbox</p>
        <button className='sign-up-button' onClick={logout}>Log Out</button>
        <NavLink to='/profile' title='Profile Page'><img className="nav-profile-image" src={catsmiling} alt='Profile Page'></img></NavLink>
          
      </div>
      
    </>
  );
}

export default ProfileButton;