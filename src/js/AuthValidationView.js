import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Dashboard from "./Dashboard";
import AuthFailure from "./AuthFailure";

class AuthValidationView extends Component {
  constructor(props) {
    super(props);
  }

  static checkAuth() {
    const cookies = new Cookies();
    return cookies.get('authenticated');
  }

  render() {
    return (
      <div>
        { AuthValidationView.checkAuth() ? <Dashboard/> : <AuthFailure /> }
      </div>
    )
  }
}

export default AuthValidationView;
