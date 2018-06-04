import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import redux store
import configureStore from './store/configureStore';
// Import Components
import PrivateRoute from './components/common/PrivateRoute';
import Landing from './components/layout/Landing';
import NavBar from './components/layout/NavBar';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import Login from './components/auth/Login';

import './App.css';

const store = configureStore();

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
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
