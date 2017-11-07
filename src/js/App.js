import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LandingView from './LandingView';
import LoginView from './LoginView';
import MainView from './MainView';
import '../css/app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Route exact path="/" component={LandingView} />
          <Route path="/login" component={LoginView} />
          <Route path="/main" component={MainView} />
        </div>
      </Router>
    );
  }
}

export default App;
