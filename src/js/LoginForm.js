import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import '../css/login-form.css';


class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.username === "admin" &&
        this.state.password === "admin") {
      window.location.href = '/camera';
    } else {
      window.location.href = '/dashboard';
    }
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <input className="field"
               type="text"
               name="username"
               placeholder="User name"
               value={this.state.username}
               onChange={this.handleInputChange}
               required />
        <div className="line" />
        <input className="field"
               type="password"
               name="password"
               placeholder="Password"
               value={this.state.password}
               onChange={this.handleInputChange}
               required />
        <div className="line" />
        <input className="btn"
              type="submit"
              value="Login" />
      </form>
    );
  }
}

export default LoginForm;
