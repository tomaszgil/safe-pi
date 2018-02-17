import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      safeOpened: this.isSafeOpened(),
      alarmActive: this.isAlarmActive(),
    };

    this.isAlarmActive = this.isAlarmActive.bind(this);
    this.isSafeOpened = this.isSafeOpened.bind(this);
    this.closeSafe = this.closeSafe.bind(this);
    this.openSafe = this.openSafe.bind(this);
    this.activateAlarm = this.activateAlarm.bind(this);
    this.deactivateAlarm = this.deactivateAlarm.bind(this);
  }

  static handleLogout() {
    const cookies = new Cookies();
    cookies.remove('authenticated');
    window.location.href = '/';
  }

  isSafeOpened() {
    // TODO perform check with backend
    return false;
  }

  isAlarmActive() {
    // TODO perfrom check with backend
    return false;
  }

  activateAlarm() {
    // TODO perform action to backend
    this.setState({
      alarmActive: true
    });
  }

  deactivateAlarm() {
    // TODO perform action to backend
    this.setState({
      alarmActive: false
    });
  }

  closeSafe() {
    // TODO perform action to backend
    this.setState({
      safeOpened: false
    });
  }

  openSafe() {
    // TODO perform action to backend
    this.setState({
      safeOpened: true
    });
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="heading">Dashboard</h1>
        <h4>Manage state</h4>
        <p>Safe currently <b>{ this.state.safeOpened ? "opened" : "closed" }</b>.</p>
        {
          this.state.safeOpened ?
            <button className="btn" onClick={this.closeSafe}>Close safe</button>
            :
            <button className="btn" onClick={this.openSafe}>Open safe</button>
        }
        <h4>Manage alarm</h4>
        <p>Alarm currently <b>turned { this.state.alarmActive ? "on" : "off" }</b>.</p>
        {
          this.state.alarmActive ?
            <button className="btn btn-secondary" onClick={this.deactivateAlarm}>Deactivate</button>
            :
            <button className="btn btn-secondary" onClick={this.activateAlarm}>Activate</button>
        }

        <h4>Manage account</h4>

        <button className="btn logout" onClick={Dashboard.handleLogout}>Log out</button>
      </div>
    );
  }
}

export default Dashboard;
