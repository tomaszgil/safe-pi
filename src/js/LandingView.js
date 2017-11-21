import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/landing-view.css';

class LandingView extends Component {
  constructor(props) {
    super(props);

    this.setRedirect = this.setRedirect.bind(this);
    this.setRedirect();
  }

  componentDidMount() {
    this.refs.wrapper.classList.add('mounted');
  }

  setRedirect() {
    const cookies = new Cookies();
    if (cookies.get('authenticated')) {
      this.redirect = '/dashboard';
    } else {
      this.redirect = '/login'
    }
  }

  render() {
    return (
      <div className="landing-view" ref="wrapper">
        <div className="landing-icon" />
        <h1 className="heading">SafePi</h1>
        <p className="description">
          Let us protect your valuables
        </p>
        <Link to={this.redirect} className="btn">
          Login into your safe
        </Link>
      </div>
    );
  }
}

export default LandingView;
