import React, { Component } from 'react';
import '../css/login-form.css';

class LoginForm extends Component {
  render() {
    return (
      <form className="login-form">
        <input className="field"
               type="text"
               name="name"
               placeholder="User name"/>
        <div className="line" />
        <input className="field"
               type="password"
               name="password"
               placeholder="Password" />
        <div className="line" />
        <input className="btn" type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;
