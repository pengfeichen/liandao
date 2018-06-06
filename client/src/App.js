import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jsw_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';
// Import redux store
import configureStore from './store/configureStore';
// Load actions
import { setCurrentUser, logoutUser } from './actions/auth';
// Import Components
import PrivateRoute from './components/common/PrivateRoute';
import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';
import Markets from './components/Markets';
import Websocket from './components/Websocket';

const store = configureStore();

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jsw_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
              <Route exact path="/" component={ Landing } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/ws" component={ Websocket } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              <PrivateRoute exact path="/markets" component={ Markets } />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
