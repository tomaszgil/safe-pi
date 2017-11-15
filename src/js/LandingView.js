import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/landing-view.css';

class LandingView extends Component {
  componentDidMount() {
    this.refs.wrapper.classList.add('mounted');
  }

  render() {
    return (
        <div className="landing-view" ref="wrapper">
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
