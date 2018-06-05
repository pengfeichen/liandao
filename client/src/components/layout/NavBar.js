import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import actions
import { logoutUser } from '../../actions/auth';

class NavBar extends Component {
  onClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <div className="auth-links">
        <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/markets">Markets</Link>
          </li>
          <li>
            <Link to="/">News Feed</Link>
          </li>
          <li>
            <a onClick={this.onClick}>Logout</a>
          </li>
      </div>
    )
    const guestLinks = (
      <div className="guest-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
      </div>
    )
    return (
<nav className="blue-grey darken-4">
      <div className="nav-wrapper container">
      <Link id="logo-container" to="/" className="brand-logo">
          <i className="large material-icons" >insert_chart</i>
          </Link>
        <ul className="right hide-on-med-and-down">
          { isAuthenticated ? authLinks : guestLinks}
        </ul>
        <ul id="nav-mobile" className="sidenav">
          { isAuthenticated ? authLinks : guestLinks}
        </ul>
        <Link to="/" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </Link>
      </div>
    </nav>
    )
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStatToProps = state => ({
  auth: state.auth
});

export default connect(mapStatToProps, { logoutUser })(
  NavBar
);


