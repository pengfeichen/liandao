import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import actions
import { loginUser } from '../../actions/auth';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  onSubmit = e => {
    e.preventDefault();
    const payload = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(payload)
    this.props.loginUser(payload, this.props.history);
  }

  onChange = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() {
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col s12 center-align">
                <h5>Login Page</h5>
              </div>
            </div>
            <div className="row">
              <div className="s12 m6 offset-m4"/>
              <form
                className="col s12"
                noValidate
                autoComplete="off"
                onSubmit={this.onSubmit}
              >
                <div className="row">
                  <div className="col s12 m6 offset-m3 input-field ">
                    <input name="email" id="email" type="email" className="validate" value={this.state.email} onChange={this.onChange}/>
                    <label htmlFor="email">Email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6 offset-m3 input-field ">
                    <input name="password" id="password" type="password" className="validate" value={this.state.password} onChange={this.onChange}/>
                    <label htmlFor="password">Password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 m6 offset-m3">
                    <button
                      className="waves-effect waves-light btn"
                      type="submit"
                    >
                      login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { loginUser })(Login);