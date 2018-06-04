import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Import action
import { registerUser } from '../../actions/auth';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    test: ''
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col s12 center-align">
              <h4>Register Here</h4>
            </div>
            <div className="row">
              <form
                className="col s12"
                noValidate
                autoComplete="off"
                onSubmit={this.onSubmit}
              >
                <div className="row">
                  <div className="input-field col s12 m6 offset-m3">
                    <input
                      name="name"
                      placeholder="Your name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                    <label>Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6 offset-m3">
                    <input
                      name="email"
                      placeholder="Your email"
                      type="text"
                      value={this.state.email}
                      onChange={this.onChange}
                      autoComplete="off"
                    />
                    <label>Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6 offset-m3">
                    <input
                      name="password"
                      placeholder="Pick a password between 2 ~ 30 characters"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    <label>Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12 m6 offset-m3">
                    <input
                      name="password2"
                      placeholder="Please re-type your password"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                    />
                    <label>Confirm Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6 offset-m3">
                    <button
                      className="waves-effect waves-light btn"
                      type="submit"
                    >
                      submit
                    </button>
                  </div>
                </div>
                <div className="row">
                <div className="col s12 m6 offset-m3">
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { registerUser })(Register);
