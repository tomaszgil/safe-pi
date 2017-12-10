import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/auth-failure.css';

class AuthFailure extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="auth-failure">
        <div className="failure-icon" />
        <h3>Authentication failed</h3>
        <p>Try logging in again.</p>
        <Link to='/login' className='btn' >
          Go back
        </Link>
      </div>
    );
  }
}

export default AuthFailure;
