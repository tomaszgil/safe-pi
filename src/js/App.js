import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LandingView from './LandingView';
import LoginView from './LoginView';
import Dashboard from './Dashboard';
import '../css/app.css';

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authed: false
    };

    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(value=true) {
    this.setState({
      authed: value
    });
    this.state.authed = value;
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <Route exact path="/" component={LandingView} />
          <Route exact path="/login"
            render={() => <LoginView setAuth={this.setAuth}/>} />
          <PrivateRoute authed={this.state.authed} path='/dashboard'
            component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
