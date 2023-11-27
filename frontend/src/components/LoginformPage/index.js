import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css'

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('Email address');
  const [password, setPassword] = useState('Password');
  const [errors, setErrors] = useState([]);
  const demo = {credential: 'demo@user.io', password: 'password'}

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text(); 
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  }

  const demoSubmit = (e) => {
    e.preventDefault()
    return dispatch(sessionActions.login(demo))
  }

  return (
    <>
      <h1 className='log-in-title'>Log in to Continue</h1>
      <p className='intro'>Welcome back! Lets get you outside.</p>
        <form className='log-in-form' onSubmit={handleSubmit}>
        <div className="errors-div">
          {errors.map(error => <p className="errors" key={error}>{error}</p>)}
        </div>  
          <label className="input-label">
            {/* if the credential is the default placeholder of 'Email address', it will first change the value field will initally be empty */}
            {/* although the value field is empty, in place of the value field we will have the span */}
            {/* once we click on the input feild, our 'onFocus' will change the credential to '' which in turn will add ''floating to the className */}
            {/* this will activate the '.placeholder.floating' CSS field which will transition the span to right above the input field */}
            {/* once we click out of the field our 'on blur' will change the crendetial to Email address, removing the previous CSS field, making the value blank again and transitioning the span back down into the input field */}
            <span className={`placeholder ${credential === 'Email address' ? '' : 'floating'}`}>Email address</span>
              <input
                type="text"
                value={credential === 'Email address' ? '' : credential}    
                onChange={(e) => setCredential(e.target.value)}
                onFocus={() => {
                  if (credential === 'Email address') setCredential('');  // handles clicking into the email address input field
                }}
                onBlur={() => {
                  if (!credential) setCredential('Email address');  // handles clicking out of the email address input field
                }}
                required
              />
          </label>
          <label className="input-label">
            <span className={`placeholder ${password === 'Password' ? '' : 'floating'}`}>Password</span>
            <input
              type={password === 'Password' ? 'text' : 'password'}
              value={password === 'Password' ? '' : password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                if (password === 'Password') setPassword('');
              }}
              onBlur={() => {
                if (!password) setPassword('Password');
              }}
              required
            />
          </label>
        <button className='log-in' type="submit">Log In</button>
      </form>
      <form onSubmit={demoSubmit}>
        <button className='demo' type="submit">Log in with Demo User</button>
      </form>
    </>
  );
}

export default LoginFormPage;