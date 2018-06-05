import axios from 'axios';
import {getErrors} from '../actions/error';

// Get trades
export const getTrades = () => dispatch => {
  axios
    .get('/api/trades')
    .then(res => {
      dispatch({
        type: 'GET_TRADES_DATA',
        data: res.data
      })
    })
    .catch(err => dispatch(getErrors(err.response.data)));
}