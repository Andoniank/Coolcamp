// frontend/src/components/SignupFormPage/index.js

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("Email address");
  const [firstName, setFirstName] = useState("First Name")
  const [lastName, setLastName] = useState("Last Name")
  const [password, setPassword] = useState("Password");
  const [confirmPassword, setConfirmPassword] = useState("Confirm Password");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, firstName, lastName, password }))
        .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <>
      <h1 className="sign-up-title">Sign Up to Continue</h1>
      <p className="intro-sign-up">Join our community of nature lovers!</p>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
        <label className="input-label-sign-up">
          <span className={`placeholder ${email === 'Email address' ? '' : 'floating'}`}>Email Address</span>
          <input
            type="text"
            value={email === 'Email address' ? '' : email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => {
              if (email === 'Email address') setEmail('')
            }}
            onBlur={() => {
              if (!email) setEmail('Email address')
            }}
            required
          />
        </label>
        <br/>
        <label className="input-label-sign-up">
          <span className={`placeholder ${firstName === 'First Name' ? '' : 'floating'}`}>First Name</span>
          <input 
              type='text' 
              value={firstName === 'First Name'? '' : firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              onFocus={() => {
                if (firstName === 'First Name') setFirstName('')
              }}
              onBlur={() => {
                if (!firstName) setFirstName('First Name')
              }}
              required/>
        </label>
        <br/>
        <label className="input-label-sign-up">
        <span className={`placeholder ${lastName === 'Last Name' ? '' : 'floating'}`}>Last Name</span>
          <input 
              type='text' 
              value={lastName === 'Last Name' ? '' : lastName} 
              onChange={(e) => setLastName(e.target.value)}
              onFocus={() => {
                if (lastName === 'Last Name') setLastName('')
              }}
              onBlur={() => {
                if (!lastName) setLastName('Last Name')
              }} 
              required/>
        </label>
        <br/>
        <label className="input-label-sign-up">
          <span className={`placeholder ${password === 'Password' ? '' : 'floating'}`}>Password</span>
          <input
            type="password"
            value={password === 'Password' ? '' : password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => {
              if (password === 'Password') setPassword('')
            }}
            onBlur={() => {
              if (!password) setPassword('Password')
            }}
            required
          />
        </label>
        <br/>
        <label className="input-label-sign-up">
        <span className={`placeholder ${confirmPassword === 'Confirm Password' ? '' : 'floating'}`}>Confirm Password</span>
          <input
            type="password"
            value={confirmPassword === 'Confirm Password' ?  '' : confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => {
              if (confirmPassword === 'Confirm Password') setConfirmPassword('')
            }}
            onBlur={() => {
              if (!confirmPassword) setConfirmPassword('Confirm Password')
            }}
            required
          />
        </label>
        <button className='sign-up' type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;