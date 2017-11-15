import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LandingView from './LandingView';
import LoginView from './LoginView';
import Dashboard from './Dashboard';
import '../css/app.css';

function PrivateRoute ({component: Component, getAuth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(getAuth());
        if (getAuth() === true) {
          return (<Component {...props} />);
        } else {
          return (<Redirect to={{pathname: '/login', state: {from: props.location}}} />);
        }
      }}
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
    this.getAuth = this.getAuth.bind(this);
  }

  setAuth(value=true) {
    this.setState({
      authed: value
    });
    this.state.authed = value;
    console.log("within app setter: " + this.state.authed);
  }

  getAuth() {
    return this.state.authed;
  }

  render() {
    return (
      <Router>
        <div className='app'>
          <Route exact path="/" component={LandingView} />
          <Route exact path="/login"
            render={() => <LoginView setAuth={this.setAuth}/>} />
          <PrivateRoute getAuth={this.getAuth} path='/dashboard'
            component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
