import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import Components
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        <NavBar />
          <Route exact path="/" component={ Dashboard } />
        </div>
      </Router>
    );
  }
}

export default App;
