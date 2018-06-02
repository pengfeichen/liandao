import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import redux store
import configureStore from './store/configureStore';
// Import Components
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <NavBar />
            <Route exact path="/" component={ Dashboard } />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
