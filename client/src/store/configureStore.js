import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import tradeDataReducer from '../reducers/tradesData'
import authReducer from '../reducers/auth'
import errorReducer from '../reducers/error'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
export default () => {
  const store = createStore(combineReducers({
    tradesData: tradeDataReducer,
    auth: authReducer,
    error: errorReducer
  }), composeEnhancers(applyMiddleware(thunk)));
  return store;
};