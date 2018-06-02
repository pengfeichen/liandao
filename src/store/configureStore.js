import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import tradeDataReducer from '../reducers/tradesData'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
export default () => {
  const store = createStore(combineReducers({
    tradesData: tradeDataReducer
  }), composeEnhancers(applyMiddleware(thunk)));
  return store;
};