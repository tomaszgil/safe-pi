import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import LandingView from './LandingView';
import LoginView from './LoginView';
import VideoRecorder from "./VideoRecorder";
import AuthValidationView from './AuthValidationView';
import '../css/app.css';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <Route exact path="/" component={LandingView} />
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/camera" component={VideoRecorder} />
          <Route exact path='/dashboard' component={AuthValidationView} />
        </div>
      </Router>
    );
  }
}

export default App;
