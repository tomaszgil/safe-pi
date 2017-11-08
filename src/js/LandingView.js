import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/landing-view.css';

class LandingView extends Component {
  render() {
    return (
        <div className="landing-view">
          <div className="landing-icon" />
          <h1 className="heading">SafePi</h1>
          <p className="description">
            Let us protect your valuables
          </p>
          <Link to='/login' className="btn">
            Login into your safe
          </Link>
        </div>
    );
  }
}

export default LandingView;
