import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  static handleLogout() {
    const cookies = new Cookies();
    cookies.remove('authenticated');
    window.location.href = '/';
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="heading">Dashboard</h1>
        <button onClick={Dashboard.handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Dashboard;
