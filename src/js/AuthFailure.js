import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/auth-failure.css';

class AuthFailure extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.wrapper.classList.add('mounted');
  }

  render() {
    return (
      <div className="login-view" ref="wrapper">
        Failed
        <Link to='/login' >
          Powrót
        </Link>
      </div>
    );
  }
}

export default AuthFailure;
