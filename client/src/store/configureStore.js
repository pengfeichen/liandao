import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import reducers
import tradeDataReducer from '../reducers/trades'
import authReducer from '../reducers/auth'
import errorReducer from '../reducers/error'
import trendsReducer from '../reducers/trends'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();
export default () => {
  const store = createStore(combineReducers({
    trades: tradeDataReducer,
    auth: authReducer,
    error: errorReducer,
    trends: trendsReducer
  }), composeEnhancers(applyMiddleware(thunk)));
  return store;
};