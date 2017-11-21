import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js'
import '../css/login-view.css';

class LoginView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.refs.wrapper.classList.add('mounted');
  }

  render() {
    return (
      <div className="login-view" ref="wrapper">
        <Link to='/' className="btn-prev" />
        <h3 className="heading">Login</h3>
        <p className="description">
          Get into your safe dashboard.
        </p>
        <LoginForm />
      </div>
    );
  }
}

export default LoginView;
