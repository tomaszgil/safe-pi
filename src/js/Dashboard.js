import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Axios from 'axios';
import '../css/dashboard.css';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      safeOpened: false,
      alarmActivated: false,
      alert: false
    };

    this.handleLogout = this.handleLogout.bind(this);
    this.checkAlarmStatus = this.checkAlarmStatus.bind(this);
    this.checkSafeStatus = this.checkSafeStatus.bind(this);
    this.closeSafe = this.closeSafe.bind(this);
    this.openSafe = this.openSafe.bind(this);
    this.activateAlarm = this.activateAlarm.bind(this);
    this.deactivateAlarm = this.deactivateAlarm.bind(this);

    this.checkSafeStatus();
    this.checkAlarmStatus();
  }

  static getToken() {
    const cookies = new Cookies();
    return cookies.get('token');
  }

  handleLogout() {
    if (this.state.safeOpened) {
      this.setState({
        alert: true
      });
    } else {
      const cookies = new Cookies();
      cookies.remove('token');
      window.location.href = '/';
    }
  }

  checkSafeStatus() {
    Axios({
      method: 'get',
      url: '/api/safe_opened',
      auth: {
        username: Dashboard.getToken(), // token
        password: '' // image
      }
    })
      .then(function (response) {
        const { data } = response;
        if (data) {
          const { safeOpened } = data;
          this.setState({
            safeOpened: safeOpened
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  checkAlarmStatus() {
    Axios({
      method: 'get',
      url: '/api/alarm_activated',
      auth: {
        username: Dashboard.getToken(), // token
        password: '' // image
      }
    })
      .then(function (response) {
        const { data } = response;
        if (data) {
          const { alarmActivated } = data;
          this.setState({
            alarmActivated: alarmActivated
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  activateAlarm() {
    Axios({
      method: 'get',
      url: '/api/activate_alarm',
      auth: {
        username: Dashboard.getToken(), // token
        password: '' // image
      }
    })
      .then(function (response) {
        const { data } = response;
        if (data) {
          const { alarmActivated } = data;
          this.setState({
            alarmActivated: alarmActivated
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  deactivateAlarm() {
    Axios({
      method: 'get',
      url: '/api/deactivate_alarm',
      auth: {
        username: Dashboard.getToken(), // token
        password: '' // image
      }
    })
      .then(function (response) {
        const { data } = response;
        if (data) {
          const { alarmActivated } = data;
          this.setState({
            alarmActivated: alarmActivated
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  closeSafe() {
    Axios({
      method: 'get',
      url: '/api/close_safe',
      auth: {
        username: Dashboard.getToken(), // token
        password: '' // image
      }
    })
      .then(function (response) {
        const { data } = response;
        if (data) {
          const { safeOpened } = data;
          this.setState({
            safeOpened: safeOpened,
            alert: safeOpened
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      });
  }

  openSafe() {
    Axios({
      method: 'get',
      url: '/api/open_safe',
      auth: {
        username: Dashboard.getToken(), // token
        password: '' // image
      }
    })
      .then(function (response) {
        const { data } = response;
        if (data) {
          const { safeOpened } = data;
          this.setState({
            safeOpened: safeOpened
          })
        }
      }.bind(this))
      .catch(function (error) {
        console.log(error);
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
        <p>Alarm currently <b>turned { this.state.alarmActivated ? "on" : "off" }</b>.</p>
        {
          this.state.alarmActivated ?
            <button className="btn btn-secondary" onClick={this.deactivateAlarm}>Deactivate</button>
            :
            <button className="btn btn-secondary" onClick={this.activateAlarm}>Activate</button>
        }
        <h4>Manage account</h4>
        <button className="btn logout" onClick={this.handleLogout}>Log out</button>
        {
          this.state.alert ? <p className="alert">You have to lock the safe before logging out.</p> : null
        }
      </div>
    );
  }
}

export default Dashboard;
