import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="blue-grey darken-4">
      <div className="nav-wrapper container">
      <Link id="logo-container" to="/" className="brand-logo">
          <i className="large material-icons" >insert_chart</i>
          </Link>
        <ul style={{marginLeft:25}} className="hide-on-med-and-down">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/">Markets</Link>
          </li>
        </ul>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/">Logout</Link>
          </li>
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
        <Link to="/" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
