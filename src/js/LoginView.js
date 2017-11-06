import React, { Component } from 'react';
import LoginForm from './LoginForm.js'
import '../css/login-view.css';

class LoginView extends Component {
  render() {
    return (
      <div className="login-view">
        <h1 className="heading">SafePi</h1>
        <p className="description">
          Login into your safe dashboard.
        </p>
        <LoginForm />
      </div>
    );
  }
}

export default LoginView;
