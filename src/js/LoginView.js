import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js'
import '../css/login-view.css';

class LoginView extends Component {
  render() {
    return (
      <div className="login-view">
        <Link to='/' className="btn-prev" />
        <h1 className="heading">Login</h1>
        <p className="description">
          Get into your safe dashboard.
        </p>
        <LoginForm />
      </div>
    );
  }
}

export default LoginView;
