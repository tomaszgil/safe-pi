import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Dashboard from "./Dashboard";
import AuthFailure from "./AuthFailure";
import '../css/auth-validation-view.css';

class AuthValidationView extends Component {
  constructor(props) {
    super(props);

    this.validate = AuthValidationView.checkAuth();
  }

  static checkAuth() {
    const cookies = new Cookies();
    return cookies.get('authenticated');
  }

  render() {
    return (
      <div>
        { this.validate ? <Dashboard/> : <AuthFailure /> }
      </div>
    )
  }
}

export default AuthValidationView;
