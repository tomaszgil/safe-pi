import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginView from './LoginView';
import MainView from './MainView';
import '../css/app.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='app'>
          <Route path="/" component={LoginView} />
          <Route path="/safe" component={MainView} />
        </div>
      </Router>
    );
  }
}

export default App;
