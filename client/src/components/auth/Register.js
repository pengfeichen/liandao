import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import action
import { registerUser } from '../../actions/auth';

class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
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
      password: this.state.password,
      password2: this.state.password2
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
                  <div className="col s12 m6 offset-m3 input-field ">
                    <input name="name" id="name" type="text" className="validate" value={this.state.name} onChange={this.onChange} autoComplete="off"/>
                    <label htmlFor="name">Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 m6 offset-m3 input-field ">
                    <input name="email" id="email" type="email" className="validate" value={this.state.email} onChange={this.onChange} autoComplete="off"/>
                    <label htmlFor="email">Email</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 m6 offset-m3 input-field ">
                    <input name="password" id="password" type="password" className="validate" value={this.state.password} onChange={this.onChange} autoComplete="off"/>
                    <label htmlFor="password">Password</label>
                  </div>
                </div>

                <div className="row">
                  <div className="col s12 m6 offset-m3 input-field ">
                    <input name="password2" id="password2" type="password" className="validate" value={this.state.password2} onChange={this.onChange} autoComplete="off"/>
                    <label htmlFor="password2">Confirm Password</label>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { registerUser })(Register);
